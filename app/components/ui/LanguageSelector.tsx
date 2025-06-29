"use client";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useLanguage } from "../../contexts/LanguageContext";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [selected, setSelected] = useState(languages[0]);

  useEffect(() => {
    const found = languages.find((l) => l.code === language);
    if (found) setSelected(found);
  }, [language]);

  const handleChange = (lang) => {
    setSelected(lang);
    setLanguage(lang.code);
  };

  return (
    <div className="w-36">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-full bg-white dark:bg-gray-700 py-2 pl-4 pr-10 text-left shadow-lg border-2 border-blue-500 dark:border-primary focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-primary text-base font-semibold text-gray-900 dark:text-white transition-all duration-200">
            <span className="flex items-center">
              <span className="mr-2 text-lg">{selected.flag}</span>
              <span>{selected.label}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-blue-500 dark:text-primary" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-2 w-full rounded-xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black/10 dark:ring-white/10 focus:outline-none text-base">
              {languages.map((lang) => (
                <Listbox.Option
                  key={lang.code}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 rounded-lg transition-all duration-150 ${
                      active
                        ? "bg-blue-100 dark:bg-primary/30 text-blue-900 dark:text-white"
                        : "text-gray-900 dark:text-gray-100"
                    }`
                  }
                  value={lang}
                >
                  {({ selected }) => (
                    <>
                      <span className="absolute left-3 text-lg">{lang.flag}</span>
                      <span className={`block truncate ${selected ? "font-bold" : "font-normal"}`}>{lang.label}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-3 flex items-center text-blue-600 dark:text-primary">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
