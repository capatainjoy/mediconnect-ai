"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type LanguageCode = "en" | "hi" | "mr" | "ta" | "te" | "kn" | "bn" | "or";

const translations = {
  en: {
    find_hospitals: "Find Hospitals",
    blood_banks: "Blood Banks",
    ai_scanner: "AI Scanner",
    life_insurance: "Life Insurance",
    dashboard: "Dashboard",
    settings: "Settings",
    search: "Search",
    book_appointment: "Book Appointment",
    near_me: "Near Me",
    detect_location: "Detect Location",
    predict_insurance: "Predict Insurance",
  },
  hi: {
    find_hospitals: "अस्पताल खोजें",
    blood_banks: "ब्लड बैंक",
    ai_scanner: "AI स्कैनर",
    life_insurance: "जीवन बीमा",
    dashboard: "डैशबोर्ड",
    settings: "सेटिंग्स",
    search: "खोजें",
    book_appointment: "अपॉइंटमेंट बुक करें",
    near_me: "मेरे पास",
    detect_location: "स्थान का पता लगाएं",
    predict_insurance: "बीमा की भविष्यवाणी करें",
  },
  mr: {
    find_hospitals: "रुग्णालय शोधा",
    blood_banks: "रक्त पेढी",
    ai_scanner: "AI स्कॅनर",
    life_insurance: "जीवन विमा",
    dashboard: "डॅशबोर्ड",
    settings: "सेटिंग्ज",
    search: "शोधा",
    book_appointment: "अपॉइंटमेंट बुक करा",
    near_me: "माझ्या जवळ",
    detect_location: "स्थान शोधा",
    predict_insurance: "विम्याचा अंदाज घ्या",
  },
  ta: {
    find_hospitals: "மருத்துவமனைகளைத் தேடு",
    blood_banks: "இரத்த வங்கிகள்",
    ai_scanner: "AI ஸ்கேனர்",
    life_insurance: "ஆயுள் காப்பீடு",
    dashboard: "டாஷ்போர்டு",
    settings: "அமைப்புகள்",
    search: "தேடு",
    book_appointment: "நியமனம் பதிவுசெய்",
    near_me: "எனக்கு அருகில்",
    detect_location: "இருப்பிடத்தைக் கண்டறி",
    predict_insurance: "காப்பீட்டைக் கணிக்கவும்",
  },
  te: {
    find_hospitals: "ఆసుపత్రులను కనుగొనండి",
    blood_banks: "రక్త బ్యాంకులు",
    ai_scanner: "AI స్కానర్",
    life_insurance: "జీవిత భీమా",
    dashboard: "డాష్‌బోర్డ్",
    settings: "సెట్టింగ్‌లు",
    search: "శోధించండి",
    book_appointment: "అపాయింట్‌మెంట్ బుక్ చేయండి",
    near_me: "నా దగ్గర",
    detect_location: "స్థానాన్ని గుర్తించండి",
    predict_insurance: "భీమాను అంచనా వేయండి",
  },
  kn: {
    find_hospitals: "ಆಸ್ಪತ್ರೆಗಳನ್ನು ಹುಡುಕಿ",
    blood_banks: "ರಕ್ತ ಬ್ಯಾಂಕುಗಳು",
    ai_scanner: "AI ಸ್ಕ್ಯಾನರ್",
    life_insurance: "ಜೀವ ವಿಮೆ",
    dashboard: "ಡ್ಯಾಶ್ಬೋರ್ಡ್",
    settings: "ಸೆಟ್ಟಿಂಗ್ಗಳು",
    search: "ಹುಡುಕಿ",
    book_appointment: "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಕಾಯ್ದಿರಿಸಿ",
    near_me: "ನನ್ನ ಹತ್ತಿರ",
    detect_location: "ಸ್ಥಳವನ್ನು ಪತ್ತೆಹಚ್ಚಿ",
    predict_insurance: "ವಿಮೆಯನ್ನು ಊಹಿಸಿ",
  },
  bn: {
    find_hospitals: "হাসপাতাল খুঁজুন",
    blood_banks: "ব্লাড ব্যাংক",
    ai_scanner: "AI স্ক্যানার",
    life_insurance: "জীবন বীমা",
    dashboard: "ড্যাশবোর্ড",
    settings: "সেটিংস",
    search: "অনুসন্ধান",
    book_appointment: "অ্যাপয়েন্টমেন্ট বুক করুন",
    near_me: "আমার কাছাকাছি",
    detect_location: "অবস্থান সনাক্ত করুন",
    predict_insurance: "বীমার পূর্বাভাস দিন",
  },
  or: {
    find_hospitals: "ଡାକ୍ତରଖାନା ଖୋଜନ୍ତୁ",
    blood_banks: "ବ୍ଲଡ୍ ବ୍ୟାଙ୍କ୍",
    ai_scanner: "AI ସ୍କାନର୍",
    life_insurance: "ଜୀବନ ବୀମା",
    dashboard: "ଡ୍ୟାସବୋର୍ଡ",
    settings: "ସେଟିଂସ୍",
    search: "ଖୋଜନ୍ତୁ",
    book_appointment: "ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରନ୍ତୁ",
    near_me: "ମୋ ପାଖରେ",
    detect_location: "ସ୍ଥାନ ଚିହ୍ନଟ କରନ୍ତୁ",
    predict_insurance: "ବୀମା ପୂର୍ବାନୁମାନ କରନ୍ତୁ",
  },
};

interface LanguageContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LanguageCode>("en");

  const t = (key: keyof typeof translations.en) => {
    return translations[lang][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
