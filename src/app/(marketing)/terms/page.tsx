export const metadata = {
  title: "Terms of Service - MediConnect AI",
};

export default function TermsPage() {
  const sections = [
    { title: "1. Acceptance of Terms", content: "By accessing or using MediConnect AI, you agree to be bound by these Terms of Service and all applicable laws. If you do not agree, please do not use our platform. These terms apply to all visitors, users, and others who access or use the service." },
    { title: "2. Platform Use", content: "MediConnect AI provides a platform to connect patients with healthcare providers including hospitals, doctors, and blood banks. We facilitate connections but are not a healthcare provider ourselves. All medical decisions must be made by qualified healthcare professionals." },
    { title: "3. Medical Disclaimer", content: "The AI-powered report analysis feature is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before making any medical decisions. In emergencies, immediately call 108 or visit the nearest emergency room." },
    { title: "4. User Accounts", content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate, current, and complete information during registration. You must be at least 18 years old to create an account." },
    { title: "5. Hospital & Blood Bank Responsibilities", content: "Healthcare providers (hospitals and blood banks) registered on our platform are responsible for the accuracy of their listings, availability of services, and quality of care provided. MediConnect AI does not guarantee the quality of services provided by third-party healthcare providers." },
    { title: "6. Payments & Refunds", content: "Payment for consultations and services is processed through secure third-party payment gateways. Appointment cancellations made 24 hours before the scheduled time are eligible for a full refund. Cancellations within 24 hours may be subject to a cancellation fee as per the hospital's policy." },
    { title: "7. Intellectual Property", content: "All content on MediConnect AI, including but not limited to text, graphics, logos, and software, is the property of MediConnect AI and is protected by applicable intellectual property laws. You may not reproduce or distribute any content without written permission." },
    { title: "8. Governing Law", content: "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra, India." },
  ];

  return (
    <div className="min-h-screen pt-20 bg-muted/30">
      <div className="bg-gradient-to-br from-indigo-600 to-sky-600 text-white py-16 px-4 text-center">
        <h1 className="text-5xl font-bold">Terms of Service</h1>
        <p className="text-white/80 mt-3">Last updated: June 1, 2025</p>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
        {sections.map((s) => (
          <div key={s.title} className="bg-card border rounded-2xl p-8 space-y-3">
            <h2 className="text-xl font-bold">{s.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
