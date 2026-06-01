export const metadata = {
  title: "Privacy Policy - MediConnect AI",
  description: "How MediConnect AI collects, uses, and protects your personal health data.",
};

export default function PrivacyPage() {
  const sections = [
    { title: "1. Information We Collect", content: "We collect information you provide directly to us, such as when you create an account, book an appointment, or upload medical reports. This includes your name, email address, phone number, date of birth, blood group, and medical documents. We also collect usage data and device information automatically when you use our platform." },
    { title: "2. How We Use Your Information", content: "We use the information we collect to provide, maintain, and improve our services. This includes facilitating appointments between patients and hospitals, enabling AI analysis of medical reports, connecting patients with blood banks, sending appointment reminders and notifications, and ensuring platform security and fraud prevention." },
    { title: "3. HIPAA Compliance", content: "MediConnect AI is committed to protecting your Protected Health Information (PHI) in accordance with the Health Insurance Portability and Accountability Act (HIPAA). We implement administrative, physical, and technical safeguards to ensure the confidentiality, integrity, and security of electronic PHI. We only share your health information with your explicit consent or as required by law." },
    { title: "4. Data Sharing", content: "We do not sell your personal information to third parties. We may share your information with hospitals, doctors, and blood banks when you explicitly request a service from them. We may also share data with trusted service providers who assist in operating our platform, subject to confidentiality agreements." },
    { title: "5. Data Retention", content: "We retain your personal information for as long as your account is active or as needed to provide services. Medical reports and records are retained for a minimum of 7 years as required by Indian medical regulations. You may request deletion of your account and associated data at any time." },
    { title: "6. Your Rights", content: "You have the right to access, update, or delete your personal information at any time. You can also opt out of non-essential communications, request a copy of your data, and withdraw consent for data processing. Contact us at privacy@mediconnect.ai to exercise these rights." },
    { title: "7. Contact Us", content: "If you have any questions about this Privacy Policy, please contact our Data Protection Officer at privacy@mediconnect.ai or write to us at MediConnect AI, Innovation Hub, BKC, Mumbai, Maharashtra 400051, India." },
  ];

  return (
    <div className="min-h-screen pt-20 bg-muted/30">
      <div className="bg-gradient-to-br from-indigo-600 to-sky-600 text-white py-16 px-4 text-center">
        <h1 className="text-5xl font-bold">Privacy Policy</h1>
        <p className="text-white/80 mt-3">Last updated: June 1, 2025</p>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
        <div className="bg-card border rounded-2xl p-6 text-sky-700 bg-sky-50 border-sky-200 text-sm">
          <strong>Summary:</strong> We collect only what we need, protect it with enterprise-grade security, never sell your data, and give you full control over your health information.
        </div>
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
