import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword } from '../../utils/helpers';
import LoadingSpinner from '../../components/LoadingSpinner';

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, loading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ strength: 0, isValid: false });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must be less than 50 characters'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must be less than 50 characters'),
    email: Yup.string()
      .required('Email is required')
      .test('email', 'Please enter a valid email address', validateEmail),
    company: Yup.string()
      .max(100, 'Company name must be less than 100 characters'),
    industry: Yup.string()
      .max(100, 'Industry must be less than 100 characters'),
    password: Yup.string()
      .required('Password is required')
      .test('password', 'Password must meet security requirements', (value) => {
        if (!value) return false;
        const validation = validatePassword(value);
        return validation.isValid;
      }),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    acceptTerms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions'),
  });

  const handlePasswordChange = (password, setFieldValue) => {
    setFieldValue('password', password);
    const validation = validatePassword(password);
    setPasswordStrength(validation);
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const { confirmPassword, acceptTerms, ...userData } = values;
      const result = await register(userData);
      
      if (result.success) {
        navigate('/verify-email', { 
          state: { email: values.email, fromRegistration: true }
        });
      } else {
        // Handle specific error types
        if (result.error.includes('email')) {
          setFieldError('email', result.error);
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center mb-6">
              <div className="h-12 w-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="ml-3 text-2xl font-bold gradient-text">Nexora</span>
            </Link>
            
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Join thousands of businesses transforming with AI
            </p>
          </div>

          {/* Registration Form */}
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              company: '',
              industry: '',
              password: '',
              confirmPassword: '',
              acceptTerms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched, values, setFieldValue }) => (
              <Form className="mt-8 space-y-6">
                {/* Global error message */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Name fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      First name
                    </label>
                    <Field
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      className={`mt-1 input-field ${errors.firstName && touched.firstName ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="John"
                    />
                    <ErrorMessage name="firstName" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last name
                    </label>
                    <Field
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      className={`mt-1 input-field ${errors.lastName && touched.lastName ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Doe"
                    />
                    <ErrorMessage name="lastName" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                  </div>
                </div>

                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email address
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`mt-1 input-field ${errors.email && touched.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="john@example.com"
                  />
                  <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                </div>

                {/* Company and Industry fields */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Company (optional)
                    </label>
                    <Field
                      id="company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      className={`mt-1 input-field ${errors.company && touched.company ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Acme Corp"
                    />
                    <ErrorMessage name="company" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                  </div>

                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Industry (optional)
                    </label>
                    <Field
                      as="select"
                      id="industry"
                      name="industry"
                      className={`mt-1 input-field ${errors.industry && touched.industry ? 'border-red-500 focus:ring-red-500' : ''}`}
                    >
                      <option value="">Select your industry</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="education">Education</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage name="industry" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                  </div>
                </div>

                {/* Password field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      className={`input-field pr-10 ${errors.password && touched.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Create a strong password"
                      onChange={(e) => handlePasswordChange(e.target.value, setFieldValue)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L15.12 15.12m-4.242-4.242L9.464 8.464m1.414 1.414L15.12 15.12" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  {/* Password strength indicator */}
                  {values.password && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength.strength)}`}
                            style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${
                          passwordStrength.strength <= 2 ? 'text-red-600 dark:text-red-400' :
                          passwordStrength.strength <= 3 ? 'text-yellow-600 dark:text-yellow-400' :
                          passwordStrength.strength <= 4 ? 'text-blue-600 dark:text-blue-400' :
                          'text-green-600 dark:text-green-400'
                        }`}>
                          {getPasswordStrengthText(passwordStrength.strength)}
                        </span>
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                        <p>Password must contain:</p>
                        <ul className="mt-1 space-y-1">
                          <li className={`flex items-center ${passwordStrength.minLength ? 'text-green-600 dark:text-green-400' : ''}`}>
                            <span className="mr-1">{passwordStrength.minLength ? '✓' : '×'}</span>
                            At least 8 characters
                          </li>
                          <li className={`flex items-center ${passwordStrength.hasUpperCase ? 'text-green-600 dark:text-green-400' : ''}`}>
                            <span className="mr-1">{passwordStrength.hasUpperCase ? '✓' : '×'}</span>
                            One uppercase letter
                          </li>
                          <li className={`flex items-center ${passwordStrength.hasLowerCase ? 'text-green-600 dark:text-green-400' : ''}`}>
                            <span className="mr-1">{passwordStrength.hasLowerCase ? '✓' : '×'}</span>
                            One lowercase letter
                          </li>
                          <li className={`flex items-center ${passwordStrength.hasNumbers ? 'text-green-600 dark:text-green-400' : ''}`}>
                            <span className="mr-1">{passwordStrength.hasNumbers ? '✓' : '×'}</span>
                            One number
                          </li>
                          <li className={`flex items-center ${passwordStrength.hasSpecialChar ? 'text-green-600 dark:text-green-400' : ''}`}>
                            <span className="mr-1">{passwordStrength.hasSpecialChar ? '✓' : '×'}</span>
                            One special character
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                </div>

                {/* Confirm Password field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm password
                  </label>
                  <div className="mt-1 relative">
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      className={`input-field pr-10 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L15.12 15.12m-4.242-4.242L9.464 8.464m1.414 1.414L15.12 15.12" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                </div>

                {/* Terms and conditions */}
                <div className="flex items-center">
                  <Field
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                <ErrorMessage name="acceptTerms" component="div" className="text-sm text-red-600 dark:text-red-400" />

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {(isSubmitting || loading) ? (
                      <LoadingSpinner size="small" color="white" />
                    ) : (
                      <>
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <svg className="h-5 w-5 text-primary-500 group-hover:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                        </span>
                        Create account
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {/* Sign in link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;