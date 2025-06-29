"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export default function ForgotPassword({ onBackToLogin }: { onBackToLogin?: () => void }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!email.trim()) {
      setError(t("validation.emailRequired"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t("validation.emailInvalid"));
      return;
    }
    setError("");
    setSent(true);
    // Here you would trigger your API call
  };

  return (
    <motion.div
      className="min-h-screen bg-background flex items-center justify-center p-4 text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-md bg-gray-50 dark:bg-black rounded-2xl shadow-2xl p-8 border border-border"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ y: -5 }}
      >
        <div className="space-y-6 text-black">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-2">{t("auth.forgotPassword")}</h2>
            <p className="text-muted">{t("auth.forgotPasswordDesc")}</p>
          </motion.div>

          {sent ? (
            <motion.div
              className="text-center text-green-600 font-semibold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Verification code sent to {email}!
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label className="block text-sm font-medium mb-2">{t("auth.email")}</label>
                <motion.input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-accent text-black transition-all duration-200"
                  placeholder={t("placeholder.email")}
                  whileFocus={{ scale: 1.02 }}
                />
                {error && (
                  <motion.p
                    className="text-red-400 text-sm mt-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    {error}
                  </motion.p>
                )}
              </motion.div>

              <motion.button
                onClick={handleSend}
                className="w-full mt-4 bg-primary text-white py-3 rounded-lg font-semibold transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(249, 115, 22, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {t("auth.sendVerification")}
              </motion.button>

              <motion.div
                className="text-center pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.button
                  type="button"
                  onClick={onBackToLogin}
                  className="text-primary hover:text-orange-600 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("auth.backToLogin")}
                </motion.button>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
