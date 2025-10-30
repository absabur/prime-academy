import React from 'react';
import { AlertTriangle, Home } from 'lucide-react'; // Icons for error and home

// We define custom CSS animations here
const CustomStyles = () => (
  <style>
    {`
      @keyframes pulse-slow {
        0%, 100% {
          opacity: 0.8;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.05);
        }
      }

      .animate-pulse-slow {
        animation: pulse-slow 3s infinite ease-in-out;
      }
    `}
  </style>
);

const ErrorPage = ({ error, resetErrorBoundary }) => {
  return (
    <>
      <CustomStyles />
      {/* Main container: dark background (bg-primary), light text (text-secondary-bg) */}
      <div
        className="flex min-h-screen flex-col items-center justify-center bg-primary p-8 font-sans text-center text-secondary-bg"
        role="alert"
      >
        <div className="flex flex-col items-center">
          {/* Animated SVG Icon */}
          <div className="w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center -mt-8 -mb-8">
            <AlertTriangle
              className="w-full h-full text-red-500 animate-pulse-slow"
              strokeWidth={1}
            />
          </div>

          {/* Main headline */}
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Something Went Wrong
          </h1>

          {/* Friendly message */}
          <p className="mt-4 text-lg text-secondary-bg opacity-80">
            We're sorry, but the application encountered an error. You can try returning to the home
            page.
          </p>

          {/* The actual error message, styled for dark mode */}
          {error?.message && (
            <pre className="mt-6 w-full overflow-x-auto rounded-lg bg-black bg-opacity-20 p-4 text-left text-sm text-red-400">
              {error.message}
            </pre>
          )}

          {/* "Go Home" button (bg-secondary) */}
          <a
            href="/"
            className="mt-12 flex items-center gap-3 rounded-lg bg-secondary px-8 py-3 text-lg font-bold text-primary shadow-md transition-all duration-300 ease-in-out hover:bg-secondary-light hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-secondary-light focus:ring-opacity-50"
          >
            <Home className="h-6 w-6" />
            <span>Go Back Home</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
