"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { languageMapping, translations, Language } from "../data/translations";

export type Currency = "USD" | "EUR" | "IRR" | "GBP";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [currency, setCurrency] = useState<Currency>("USD");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Detect device language
  const detectDeviceLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language || navigator.languages?.[0] || 'en';
      return languageMapping[browserLang] || 'en';
    }
    return 'en';
  };

  // Update URL with current language and currency
  const updateURL = (newLang?: Language, newCurrency?: Currency) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newLang) {
      params.set('lang', newLang);
    }
    if (newCurrency) {
      params.set('currency', newCurrency);
    }

    const newURL = `${pathname}?${params.toString()}`;
    router.replace(newURL, { scroll: false });
  };

  useEffect(() => {
    // Get language from URL params first, then localStorage, then device language
    const urlLang = searchParams.get('lang') as Language;
    const urlCurrency = searchParams.get('currency') as Currency;
    const storedLang = localStorage.getItem("language") as Language;
    const storedCurrency = localStorage.getItem("currency") as Currency;

    let finalLang: Language = 'en';
    let finalCurrency: Currency = 'USD';

    // Priority: URL params > localStorage > device language
    if (urlLang && ['en', 'es', 'fr', 'de', 'fa'].includes(urlLang)) {
      finalLang = urlLang;
    } else if (storedLang && ['en', 'es', 'fr', 'de', 'fa'].includes(storedLang)) {
      finalLang = storedLang;
    } else {
      finalLang = detectDeviceLanguage();
    }

    // Currency priority: URL params > localStorage > default
    if (urlCurrency && ['USD', 'EUR', 'IRR', 'GBP'].includes(urlCurrency)) {
      finalCurrency = urlCurrency;
    } else if (storedCurrency && ['USD', 'EUR', 'IRR', 'GBP'].includes(storedCurrency)) {
      finalCurrency = storedCurrency;
    }

    setLanguage(finalLang);
    setCurrency(finalCurrency);

    // Update localStorage
    localStorage.setItem("language", finalLang);
    localStorage.setItem("currency", finalCurrency);

    // Update URL if not already set
    if (!urlLang || !urlCurrency) {
      updateURL(finalLang, finalCurrency);
    }
  }, [searchParams]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    updateURL(lang, currency);
  };

  const handleSetCurrency = (curr: Currency) => {
    setCurrency(curr);
    localStorage.setItem("currency", curr);
    updateURL(language, curr);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleSetLanguage,
      currency,
      setCurrency: handleSetCurrency,
      t
    }}>
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
