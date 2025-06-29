"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "es" | "fr" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Navbar
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.logo.tehran": "tehran",
    "nav.logo.bet": "bet",

    // Auth forms
    "auth.createAccount": "Create Account",
    "auth.signupToStart": "Sign up to get started",
    "auth.completeProfile": "Complete Your Profile",
    "auth.firstName": "First Name",
    "auth.lastName": "Last Name",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.country": "Country",
    "auth.privacy": "I confirm I am 19+ and agree to the privacy policy",
    "auth.next": "Next",
    "auth.completeSignup": "Complete Sign Up",
    "auth.alreadyHaveAccount": "Already have an account?",
    "auth.loginHere": "Login here",
    "auth.signupSuccess": "Signup successful!",

    // Progress bar
    "progress.personalInfo": "Personal Info",
    "progress.additionalInfo": "Additional Info",

    // Placeholders
    "placeholder.firstName": "Enter your first name",
    "placeholder.lastName": "Enter your last name",
    "placeholder.email": "Enter your email",
    "placeholder.password": "Enter your password",
    "placeholder.country": "Select your country",

    // Validation messages
    "validation.firstNameRequired": "First name is required",
    "validation.firstNameInvalid": "First name must be at least 2 letters and only letters",
    "validation.lastNameRequired": "Last name is required",
    "validation.lastNameInvalid": "Last name must be at least 2 letters and only letters",
    "validation.emailRequired": "Email is required",
    "validation.emailInvalid": "Invalid email",
    "validation.passwordRequired": "Password is required",
    "validation.passwordLength": "Password must be at least 6 characters",
    "validation.passwordNumber": "Password must include a number",
    "validation.countryRequired": "Country is required",
    "validation.privacyRequired": "You must agree you are 19+",
  },
  es: {
    // Navbar
    "nav.login": "Iniciar Sesión",
    "nav.signup": "Registrarse",
    "nav.logo.tehran": "tehran",
    "nav.logo.bet": "bet",

    // Auth forms
    "auth.createAccount": "Crear Cuenta",
    "auth.signupToStart": "Regístrate para comenzar",
    "auth.completeProfile": "Completa Tu Perfil",
    "auth.firstName": "Nombre",
    "auth.lastName": "Apellido",
    "auth.email": "Correo Electrónico",
    "auth.password": "Contraseña",
    "auth.country": "País",
    "auth.privacy": "Confirmo que tengo 19+ años y acepto la política de privacidad",
    "auth.next": "Siguiente",
    "auth.completeSignup": "Completar Registro",
    "auth.alreadyHaveAccount": "¿Ya tienes una cuenta?",
    "auth.loginHere": "Inicia sesión aquí",
    "auth.signupSuccess": "¡Registro exitoso!",

    // Progress bar
    "progress.personalInfo": "Información Personal",
    "progress.additionalInfo": "Información Adicional",

    // Placeholders
    "placeholder.firstName": "Ingresa tu nombre",
    "placeholder.lastName": "Ingresa tu apellido",
    "placeholder.email": "Ingresa tu correo electrónico",
    "placeholder.password": "Ingresa tu contraseña",
    "placeholder.country": "Selecciona tu país",

    // Validation messages
    "validation.firstNameRequired": "El nombre es requerido",
    "validation.firstNameInvalid": "El nombre debe tener al menos 2 letras y solo letras",
    "validation.lastNameRequired": "El apellido es requerido",
    "validation.lastNameInvalid": "El apellido debe tener al menos 2 letras y solo letras",
    "validation.emailRequired": "El correo electrónico es requerido",
    "validation.emailInvalid": "Correo electrónico inválido",
    "validation.passwordRequired": "La contraseña es requerida",
    "validation.passwordLength": "La contraseña debe tener al menos 6 caracteres",
    "validation.passwordNumber": "La contraseña debe incluir un número",
    "validation.countryRequired": "El país es requerido",
    "validation.privacyRequired": "Debes confirmar que tienes 19+ años",
  },
  fr: {
    // Navbar
    "nav.login": "Se Connecter",
    "nav.signup": "S'inscrire",
    "nav.logo.tehran": "tehran",
    "nav.logo.bet": "bet",

    // Auth forms
    "auth.createAccount": "Créer un Compte",
    "auth.signupToStart": "Inscrivez-vous pour commencer",
    "auth.completeProfile": "Complétez Votre Profil",
    "auth.firstName": "Prénom",
    "auth.lastName": "Nom de Famille",
    "auth.email": "E-mail",
    "auth.password": "Mot de Passe",
    "auth.country": "Pays",
    "auth.privacy": "Je confirme que j'ai 19+ ans et j'accepte la politique de confidentialité",
    "auth.next": "Suivant",
    "auth.completeSignup": "Terminer l'Inscription",
    "auth.alreadyHaveAccount": "Vous avez déjà un compte ?",
    "auth.loginHere": "Connectez-vous ici",
    "auth.signupSuccess": "Inscription réussie !",

    // Progress bar
    "progress.personalInfo": "Informations Personnelles",
    "progress.additionalInfo": "Informations Supplémentaires",

    // Placeholders
    "placeholder.firstName": "Entrez votre prénom",
    "placeholder.lastName": "Entrez votre nom de famille",
    "placeholder.email": "Entrez votre e-mail",
    "placeholder.password": "Entrez votre mot de passe",
    "placeholder.country": "Sélectionnez votre pays",

    // Validation messages
    "validation.firstNameRequired": "Le prénom est requis",
    "validation.firstNameInvalid": "Le prénom doit contenir au moins 2 lettres et uniquement des lettres",
    "validation.lastNameRequired": "Le nom de famille est requis",
    "validation.lastNameInvalid": "Le nom de famille doit contenir au moins 2 lettres et uniquement des lettres",
    "validation.emailRequired": "L'e-mail est requis",
    "validation.emailInvalid": "E-mail invalide",
    "validation.passwordRequired": "Le mot de passe est requis",
    "validation.passwordLength": "Le mot de passe doit contenir au moins 6 caractères",
    "validation.passwordNumber": "Le mot de passe doit inclure un chiffre",
    "validation.countryRequired": "Le pays est requis",
    "validation.privacyRequired": "Vous devez confirmer que vous avez 19+ ans",
  },
  de: {
    // Navbar
    "nav.login": "Anmelden",
    "nav.signup": "Registrieren",
    "nav.logo.tehran": "tehran",
    "nav.logo.bet": "bet",

    // Auth forms
    "auth.createAccount": "Konto Erstellen",
    "auth.signupToStart": "Registrieren Sie sich, um zu beginnen",
    "auth.completeProfile": "Profil Vervollständigen",
    "auth.firstName": "Vorname",
    "auth.lastName": "Nachname",
    "auth.email": "E-Mail",
    "auth.password": "Passwort",
    "auth.country": "Land",
    "auth.privacy": "Ich bestätige, dass ich 19+ bin und der Datenschutzrichtlinie zustimme",
    "auth.next": "Weiter",
    "auth.completeSignup": "Registrierung Abschließen",
    "auth.alreadyHaveAccount": "Haben Sie bereits ein Konto?",
    "auth.loginHere": "Hier anmelden",
    "auth.signupSuccess": "Registrierung erfolgreich!",

    // Progress bar
    "progress.personalInfo": "Persönliche Informationen",
    "progress.additionalInfo": "Zusätzliche Informationen",

    // Placeholders
    "placeholder.firstName": "Geben Sie Ihren Vornamen ein",
    "placeholder.lastName": "Geben Sie Ihren Nachnamen ein",
    "placeholder.email": "Geben Sie Ihre E-Mail ein",
    "placeholder.password": "Geben Sie Ihr Passwort ein",
    "placeholder.country": "Wählen Sie Ihr Land",

    // Validation messages
    "validation.firstNameRequired": "Vorname ist erforderlich",
    "validation.firstNameInvalid": "Vorname muss mindestens 2 Buchstaben und nur Buchstaben enthalten",
    "validation.lastNameRequired": "Nachname ist erforderlich",
    "validation.lastNameInvalid": "Nachname muss mindestens 2 Buchstaben und nur Buchstaben enthalten",
    "validation.emailRequired": "E-Mail ist erforderlich",
    "validation.emailInvalid": "Ungültige E-Mail",
    "validation.passwordRequired": "Passwort ist erforderlich",
    "validation.passwordLength": "Passwort muss mindestens 6 Zeichen haben",
    "validation.passwordNumber": "Passwort muss eine Zahl enthalten",
    "validation.countryRequired": "Land ist erforderlich",
    "validation.privacyRequired": "Sie müssen bestätigen, dass Sie 19+ sind",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["en", "es", "fr", "de"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
