"use client";
import { useState } from "react";
import { countries } from "../../data/countries";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

interface FormData {
  country: string;
  privacy: boolean;
}

interface FormErrors {
  country?: string;
  privacy?: string;
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

export default function SignupFormSecond() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({ country: "", privacy: false });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.country) newErrors.country = t("validation.countryRequired");
    if (!formData.privacy) newErrors.privacy = t("validation.privacyRequired");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white dark:bg-black rounded-xl shadow-lg p-8 border border-border"
      >
        {/* Progress Bar */}
        <ProgressBar currentStep={2} />

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6 text-foreground dark:text-white">{t("auth.completeProfile")}</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground dark:text-white mb-2">{t("auth.country")} *</label>
            <select
              value={formData.country}
              onChange={e => handleChange("country", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-accent text-black ${errors.country ? "border-red-500" : "border-border"}`}
            >
              <option value="">{t("placeholder.country")}</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>{country.name}</option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="privacy"
              checked={formData.privacy}
              onChange={e => handleChange("privacy", e.target.checked)}
              className="mr-2 accent-primary scale-110"
            />
            <label htmlFor="privacy" className="text-sm text-foreground dark:text-white select-none cursor-pointer">
              {t("auth.privacy")}
            </label>
          </div>
          {errors.privacy && <p className="text-red-500 text-sm mt-1 mb-4">{errors.privacy}</p>}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {t("auth.completeSignup")}
          </button>
          {submitted && (
            <div className="mt-6 text-green-600 text-center font-semibold">{t("auth.signupSuccess")}</div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
