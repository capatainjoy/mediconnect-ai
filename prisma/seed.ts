import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log("Starting database seed...")
  
  // Clean up existing data to prevent unique constraint errors during re-seeding
  await prisma.appointment.deleteMany()
  await prisma.doctor.deleteMany()
  await prisma.service.deleteMany()
  await prisma.department.deleteMany()
  await prisma.hospital.deleteMany()
  await prisma.patient.deleteMany()
  await prisma.bloodInventory.deleteMany()
  await prisma.bloodBank.deleteMany()
  await prisma.user.deleteMany()
  
  // 1. Create Users
  console.log("Creating Users...")
  const patientUser = await prisma.user.create({
    data: {
      email: "patient@example.com",
      password: bcrypt.hashSync("password123", 10),
      role: "patient",
      name: "John Doe",
      phone: "+919876543210",
      patientProfile: {
        create: {
          bloodGroup: "O+",
          gender: "Male",
          emergencyContact: "+919876543211",
        }
      }
    }
  })

  // Blood Bank
  await prisma.user.create({
    data: {
      email: "bloodbank@example.com",
      password: bcrypt.hashSync("password123", 10),
      role: "blood_bank",
      name: "LifeSaver Blood Bank",
      bloodBankProfile: {
        create: {
          name: "LifeSaver Regional Blood Bank",
          address: "123 Health Ave",
          city: "Mumbai",
          state: "Maharashtra",
          phone: "1800-111-2222",
          email: "contact@lifesaver.in",
          verified: true,
          inventory: {
            create: [
              { bloodGroup: "A+", unitsAvailable: 15 },
              { bloodGroup: "O+", unitsAvailable: 8 },
              { bloodGroup: "B-", unitsAvailable: 2 },
            ]
          }
        }
      }
    }
  })

  const hospitalsData = [
    {
      city: "Jamshedpur",
      state: "Jharkhand",
      hospitals: [
        { name: "Tata Main Hospital (TMH)", address: "C-Road, Bistupur", email: "info@tmh.in", phone: "0657-6644444", rating: 4.8, lat: 22.8046, lng: 86.1950 },
        { name: "Brahmananda Narayana Multispeciality", address: "Tamolia", email: "info@brahmananda.in", phone: "0657-6666666", rating: 4.5, lat: 22.8256, lng: 86.1738 }
      ]
    },
    {
      city: "Ranchi",
      state: "Jharkhand",
      hospitals: [
        { name: "RIMS Ranchi", address: "Bariatu", email: "info@rimsranchi.org", phone: "0651-2541533", rating: 4.2, lat: 23.3855, lng: 85.3400 },
        { name: "Medica Superspecialty", address: "Bariatu Road", email: "ranchi@medicasynergie.in", phone: "0651-6606000", rating: 4.6, lat: 23.3888, lng: 85.3435 }
      ]
    },
    {
      city: "Delhi",
      state: "Delhi",
      hospitals: [
        { name: "AIIMS New Delhi", address: "Ansari Nagar", email: "info@aiims.edu", phone: "011-26588500", rating: 4.9, lat: 28.5659, lng: 77.2093 },
        { name: "Max Super Speciality", address: "Saket", email: "info@maxhealthcare.com", phone: "011-26515050", rating: 4.7, lat: 28.5273, lng: 77.2118 }
      ]
    },
    {
      city: "Mumbai",
      state: "Maharashtra",
      hospitals: [
        { name: "Lilavati Hospital", address: "Bandra West", email: "info@lilavatihospital.com", phone: "022-26666666", rating: 4.7, lat: 19.0514, lng: 72.8282 },
        { name: "Kokilaben Dhirubhai Ambani", address: "Andheri West", email: "info@kokilabenhospital.com", phone: "022-30696969", rating: 4.8, lat: 19.1311, lng: 72.8250 },
        { name: "Hinduja Hospital", address: "Mahim", email: "info@hindujahospital.com", phone: "022-24451515", rating: 4.6, lat: 19.0347, lng: 72.8398 }
      ]
    },
    {
      city: "Pune",
      state: "Maharashtra",
      hospitals: [
        { name: "Ruby Hall Clinic", address: "Sassoon Road", email: "info@rubyhall.com", phone: "020-66455100", rating: 4.6, lat: 18.5303, lng: 73.8741 },
        { name: "Deenanath Mangeshkar Hospital", address: "Erandawane", email: "info@dmhospital.org", phone: "020-40151000", rating: 4.7, lat: 18.5085, lng: 73.8329 }
      ]
    },
    {
      city: "Bangalore",
      state: "Karnataka",
      hospitals: [
        { name: "Manipal Hospital", address: "Old Airport Road", email: "info@manipal.com", phone: "080-25024444", rating: 4.5, lat: 12.9592, lng: 77.6491 },
        { name: "Apollo Hospitals", address: "Bannerghatta Road", email: "info@apolloblr.com", phone: "080-26304050", rating: 4.7, lat: 12.8943, lng: 77.5979 },
        { name: "Fortis Hospital", address: "Cunningham Road", email: "info@fortisblr.com", phone: "080-41994444", rating: 4.4, lat: 12.9850, lng: 77.5957 }
      ]
    },
    {
      city: "Chennai",
      state: "Tamil Nadu",
      hospitals: [
        { name: "Apollo Main Hospital", address: "Greams Road", email: "info@apollochennai.com", phone: "044-28293333", rating: 4.8, lat: 13.0617, lng: 80.2541 },
        { name: "Fortis Malar Hospital", address: "Adyar", email: "info@fortismalar.com", phone: "044-42892222", rating: 4.6, lat: 13.0116, lng: 80.2573 }
      ]
    },
    {
      city: "Kolkata",
      state: "West Bengal",
      hospitals: [
        { name: "AMRI Hospital", address: "Dhakuria", email: "info@amri.in", phone: "033-24612626", rating: 4.3, lat: 22.5113, lng: 88.3653 },
        { name: "Woodlands Multispeciality", address: "Alipore", email: "info@woodlands.in", phone: "033-24567075", rating: 4.5, lat: 22.5310, lng: 88.3308 }
      ]
    },
    {
      city: "Hyderabad",
      state: "Telangana",
      hospitals: [
        { name: "Yashoda Hospital", address: "Secunderabad", email: "info@yashoda.in", phone: "040-45674567", rating: 4.6, lat: 17.4431, lng: 78.5037 },
        { name: "Care Hospitals", address: "Banjara Hills", email: "info@carehospitals.com", phone: "040-30417777", rating: 4.7, lat: 17.4156, lng: 78.4503 }
      ]
    }
  ]

  console.log("Creating Hospitals, Departments, Services, and Doctors...")
  
  for (const location of hospitalsData) {
    for (const hData of location.hospitals) {
      const user = await prisma.user.create({
        data: {
          email: `admin_${hData.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@example.com`,
          password: bcrypt.hashSync("password123", 10),
          role: "hospital",
          name: `${hData.name} Admin`,
        }
      })

      const hospital = await prisma.hospital.create({
        data: {
          userId: user.id,
          name: hData.name,
          address: hData.address,
          city: location.city,
          state: location.state,
          country: "India",
          email: hData.email,
          phone: hData.phone,
          rating: hData.rating,
          lat: hData.lat,
          lng: hData.lng,
          totalReviews: Math.floor(Math.random() * 500) + 50,
          verified: true,
          emergencyAvailable: true,
          bedCount: Math.floor(Math.random() * 500) + 100,
        }
      })

      // Add Departments
      const cardDept = await prisma.department.create({
        data: { hospitalId: hospital.id, name: "Cardiology", description: "Heart Care" }
      })
      const neuroDept = await prisma.department.create({
        data: { hospitalId: hospital.id, name: "Neurology", description: "Brain & Nerves" }
      })
      const orthoDept = await prisma.department.create({
        data: { hospitalId: hospital.id, name: "Orthopedics", description: "Bone & Joints" }
      })

      // Add Services
      await prisma.service.createMany({
        data: [
          { hospitalId: hospital.id, name: "General Consultation", category: "OPD", price: 500, durationMinutes: 15 },
          { hospitalId: hospital.id, name: "ECG Test", category: "Diagnostics", price: 800, durationMinutes: 20 },
          { hospitalId: hospital.id, name: "MRI Scan", category: "Diagnostics", price: 5500, durationMinutes: 45 },
        ]
      })

      // Add Doctors
      await prisma.doctor.createMany({
        data: [
          {
            hospitalId: hospital.id,
            departmentId: cardDept.id,
            name: "Dr. A. Sharma",
            qualification: "MBBS, MD (Cardiology)",
            specialization: "Cardiologist",
            experienceYears: 15,
            consultationFee: 1000,
            rating: 4.8
          },
          {
            hospitalId: hospital.id,
            departmentId: neuroDept.id,
            name: "Dr. R. Verma",
            qualification: "MBBS, DM (Neurology)",
            specialization: "Neurologist",
            experienceYears: 12,
            consultationFee: 1200,
            rating: 4.7
          },
          {
            hospitalId: hospital.id,
            departmentId: orthoDept.id,
            name: "Dr. S. Patil",
            qualification: "MBBS, MS (Orthopedics)",
            specialization: "Orthopedic Surgeon",
            experienceYears: 18,
            consultationFee: 900,
            rating: 4.9
          }
        ]
      })
    }
  }

  console.log("Database seed completed successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
