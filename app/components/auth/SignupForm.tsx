"use client";
import { useState } from "react";
import Image from "next/image";
import SignupFormSecond from "./SignupFormSecond";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

// Progress Bar Component
const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between">
        {/* Step 1 */}
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
            currentStep >= 1
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
          }`}>
            1
          </div>
          <div className={`ml-3 text-sm font-medium transition-colors duration-300 ${
            currentStep >= 1
              ? 'text-orange-600 dark:text-orange-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            Personal Info
          </div>
        </div>

        {/* Progress Line */}
        <div className="flex-1 mx-4">
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-red-500"
              initial={{ width: "0%" }}
              animate={{ width: currentStep >= 2 ? "100%" : "0%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
            currentStep >= 2
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
          }`}>
            2
          </div>
          <div className={`ml-3 text-sm font-medium transition-colors duration-300 ${
            currentStep >= 2
              ? 'text-orange-600 dark:text-orange-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            Additional Info
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SignupForm({ onShowLogin }: { onShowLogin?: () => void }) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateStep1 = () => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = t("validation.firstNameRequired");
    else if (!/^[A-Za-z]{2,}$/.test(formData.firstName.trim())) newErrors.firstName = t("validation.firstNameInvalid");
    if (!formData.lastName.trim()) newErrors.lastName = t("validation.lastNameRequired");
    else if (!/^[A-Za-z]{2,}$/.test(formData.lastName.trim())) newErrors.lastName = t("validation.lastNameInvalid");
    if (!formData.email.trim()) newErrors.email = t("validation.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t("validation.emailInvalid");
    if (!formData.password.trim()) newErrors.password = t("validation.passwordRequired");
    else if (formData.password.length < 6) newErrors.password = t("validation.passwordLength");
    else if (!/(?=.*[0-9])/.test(formData.password)) newErrors.password = t("validation.passwordNumber");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof SignupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSignup = () => {
    if (validateStep1()) setStep(2);
  };

  return (
    <>
      {step === 1 ? (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 text-black">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}/>
          <div className="w-screen max-w-xl bg-white dark:bg-black rounded-xl shadow-lg p-8 border border-border">
            {/* Progress Bar */}
            <ProgressBar currentStep={step} />

            <div className="space-y-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">{t("auth.createAccount")}</h2>
                <p className="text-muted dark:text-white/70">{t("auth.signupToStart")}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-white mb-2">{t("auth.firstName")} *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={e => handleInputChange("firstName", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-accent text-black  ${errors.firstName ? "border-red-500" : "border-border"}`}
                  placeholder={t("placeholder.firstName")}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-white mb-2">{t("auth.lastName")} *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={e => handleInputChange("lastName", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-accent text-black ${errors.lastName ? "border-red-500" : "border-border"}`}
                  placeholder={t("placeholder.lastName")}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-white mb-2">{t("auth.email")} *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-accent text-black  ${errors.email ? "border-red-500" : "border-border"}`}
                  placeholder={t("placeholder.email")}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground dark:text-white mb-2">{t("auth.password")} *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={e => handleInputChange("password", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-accent text-black  ${errors.password ? "border-red-500" : "border-border"}`}
                  placeholder={t("placeholder.password")}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              <div className="pt-4">
                <button
                  onClick={handleSignup}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  style={{ borderColor: '#f97316' }}
                >
                  {t("auth.next")}
                </button>
              </div>
              <div className="text-center pt-4">
                <p className="text-sm text-muted">
                  {t("auth.alreadyHaveAccount")} {' '}
                  <button
                    type="button"
                    onClick={onShowLogin}
                    className="text-primary hover:text-orange-600 transition-colors font-medium"
                  >
                    {t("auth.loginHere")}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SignupFormSecond />
      )}
    </>
  );
}
