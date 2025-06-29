"use client";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useLanguage, Currency } from "../../contexts/LanguageContext";

const currencies = [
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "IRR", label: "Iranian Rial", symbol: "ریال" },
  { code: "GBP", label: "British Pound", symbol: "£" },
];

export default function CurrencySelector() {
  const { currency, setCurrency } = useLanguage();
  const [selected, setSelected] = useState(currencies[0]);

  useEffect(() => {
    const found = currencies.find((c) => c.code === currency);
    if (found) setSelected(found);
  }, [currency]);

  const handleChange = (curr: typeof currencies[0]) => {
    setSelected(curr);
    setCurrency(curr.code as Currency);
  };

  return (
    <div className="w-32">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-full bg-gray-50 dark:bg-gray-700 py-2 pl-4 pr-10 text-left shadow-lg border-2 border-green-500 dark:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-300 text-base font-semibold text-gray-900 dark:text-white transition-all duration-200 hover:shadow-xl">
            <span className="flex items-center">
              <span className="mr-2 text-lg">{selected.symbol}</span>
              <span>{selected.code}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 20 20" stroke="currentColor">
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
            <Listbox.Options className="absolute z-10 mt-2 w-full rounded-xl bg-gray-50 dark:bg-gray-800 shadow-2xl ring-1 ring-black/10 dark:ring-white/10 focus:outline-none text-base">
              {currencies.map((curr) => (
                <Listbox.Option
                  key={curr.code}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 rounded-lg transition-all duration-150 ${
                      active
                        ? "bg-green-100 dark:bg-green-400/30 text-green-900 dark:text-white"
                        : "text-gray-900 dark:text-gray-100"
                    }`
                  }
                  value={curr}
                >
                  {({ selected }) => (
                    <>
                      <span className="absolute left-3 text-lg">{curr.symbol}</span>
                      <span className={`block truncate ${selected ? "font-bold" : "font-normal"}`}>{curr.label}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-3 flex items-center text-green-600 dark:text-green-400">
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
