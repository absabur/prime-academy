import React from 'react';
import { Home } from 'lucide-react'; // Still good to have a simple icon for the button
import PrimaryButton from './PrimaryButton';

// We define custom CSS animations here as we can't edit tailwind.config.js
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

      @keyframes scan-line {
        0% {
          transform: translateY(-20px);
        }
        50% {
          transform: translateY(20px);
        }
        100% {
          transform: translateY(-20px);
        }
      }

      .animate-scan-line {
        animation: scan-line 2.5s infinite ease-in-out;
      }
    `}
  </style>
);

export default function NotFound() {
  return (
    <>
      <CustomStyles />
      {/* Main container: light background (bg-secondary-bg), dark text (text-primary) */}
      <div className="flex min-h-screen flex-col items-center justify-center bg-secondary-bg p-8 font-sans text-center text-primary">
        <div className="flex flex-col items-center">
          {/* Animated SVG Icon */}
          <div className="w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center -mt-8 -mb-8">
            <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Group for pulsing effect */}
              <g className="animate-pulse-slow">
                {/* Magnifying glass handle (color-primary) */}
                <rect
                  x="130"
                  y="130"
                  width="20"
                  height="50"
                  rx="5"
                  fill="var(--color-primary)"
                  transform="rotate(45 140 155)"
                />

                {/* Magnifying glass circle (color-primary) */}
                <circle
                  cx="90"
                  cy="90"
                  r="60"
                  stroke="var(--color-primary)"
                  strokeWidth="12"
                  fill="none"
                />

                {/* Glass lens (color-primary-light) */}
                <circle cx="90" cy="90" r="54" fill="var(--color-primary)" opacity="0.1" />

                {/* Animated scan line (color-secondary) */}
                <rect
                  className="animate-scan-line"
                  x="55"
                  y="88"
                  width="70"
                  height="4"
                  rx="2"
                  fill="var(--color-secondary)"
                  opacity="0.8"
                />
              </g>
            </svg>
          </div>

          {/* The "404" text */}
          <h1 className="mt-4 text-7xl font-extrabold text-primary sm:text-8xl">404</h1>

          {/* Main headline */}
          <h2 className="mt-4 text-3xl font-bold text-primary sm:text-4xl">Page Not Found</h2>

          {/* Friendly message */}
          <p className="mt-4 text-lg text-primary opacity-80">
            Oops! It looks like this page wandered off. Let's get you back on track.
          </p>

          {/* "Go Home" button (bg-secondary) */}
          <PrimaryButton
            className="mt-12 px-xl py-lg text-lg"
            href={`/`}
            text={`Go Back Home`}
            prefixIcon={<Home className="h-10 w-10" />}
          />
        </div>
      </div>
    </>
  );
}
