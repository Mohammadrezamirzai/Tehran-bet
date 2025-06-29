"use client";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

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
    <div className="min-h-screen bg-background flex items-center justify-center p-4 text-black">
      <div className="w-full max-w-md bg-gray-50 dark:bg-black rounded-2xl shadow-2xl p-8 border border-border">
        <div className="space-y-6 text-black">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">{t("auth.forgotPassword")}</h2>
            <p className="text-muted">{t("auth.forgotPasswordDesc")}</p>
          </div>
          {sent ? (
            <div className="text-center text-green-600 font-semibold">Verification code sent to {email}!</div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">{t("auth.email")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-gray-50 dark:bg-accent text-black"
                  placeholder={t("placeholder.email")}
                />
                {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
              </div>
              <button
                onClick={handleSend}
                className="w-full mt-4 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                {t("auth.sendVerification")}
              </button>
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="text-primary hover:text-orange-600 transition-colors font-medium"
                >
                  {t("auth.backToLogin")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
