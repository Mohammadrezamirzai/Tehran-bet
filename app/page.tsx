"use client";
import SignupForm from "./components/SignupForm";
import Image from "next/image";
import Navbar from "./components/ui/Navbar";
import LoginForm from "./components/LoginForm";
import ForgotPassword from "./components/ForgotPassword";
import { useState } from "react";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(true);
  const [showForgot, setShowForgot] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
    setShowForgot(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
    setShowForgot(false);
  };

  const handleForgotClick = () => {
    setShowForgot(true);
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleBackToLogin = () => {
    setShowForgot(false);
    setShowLogin(true);
    setShowSignup(false);
  };

  return (
    <div className="bg-background">
      {/* Navbar */}
     // <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />

      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen lg:gap-8 mt-20">
        {/* Form: full width on mobile, right half on large screens */}
        <div className="w-full lg:flex-1 flex justify-center items-center z-10">
          {showForgot ? (
            <ForgotPassword onBackToLogin={handleBackToLogin} />
          ) : showLogin ? (
            <LoginForm
              onShowSignup={handleSignupClick}
              onShowForgotPassword={handleForgotClick}
            />
          ) : (
            <SignupForm onShowLogin={handleLoginClick} />
          )}
        </div>
      </div>
    </div>
  );
}
