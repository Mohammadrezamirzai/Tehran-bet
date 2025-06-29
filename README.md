# Tehran Bet - Next.js Casino App

Take about 4 hours


![Screenshot (33)](https://github.com/user-attachments/assets/1731498f-4b37-46e6-9046-93a0f954e586)

A modern, responsive casino betting application built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🎰 Multi-Step Signup Form
- **Step 1**: Personal information (first name, last name, email, password)
- **Step 2**: Additional information (country, privacy agreement)
- Real-time validation with error messages
- Progress indicator showing current step
- Smooth animations between steps

### 🔐 Authentication System
- Login form with email/password
- Forgot password functionality
- Form validation and error handling
- API integration for user registration

### 🎨 Modern UI/UX
- Glassmorphism navbar with particle effects
- Dark/Light mode toggle
- Multi-language support (English, Spanish, French, German, Persian)
- Responsive design for all devices
- Smooth animations and transitions

### 🌐 Internationalization
- Support for 5 languages
- Automatic language detection
- Language selector in navbar

## API Integration

### Signup Endpoint
The signup form sends user data to `/api/signup` with the following structure:

```typescript
interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  privacy: boolean;
}
```

### API Response
```typescript
// Success Response
{
  success: true,
  message: "Account created successfully",
  user: {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    country: string,
    createdAt: string
  }
}

// Error Response
{
  error: "Error message"
}
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   └── signup/
│   │       └── route.ts          # Signup API endpoint
│   ├── components/
│   │   ├── auth/
│   │   │   ├── SignupForm.tsx    # Step 1 of signup
│   │   │   └── SignupFormSecond.tsx # Step 2 of signup
│   │   └── ui/
│   │       ├── Navbar.tsx        # Modern navbar with effects
│   │       └── Button.tsx        # Reusable button component
│   ├── config/
│   │   └── api.ts               # API configuration
│   ├── data/
│   │   ├── countries.ts         # Country data
│   │   └── translations.ts      # Multi-language translations
│   ├── contexts/
│   │   └── LanguageContext.tsx  # Language management
│   └── util/
│       ├── validation.ts        # Form validation utilities
│       ├── api.ts              # API request utilities
│       └── form.ts             # Form handling utilities
```

## Code Organization

### 🧹 **Clean Code Structure**
The project follows a clean, modular architecture with utilities separated into dedicated files:

#### **Validation Utilities** (`app/util/validation.ts`)
- `validateStep1()` - Validates personal information
- `validateStep2()` - Validates additional information
- `validateCompleteSignup()` - Validates both steps combined
- `isValidEmail()` - Email format validation
- `validatePasswordStrength()` - Password strength checking
- `isValidName()` - Name validation
- `clearFieldError()` - Error clearing utility

#### **API Utilities** (`app/util/api.ts`)
- `submitSignupData()` - Submit signup data to API
- `apiRequest()` - Generic API request function
- `handleApiError()` - User-friendly error messages
- `checkApiHealth()` - API availability check

#### **Form Utilities** (`app/util/form.ts`)
- `createFieldChangeHandler()` - Generic field change handler
- `createValidationMessages()` - Validation message creation
- `resetForm()` - Form reset utility
- `hasFormErrors()` - Error checking
- `getFirstErrorMessage()` - Error message extraction

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Context** - State management

## Customization

### Adding New Languages
1. Add the language code to the `Language` type in `translations.ts`
2. Add translations for all keys in the new language
3. Update the language mapping if needed

### Modifying API Endpoints
1. Update the `API_CONFIG` in `app/config/api.ts`
2. Modify the fetch calls in the components
3. Update the API route handlers in `app/api/`

### Styling Changes
- Modify Tailwind classes in components
- Update color schemes in `tailwind.config.js`
- Add custom CSS in `globals.css`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
