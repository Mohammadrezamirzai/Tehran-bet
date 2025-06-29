"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import { useLanguage } from "../contexts/LanguageContext";

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onShowSignup?: () => void;
  onShowForgotPassword?: () => void;
}

export default function LoginForm({ onShowSignup, onShowForgotPassword }: LoginFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Partial<LoginData>>({});

  const validateForm = () => {
    const newErrors: Partial<LoginData> = {};
    if (!formData.email.trim()) newErrors.email = t("validation.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t("validation.emailInvalid");
    if (!formData.password.trim()) newErrors.password = t("validation.passwordRequired");
    else if (formData.password.length < 6) newErrors.password = t("validation.passwordLength");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Login attempt:", formData);
      alert("Login successful! Welcome back!");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 text-black">
      <div className="w-screen max-w-xl bg-gray-50 dark:bg-black rounded-2xl shadow-2xl p-8 border border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 text-black"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">{t("auth.login")}</h2>
            <p className="text-muted">{t("auth.loginToAccount")}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t("auth.email")} *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-accent text-black ${
                errors.email ? "border-red-500" : "border-border"
              }`}
              placeholder={t("placeholder.email")}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t("auth.password")} *</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-accent text-black ${
                errors.password ? "border-red-500" : "border-border"
              }`}
              placeholder={t("placeholder.password")}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
              />
              <label htmlFor="rememberMe" className="text-sm">
                {t("auth.rememberMe")}
              </label>
            </div>
            <button
              type="button"
              onClick={onShowForgotPassword}
              className="text-sm text-primary hover:text-orange-600 transition-colors"
            >
              {t("auth.forgotPassword")}
            </button>
          </div>

          <div className="pt-4">
            <Button onClick={handleSubmit} size="lg" className="w-full">
              {t("auth.signIn")}
            </Button>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-muted">
              {t("auth.noAccount")} {" "}
              <button
                type="button"
                onClick={onShowSignup}
                className="text-primary hover:text-orange-600 transition-colors font-medium"
              >
                {t("auth.signupHere")}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
