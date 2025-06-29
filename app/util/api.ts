// API utility functions

// API Configuration
const API_CONFIG = {
  BASE_URL: "https://716949ea-d279-411c-995f-b2207f7cff33.mock.pstmn.io/v3/default/config",
  ENDPOINTS: {
    SIGNUP: "/signup",
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
  },
  TIMEOUT: 10000,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
};

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  privacy: boolean;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    createdAt: string;
  };
}

/**
 * Submit user signup data to the API
 */
export const submitSignupData = async (userData: SignupRequest): Promise<ApiResponse<SignupResponse>> => {
  try {
    const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.SIGNUP, {
      method: 'POST',
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error submitting signup data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Generic API request function
 */
export const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const url = endpoint.startsWith('http') ? endpoint : API_CONFIG.BASE_URL + endpoint;

    const response = await fetch(url, {
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('API request error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Handle API errors and provide user-friendly messages
 */
export const handleApiError = (error: string): string => {
  // Map common error messages to user-friendly versions
  const errorMap: Record<string, string> = {
    'Email already exists': 'An account with this email already exists',
    'Invalid email format': 'Please enter a valid email address',
    'Password too weak': 'Password must be at least 6 characters and include a number',
    'All fields are required': 'Please fill in all required fields',
    'Network error': 'Connection error. Please check your internet connection and try again.',
  };

  return errorMap[error] || error || 'An unexpected error occurred. Please try again.';
};

/**
 * Check if the API is available
 */
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(API_CONFIG.BASE_URL, { method: 'GET' });
    return response.ok;
  } catch {
    return false;
  }
};
