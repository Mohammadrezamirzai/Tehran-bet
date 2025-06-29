"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseClasses = "font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group shadow-md hover:shadow-xl text-base tracking-wide";

  const variants = {
    primary: "bg-gradient-to-r from-orange-600 via-yellow-400 to-yellow-300 text-white hover:from-yellow-500 hover:to-orange-500 shadow-xl hover:shadow-2xl hover:shadow-yellow-400/40 focus:ring-yellow-400 border-0",
    secondary: "bg-gradient-to-r from-secondary to-accent text-foreground hover:from-accent hover:to-secondary focus:ring-accent border border-accent shadow-md hover:shadow-lg",
    outline: "bg-white/90 border-2 border-blue-500 text-blue-700 hover:bg-blue-50 hover:text-blue-900 focus:ring-blue-400 shadow hover:shadow-lg hover:shadow-blue-300/30 backdrop-blur-md",
    ghost: "bg-transparent text-foreground hover:bg-accent/50 focus:ring-accent border-0 shadow-none hover:shadow-sm",
  };

  const sizes = {
    sm: "px-6 py-3 text-base md:px-8 md:py-2 md:text-lg",
    md: "px-6 py-3 text-base md:px-8 md:py-3 md:text-lg",
    lg: "px-8 py-3 text-lg md:px-10 md:py-4 md:text-lg",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{
        scale: disabled ? 1 : 1.02,
        y: disabled ? 0 : -2,
      }}
      whileTap={{
        scale: disabled ? 1 : 0.98,
        y: disabled ? 0 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
        duration: 0.2
      }}
    >
      {/* Shimmer effect for primary variant */}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent v to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.7 }}
        />
      )}

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
