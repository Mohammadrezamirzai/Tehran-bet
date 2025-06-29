"use client";
import { useState } from "react";
import { countries } from "../../data/countries";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { validateStep2, clearFieldError, type Step1Data, type Step2Data, type ValidationMessages } from "../../util/validation";
import { submitSignupData, handleApiError } from "../../util/api";
import { createValidationMessages } from "../../util/form";

type FormErrors = Record<string, string>;

interface SignupFormSecondProps {
  step1Data: Step1Data;
  onSignupComplete: (additionalData: Step2Data) => void;
  onBack: () => void;
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

export default function SignupFormSecond({ step1Data, onSignupComplete, onBack }: SignupFormSecondProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<Step2Data>({ country: "", privacy: false });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Create validation messages object
  const validationMessages = createValidationMessages(t);

  const handleChange = (field: keyof Step2Data, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => clearFieldError(prev, field));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateStep2(formData, validationMessages);
    setErrors(validation.errors);

    if (!validation.isValid) return;

    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const completeUserData = {
      ...step1Data,
      ...formData
    };

    const result = await submitSignupData(completeUserData);

    if (result.success) {
      setSubmitStatus('success');
      onSignupComplete(formData);
      // You can redirect here or show success message
      setTimeout(() => {
        // Redirect to dashboard or login page
        window.location.href = '/login';
      }, 2000);
    } else {
      setSubmitStatus('error');
      setErrorMessage(handleApiError(result.error || 'Failed to create account. Please try again.'));
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-gray-50 dark:bg-black rounded-xl shadow-lg p-8 border border-border"
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
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-accent text-black ${errors.country ? "border-red-500" : "border-border"}`}
              disabled={isLoading}
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
              disabled={isLoading}
            />
            <label htmlFor="privacy" className="text-sm text-foreground dark:text-white select-none cursor-pointer">
              {t("auth.privacy")}
            </label>
          </div>
          {errors.privacy && <p className="text-red-500 text-sm mt-1 mb-4">{errors.privacy}</p>}

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <p className="font-semibold">Account created successfully!</p>
              <p className="text-sm">Redirecting to login page...</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="font-semibold">Error creating account</p>
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              disabled={isLoading}
            >
              {t("auth.back")}
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t("auth.creatingAccount")}
                </div>
              ) : (
                t("auth.completeSignup")
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
