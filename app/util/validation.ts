// Validation utility functions for the signup forms

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface Step1Data {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Step2Data {
  country: string;
  privacy: boolean;
}

export interface ValidationMessages {
  firstNameRequired: string;
  firstNameInvalid: string;
  lastNameRequired: string;
  lastNameInvalid: string;
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordLength: string;
  passwordNumber: string;
  countryRequired: string;
  privacyRequired: string;
}

/**
 * Validates step 1 form data (personal information)
 */
export const validateStep1 = (formData: Step1Data, messages: ValidationMessages): ValidationResult => {
  const errors: Record<string, string> = {};

  // First name validation
  if (!formData.firstName.trim()) {
    errors.firstName = messages.firstNameRequired;
  } else if (!/^[A-Za-z]{2,}$/.test(formData.firstName.trim())) {
    errors.firstName = messages.firstNameInvalid;
  }

  // Last name validation
  if (!formData.lastName.trim()) {
    errors.lastName = messages.lastNameRequired;
  } else if (!/^[A-Za-z]{2,}$/.test(formData.lastName.trim())) {
    errors.lastName = messages.lastNameInvalid;
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = messages.emailRequired;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = messages.emailInvalid;
  }

  // Password validation
  if (!formData.password.trim()) {
    errors.password = messages.passwordRequired;
  } else if (formData.password.length < 6) {
    errors.password = messages.passwordLength;
  } else if (!/(?=.*[0-9])/.test(formData.password)) {
    errors.password = messages.passwordNumber;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates step 2 form data (additional information)
 */
export const validateStep2 = (formData: Step2Data, messages: ValidationMessages): ValidationResult => {
  const errors: Record<string, string> = {};

  // Country validation
  if (!formData.country) {
    errors.country = messages.countryRequired;
  }

  // Privacy validation
  if (!formData.privacy) {
    errors.privacy = messages.privacyRequired;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates complete signup data (both steps combined)
 */
export const validateCompleteSignup = (
  step1Data: Step1Data,
  step2Data: Step2Data,
  messages: ValidationMessages
): ValidationResult => {
  const step1Validation = validateStep1(step1Data, messages);
  const step2Validation = validateStep2(step2Data, messages);

  const allErrors = {
    ...step1Validation.errors,
    ...step2Validation.errors
  };

  return {
    isValid: step1Validation.isValid && step2Validation.isValid,
    errors: allErrors
  };
};

/**
 * Email format validation utility
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password strength validation utility
 */
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  if (!/(?=.*[0-9])/.test(password)) {
    errors.push('Password must include at least one number');
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must include at least one lowercase letter');
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must include at least one uppercase letter');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Name validation utility
 */
export const isValidName = (name: string): boolean => {
  return /^[A-Za-z]{2,}$/.test(name.trim());
};

/**
 * Clear specific field error
 */
export const clearFieldError = (
  currentErrors: Record<string, string>,
  fieldName: string
): Record<string, string> => {
  const newErrors = { ...currentErrors };
  delete newErrors[fieldName];
  return newErrors;
};
