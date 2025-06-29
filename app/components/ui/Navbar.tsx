"use client";
import { useState, useEffect } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import LanguageSelector from "../selectors/LanguageSelector";
import CurrencySelector from "../selectors/CurrencySelector";
import { useLanguage } from "../../contexts/LanguageContext";
import { SunIcon, MoonIcon } from "./icons";

export default function Navbar({
  onLoginClick,
  onSignupClick,
}: {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    // Check localStorage first
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (stored === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <nav className="fixed top-0 left-0 my-10 right-0 z-50 bg-transparent ">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between h-auto lg:h-20 gap-4 lg:gap-0 py-2 lg:py-0">
          {/* Modern Logo */}
          <div className="relative group cursor-pointer mb-2 lg:mb-0 select-none">
            <div className="relative">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-orange-500/30 to-orange-600/20 dark:from-blue-400/20 dark:via-blue-500/30 dark:to-blue-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

              {/* Logo container with glassmorphism */}
              <div className="relative bg-gray-50/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-xl px-4 py-2 group-hover:bg-gray-50/20 dark:group-hover:bg-black/20 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <div className="flex items-center gap-1">
                  {/* Icon */}
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 dark:from-blue-400 dark:to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">T</span>
                    </div>
                    {/* Icon glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 dark:from-blue-400 dark:to-blue-600 rounded-lg blur opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  </div>

                  {/* Text */}
                  <div className="flex items-center">
                    <span className="text-2xl lg:text-3xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600 bg-clip-text text-transparent group-hover:from-orange-500 group-hover:via-orange-600 group-hover:to-orange-700 dark:group-hover:from-blue-500 dark:group-hover:via-blue-600 dark:group-hover:to-blue-700 transition-all duration-300">
                      {t("nav.logo.tehran")}
                    </span>
                    <span className="text-2xl lg:text-3xl font-black tracking-tight bg-gradient-to-r from-gray-800 via-gray-900 to-black dark:from-gray-100 dark:via-gray-200 dark:to-white bg-clip-text text-transparent group-hover:from-gray-900 group-hover:via-black group-hover:to-gray-800 dark:group-hover:from-white dark:group-hover:via-gray-100 dark:group-hover:to-gray-200 transition-all duration-300">
                      {t("nav.logo.bet")}
                    </span>
                  </div>
                </div>

                {/* Hover underline effect */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 dark:from-blue-400 dark:to-blue-600 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>

              {/* Floating particles effect */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 dark:bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-orange-500 dark:bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300 delay-100"></div>
            </div>
          </div>
          {/* Nav links */}

          {/* Right side buttons */}
          <div className="flex flex-row items-center justify-center gap-2 lg:gap-3 w-full lg:w-auto">
            {/* Language selector, currency selector and dark mode toggle */}
            <div className="relative group flex items-center gap-2">
              <LanguageSelector />
              <CurrencySelector />
              <button
                onClick={toggleDarkMode}
                className={`p-2.5 rounded-full border-2 border-yellow-400 bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 dark:from-blue-900 dark:via-primary dark:to-blue-700 shadow-lg hover:shadow-yellow-400/40 focus:outline-none focus:ring-4 focus:ring-yellow-300/40 transition-all duration-200 relative ${
                  darkMode ? "ring-4 ring-yellow-400/60" : ""
                }`}
                aria-label="Toggle dark mode">
                {darkMode ? (
                  <SunIcon />
                ) : (
                  <MoonIcon />
                )}
              </button>
            </div>
            {/* Auth buttons */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="w-full lg:w-auto px-3 py-2 text-sm md:px-5 md:py-2.5 md:text-base lg:px-8 lg:py-3 lg:text-lg"
                onClick={onLoginClick}>
                {t("nav.login")}
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="w-full lg:w-auto px-3 py-2 text-sm md:px-5 md:py-2.5 md:text-base lg:px-8 lg:py-3 lg:text-lg"
                onClick={onSignupClick}>
                {t("nav.signup")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-24 lg:h-20" />
    </nav>
  );
}
