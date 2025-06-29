// Form utility functions

import { clearFieldError } from './validation';

/**
 * Generic form field change handler
 */
export const createFieldChangeHandler = <T extends Record<string, any>>(
  setFormData: React.Dispatch<React.SetStateAction<T>>,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  fieldName: keyof T
) => {
  return (value: T[keyof T]) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    // Clear error for this field when user starts typing
    setErrors(prev => clearFieldError(prev, fieldName as string));
  };
};

/**
 * Create validation messages object from translation function
 */
export const createValidationMessages = (t: (key: string) => string) => ({
  firstNameRequired: t("validation.firstNameRequired"),
  firstNameInvalid: t("validation.firstNameInvalid"),
  lastNameRequired: t("validation.lastNameRequired"),
  lastNameInvalid: t("validation.lastNameInvalid"),
  emailRequired: t("validation.emailRequired"),
  emailInvalid: t("validation.emailInvalid"),
  passwordRequired: t("validation.passwordRequired"),
  passwordLength: t("validation.passwordLength"),
  passwordNumber: t("validation.passwordNumber"),
  countryRequired: t("validation.countryRequired"),
  privacyRequired: t("validation.privacyRequired"),
});

/**
 * Reset form data and errors
 */
export const resetForm = <T extends Record<string, any>>(
  setFormData: React.Dispatch<React.SetStateAction<T>>,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  initialData: T
) => {
  setFormData(initialData);
  setErrors({});
};

/**
 * Check if form has any errors
 */
export const hasFormErrors = (errors: Record<string, string>): boolean => {
  return Object.keys(errors).length > 0;
};

/**
 * Get first error message from form errors
 */
export const getFirstErrorMessage = (errors: Record<string, string>): string | null => {
  const firstErrorKey = Object.keys(errors)[0];
  return firstErrorKey ? errors[firstErrorKey] : null;
};

/**
 * Validate form field on blur
 */
export const validateFieldOnBlur = <T extends Record<string, any>>(
  formData: T,
  fieldName: keyof T,
  validationFn: (data: T) => Record<string, string>,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) => {
  const validation = validationFn(formData);
  const fieldError = validation[fieldName as string];

  if (fieldError) {
    setErrors(prev => ({ ...prev, [fieldName]: fieldError }));
  } else {
    setErrors(prev => clearFieldError(prev, fieldName as string));
  }
};

/**
 * Debounce function for form inputs
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Format form data for API submission
 */
export const formatFormData = <T extends Record<string, any>>(data: T): T => {
  const formatted: any = {};

  Object.keys(data).forEach(key => {
    const value = data[key];
    if (typeof value === 'string') {
      formatted[key] = value.trim();
    } else {
      formatted[key] = value;
    }
  });

  return formatted as T;
};
