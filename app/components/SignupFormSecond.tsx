"use client";
import { useState } from "react";
import { countries } from "../data/countries";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

interface FormData {
  country: string;
  privacy: boolean;
}

interface FormErrors {
  country?: string;
  privacy?: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const inputVariants = {
  focus: {
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

// Progress Bar Component with enhanced animations
const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  return (
    <motion.div
      className="w-full max-w-md mx-auto mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between">
        {/* Step 1 */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
              currentStep >= 1
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            1
          </motion.div>
          <div className={`ml-3 text-sm font-medium transition-colors duration-300 ${
            currentStep >= 1
              ? 'text-orange-600 dark:text-orange-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            Personal Info
          </div>
        </motion.div>

        {/* Progress Line */}
        <div className="flex-1 mx-4">
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-red-500"
              initial={{ width: "0%" }}
              animate={{ width: currentStep >= 2 ? "100%" : "0%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Step 2 */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
              currentStep >= 2
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            2
          </motion.div>
          <div className={`ml-3 text-sm font-medium transition-colors duration-300 ${
            currentStep >= 2
              ? 'text-orange-600 dark:text-orange-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            Additional Info
          </div>
        </motion.div>
      </div>
    </motion.div>
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
    <motion.div
      className="min-h-screen flex items-center justify-center bg-background p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-2xl bg-gray-50 dark:bg-black rounded-xl shadow-lg p-8 border border-border"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ y: -5 }}
      >
        {/* Progress Bar */}
        <ProgressBar currentStep={2} />

        <motion.form
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-2xl font-bold text-center mb-6 text-foreground dark:text-white"
            variants={itemVariants}
          >
            {t("auth.completeProfile")}
          </motion.h2>

          <motion.div
            className="mb-6"
            variants={itemVariants}
          >
            <label className="block text-sm font-medium text-foreground dark:text-white mb-2">{t("auth.country")} *</label>
            <motion.select
              value={formData.country}
              onChange={e => handleChange("country", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-accent text-black transition-all duration-200 ${errors.country ? "border-red-500" : "border-border"}`}
              variants={inputVariants}
              whileFocus="focus"
            >
              <option value="">{t("placeholder.country")}</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>{country.name}</option>
              ))}
            </motion.select>
            <AnimatePresence>
              {errors.country && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.country}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="mb-6 flex items-center"
            variants={itemVariants}
          >
            <motion.input
              type="checkbox"
              id="privacy"
              checked={formData.privacy}
              onChange={e => handleChange("privacy", e.target.checked)}
              className="mr-2 accent-primary scale-110"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            <label htmlFor="privacy" className="text-sm text-foreground dark:text-white select-none cursor-pointer">
              {t("auth.privacy")}
            </label>
          </motion.div>

          <AnimatePresence>
            {errors.privacy && (
              <motion.p
                className="text-red-500 text-sm mt-1 mb-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {errors.privacy}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold transition-all duration-200"
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 25px rgba(249, 115, 22, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            {t("auth.completeSignup")}
          </motion.button>

          <AnimatePresence>
            {submitted && (
              <motion.div
                className="mt-6 text-green-600 text-center font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {t("auth.signupSuccess")}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}
