import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signJWT } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      email, password, name, role,
      // Patient fields
      phone, dob, bloodGroup,
      // Hospital & Blood Bank common fields
      address, city, state, licenseNo,
      // Specific fields
      hospitalName, bedCount,
      bloodBankName, storageCapacity
    } = body;

    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        phone: phone || null,
      },
    });

    // Create the role-specific profile
    if (role === "patient") {
      await prisma.patient.create({ 
        data: { 
          userId: user.id,
          dob: dob ? new Date(dob) : null,
          bloodGroup: bloodGroup || null,
        } 
      });
    } else if (role === "hospital") {
      await prisma.hospital.create({ 
        data: { 
          userId: user.id, 
          name: hospitalName || name, 
          email, 
          phone: phone || "0000000000", 
          address: address || "Update Address", 
          city: city || "Update City", 
          state: state || "Update State",
          licenseNo: licenseNo || null,
          bedCount: bedCount ? parseInt(bedCount) : 0,
        } 
      });
    } else if (role === "blood_bank") {
      await prisma.bloodBank.create({
        data: {
          userId: user.id,
          name: bloodBankName || name,
          email,
          phone: phone || "0000000000",
          address: address || "Update Address",
          city: city || "Update City",
          state: state || "Update State",
          licenseNo: licenseNo || null,
          storageCapacity: storageCapacity ? parseInt(storageCapacity) : 0,
        }
      });
    }

    // Generate JWT
    const tokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    
    const token = await signJWT(tokenPayload);

    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return NextResponse.json({ user: tokenPayload }, { status: 201 });
  } catch (error: unknown) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
