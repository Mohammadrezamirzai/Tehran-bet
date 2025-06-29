"use client";
import { useState } from "react";
import Image from "next/image";
import SignupFormSecond from "./SignupFormSecond";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

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

// Animation variants for form elements
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
    <AnimatePresence mode="wait">
      {step === 1 ? (
        <motion.div
          key="step1"
          className="min-h-screen bg-background flex items-center justify-center p-4 text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-screen max-w-xl bg-gray-50 dark:bg-black rounded-xl shadow-lg p-8 border border-border"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -5 }}
          >
            {/* Progress Bar */}
            <ProgressBar currentStep={step} />

            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="text-center mb-8"
                variants={itemVariants}
              >
                <motion.h2
                  className="text-2xl font-bold text-foreground dark:text-white mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {t("auth.createAccount")}
                </motion.h2>
                <motion.p
                  className="text-muted dark:text-white/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {t("auth.signupToStart")}
                </motion.p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-foreground dark:text-white mb-2">{t("auth.firstName")} *</label>
                <motion.input
                  type="text"
                  value={formData.firstName}
                  onChange={e => handleInputChange("firstName", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-accent text-black transition-all duration-200 ${errors.firstName ? "border-red-500" : "border-border"}`}
                  placeholder={t("placeholder.firstName")}
                  variants={inputVariants}
                  whileFocus="focus"
                />
                <AnimatePresence>
                  {errors.firstName && (
                    <motion.p
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {errors.firstName}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-foreground dark:text-white mb-2">{t("auth.lastName")} *</label>
                <motion.input
                  type="text"
                  value={formData.lastName}
                  onChange={e => handleInputChange("lastName", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-accent text-black transition-all duration-200 ${errors.lastName ? "border-red-500" : "border-border"}`}
                  placeholder={t("placeholder.lastName")}
                  variants={inputVariants}
                  whileFocus="focus"
                />
                <AnimatePresence>
                  {errors.lastName && (
                    <motion.p
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {errors.lastName}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-foreground dark:text-white mb-2">{t("auth.email")} *</label>
                <motion.input
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-accent text-black transition-all duration-200 ${errors.email ? "border-red-500" : "border-border"}`}
                  placeholder={t("placeholder.email")}
                  variants={inputVariants}
                  whileFocus="focus"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-foreground dark:text-white mb-2">{t("auth.password")} *</label>
                <motion.input
                  type="password"
                  value={formData.password}
                  onChange={e => handleInputChange("password", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-accent text-black transition-all duration-200 ${errors.password ? "border-red-500" : "border-border"}`}
                  placeholder={t("placeholder.password")}
                  variants={inputVariants}
                  whileFocus="focus"
                />
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                className="pt-4"
                variants={itemVariants}
              >
                <motion.button
                  onClick={handleSignup}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold transition-all duration-200"
                  style={{ borderColor: '#f97316' }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(249, 115, 22, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t("auth.next")}
                </motion.button>
              </motion.div>

              <motion.div
                className="text-center pt-4"
                variants={itemVariants}
              >
                <p className="text-sm text-muted">
                  {t("auth.alreadyHaveAccount")} {' '}
                  <motion.button
                    type="button"
                    onClick={onShowLogin}
                    className="text-primary hover:text-orange-600 transition-colors font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t("auth.loginHere")}
                  </motion.button>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <SignupFormSecond />
      )}
    </AnimatePresence>
  );
}
