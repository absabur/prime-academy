This file is a merged representation of the entire codebase, combined into a single document by Repomix.

## Create this readme

```
npx repomix@latest --style markdown
```

# File Summary

## Purpose

This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format

The content is organized as follows:

1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
   a. A header with the file path (## File: path/to/file)
   b. The full contents of the file in a code block

## Usage Guidelines

- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes

- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure

```
.eslintrc.cjs
.gitignore
.prettierignore
.prettierrc
components.json
eslint.config.js
index.html
jsconfig.json
package.json
public/_redirects
README.md
src/api/axios.js
src/api/setupAxiosInterceptors.js
src/App.jsx
src/components/common/BaseCard.jsx
src/components/common/CourseFeatureCard.jsx
src/components/common/css/tabButton.css
src/components/common/css/videoButton.css
src/components/common/ErrorPage.jsx
src/components/common/Footer.jsx
src/components/common/HeroBgLayouts.jsx
src/components/common/HeroSection.jsx
src/components/common/HorizontalScroll.jsx
src/components/common/ImageContent.jsx
src/components/common/InnerSection.jsx
src/components/common/KnowUs.jsx
src/components/common/Modal.jsx
src/components/common/Navbar.jsx
src/components/common/NotFound.jsx
src/components/common/OurCourse.jsx
src/components/common/OuterSection.jsx
src/components/common/PaginationSection.jsx
src/components/common/PartnerCarousel.jsx
src/components/common/PartnerSlider.jsx
src/components/common/PathUrl.jsx
src/components/common/PrimaryButton.jsx
src/components/common/PrivacyHeading.jsx
src/components/common/RoundShape.jsx
src/components/common/SecondaryButton.jsx
src/components/common/TabButtons.jsx
src/components/common/TabContainSecton.jsx
src/components/common/UpperFooterSection.jsx
src/components/common/VerticalScroll.jsx
src/components/common/YtVideoPlay.jsx
src/components/Root/about/CarrersSection.jsx
src/components/Root/about/HeroSection.jsx
src/components/Root/about/KnowUs.jsx
src/components/Root/about/LargestProvider.jsx
src/components/Root/about/OurValues.jsx
src/components/Root/about/WhoWeSection.jsx
src/components/Root/blogPage/BlogBody.jsx
src/components/Root/blogPage/BlogBodySection.jsx
src/components/Root/blogPage/BlogShare.jsx
src/components/Root/blogPage/BlogSkeleton.jsx
src/components/Root/blogPage/HeroSection.jsx
src/components/Root/blogs/BlogCard.jsx
src/components/Root/blogs/BlogCards.jsx
src/components/Root/blogs/BlogCardSkeleton.jsx
src/components/Root/blogs/BlogCardsSection.jsx
src/components/Root/blogs/BlogCategoriesSkeleton.jsx
src/components/Root/blogs/HeroSection.jsx
src/components/Root/blogs/LeftFilter.jsx
src/components/Root/blogs/TopFilter.jsx
src/components/Root/blogs/UpperFooterSection.jsx
src/components/Root/contact/FormSection.jsx
src/components/Root/contact/HeroSection.jsx
src/components/Root/courses/CourseCard.jsx
src/components/Root/courses/CourseCards.jsx
src/components/Root/courses/CourseCardSkeleton.jsx
src/components/Root/courses/CourseCardsSection.jsx
src/components/Root/courses/HeroSection.jsx
src/components/Root/courses/TopFilter.jsx
src/components/Root/courses/UpperFooterSection.jsx
src/components/Root/faqs/FaqsSections.jsx
src/components/Root/faqs/HeroSection.jsx
src/components/Root/faqs/ScrollIntoSectionButtons.jsx
src/components/Root/faqs/UpperFooterSection.jsx
src/components/Root/home/AboutPrimeAcademy.jsx
src/components/Root/home/BlogCard.jsx
src/components/Root/home/css/hero.css
src/components/Root/home/FeaturesSection.jsx
src/components/Root/home/HeroSection.jsx
src/components/Root/home/HomeHeroBgLayouts.jsx
src/components/Root/home/ImageContentSection.jsx
src/components/Root/home/KnowUs.jsx
src/components/Root/home/OurBlogs.jsx
src/components/Root/landing/LandingFooter.jsx
src/components/Root/landing/LandingNavbar.jsx
src/components/Root/login/ContentCard.jsx
src/components/Root/login/RoleButton.jsx
src/components/Root/privacypolicy/PrivacyContent.jsx
src/components/Root/privacypolicy/PrivacyPolicyHero.jsx
src/components/Root/refundpolicy/RefundContent.jsx
src/components/Root/refundpolicy/RefundPolicyHero.jsx
src/components/Root/singleCourse/BenefitsThisCourse.jsx
src/components/Root/singleCourse/CourseContent.jsx
src/components/Root/singleCourse/CourseOutLine.jsx
src/components/Root/singleCourse/CourseQuestionCard.jsx
src/components/Root/singleCourse/CourseValueHeading.jsx
src/components/Root/singleCourse/FactStat.jsx
src/components/Root/singleCourse/ImgContentBottom.jsx
src/components/Root/singleCourse/LeftSideContent/LeftSideContent.jsx
src/components/Root/singleCourse/LetStartFrom.jsx
src/components/Root/singleCourse/OutLineData.jsx
src/components/Root/singleCourse/RightSideContent/RightSideContent.jsx
src/components/Root/singleCourse/SingleCourseHero.jsx
src/components/Root/singleCourse/SingleCourseTab.jsx
src/components/Root/singleCourse/StoryCard.jsx
src/components/Root/singleCourse/SuccessStories.jsx
src/components/Root/singleCourse/TabBuuton.jsx
src/components/Root/singleCourse/WhoCanEnroll.jsx
src/components/ui/button.jsx
src/components/ui/card.jsx
src/components/ui/pagination.jsx
src/components/ui/skeleton.jsx
src/data/aboutPageData.js
src/data/blogPageData.js
src/data/courseData.js
src/data/faqsPageData.js
src/data/homePageData.js
src/data/singleCoursePageData.js
src/index.css
src/layouts/AuthLayout.jsx
src/layouts/LandingLayout.jsx
src/layouts/ProtectedLayout.jsx
src/layouts/PublicLayout.jsx
src/lib/utils.js
src/main.jsx
src/pages/Dashboard/Dashboard/Dashboard.jsx
src/pages/Root/About/About.jsx
src/pages/Root/Blog/Blog.jsx
src/pages/Root/Blogs/Blogs.jsx
src/pages/Root/Contact/Contact.jsx
src/pages/Root/Courses/Courses.jsx
src/pages/Root/FAQs/FAQs.jsx
src/pages/Root/Home/Home.jsx
src/pages/Root/Landing/Landing.jsx
src/pages/Root/LoginRole/LoginRole.jsx
src/pages/Root/LoginStudent/LoginStudent.jsx
src/pages/Root/Privacy Policy/PrivacyPolicy.jsx
src/pages/Root/refund/RefundPolicy.jsx
src/pages/Root/singleCourse/SingleCourse.jsx
src/redux/auth/authAction.js
src/redux/auth/authSlice.js
src/redux/blogs/blogAction.js
src/redux/blogs/blogSlice.js
src/redux/brands/brandsAction.js
src/redux/brands/brandsSlice.js
src/redux/courses/courseAction.js
src/redux/courses/courseSlice.js
src/redux/hero/heroAction.js
src/redux/hero/heroSlice.js
src/redux/store.js
src/routes/RoutesComponent.jsx
src/utils/getYouTubeID.js
src/utils/sweetAlert.js
src/utils/timeFormat.js
vercel.json
vite.config.js
```

# Files

## File: .eslintrc.cjs

```
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    react: { version: 'detect' },
  },
};
```

## File: .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.vercel
```

## File: .prettierignore

```
node_modules
dist
```

## File: .prettierrc

```
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "es5",
  "endOfLine": "lf"
}
```

## File: components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}
```

## File: eslint.config.js

```javascript
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
]);
```

## File: index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="nofollow" />
    <title>primeacademy_frontend</title>
  </head>
  <body class="bg-white">
    <div id="root"></div>
    <div id="modal-root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## File: jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

## File: package.json

```json
{
  "name": "primeacademy_frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.3",
    "@reduxjs/toolkit": "^2.9.0",
    "@tailwindcss/vite": "^4.1.13",
    "axios": "^1.12.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "framer-motion": "^12.23.22",
    "lucide-react": "^0.544.0",
    "react": "^19.1.1",
    "react-countup": "^6.5.3",
    "react-dom": "^19.1.1",
    "react-error-boundary": "^6.0.0",
    "react-helmet": "^6.1.0",
    "react-hook-form": "^7.63.0",
    "sweetalert2": "^11.24.1",
    "react-icons": "^5.5.0",
    "react-markdown": "^10.1.0",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.9.2",
    "swiper": "^12.0.2",
    "tailwind-merge": "^3.3.1",
    "tailwindcss": "^4.1.13"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@types/node": "^24.6.2",
    "@types/react": "^19.1.13",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.3",
    "eslint": "^9.36.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.4.0",
    "prettier": "^3.6.2",
    "tw-animate-css": "^1.4.0",
    "vite": "^7.1.7"
  }
}
```

## File: public/\_redirects

```
/* /index.html 200
```

## File: README.md

````markdown
# React + Vite

## Environment

- **Node.js version:** 22.14.0
- **npm version:** 11.6.0

## Getting Started

Follow these steps to clone the repository, install dependencies, and run the project:

```bash
# Clone the repository
git clone https://github.com/PrimeAcademyBD/frontend.git

# Navigate to the project folder
cd frontend

# Checkout the development branch
git checkout dev

# Install dependencies
npm install

# Start development server (with HMR)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```
````

## File: src/api/axios.js

```javascript
// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
```

## File: src/api/setupAxiosInterceptors.js

```javascript
// src/api/setupAxiosInterceptors.js
import axios from 'axios';
import api from './axios';
import { logout } from '../redux/auth/authSlice';
import { refreshAccessToken } from '../redux/auth/authAction';

export const setupAxiosInterceptors = (store) => {
  // ✅ Attach access token
  api.interceptors.request.use((config) => {
    const { accessToken } = store.getState().auth;
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  // ✅ Handle 401 (token expired)
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const { refreshToken } = store.getState().auth;
        if (!refreshToken) {
          store.dispatch(logout());
          return Promise.reject(error);
        }

        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
            refreshToken,
          });

          // update redux state manually
          store.dispatch(refreshAccessToken.fulfilled(res.data, 'fulfilled', refreshToken));

          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return api(originalRequest);
        } catch {
          store.dispatch(logout());
        }
      }
      return Promise.reject(error);
    }
  );
};
```

## File: src/App.jsx

```javascript
/**
 * App Component
 * -------------
 * - Serves as the root-level component of the application
 * - Keeps the app structure clean by delegating routing logic
 *   to a dedicated `RoutesComponent`
 * - This approach improves maintainability and scalability
 */

import RoutesComponent from './routes/RoutesComponent';

function App() {
  return (
    // Centralized routing component for managing application routes
    <RoutesComponent />
  );
}

export default App;
```

## File: src/components/common/BaseCard.jsx

```javascript
// src/components/common/BaseCard.jsx
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const BaseCard = ({ children, className, shadow = true, bg = true, ...props }) => {
  return (
    <Card
      className={cn(
        'flex flex-col h-full rounded-xl p-6 transition-all',
        shadow && 'shadow-md hover:shadow-lg',
        bg && 'bg-white/25',
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
};

export default BaseCard;
```

## File: src/components/common/CourseFeatureCard.jsx

```javascript
import BaseCard from './BaseCard';
import { FaArrowRight } from 'react-icons/fa';

const CourseFeatureCard = ({ course }) => {
  return (
    <BaseCard>
      <div className="space-y-4">
        {course.logo ? (
          <img src={course.logo} alt={course.title} width={50} />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded" />
        )}
        <h3 className="font-heading font-bold text-xl">{course.title}</h3>
        <p className="text-base text-black/70 line-clamp-6">{course.description}</p>
      </div>

      <button className="flex items-center gap-2 mt-auto text-primary font-heading font-bold hover:underline">
        Learn More <FaArrowRight />
      </button>
    </BaseCard>
  );
};

export default CourseFeatureCard;
```

## File: src/components/common/css/tabButton.css

```css
.tab-button {
  position: relative;
  overflow: visible; /* allow the border to show outside */
}

/* Bottom border (line) */
.tab-button::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -5px; /* 👈 pushes border down */
  height: 5px;
  width: 0;
  background: var(--color-secondary);
  transition: width 0.3s ease-in-out;
  border-radius: 10px;
}

/* Hover animation */
.tab-button:hover::after {
  width: 100%; /* animate to full width */
}
```

## File: src/components/common/css/videoButton.css

```css
/* yt play button triangle design */
.play:before {
  border-bottom: 20px solid transparent;
  border-left: 30px solid var(--color-secondary);
  border-top: 20px solid transparent;
  content: '';
  height: 0;
  left: 55%;
  width: 0;
  position: absolute;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.play:hover:before {
  border-left: 30px solid white;
}
```

## File: src/components/common/ErrorPage.jsx

```javascript
const ErrorPage = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen w-vw flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold">Something went wrong!</h1>
      <pre style={{ color: 'red' }}>{error?.message}</pre>
    </div>
  );
};

export default ErrorPage;
```

## File: src/components/common/Footer.jsx

```javascript
/**
 * Footer Component
 * ----------------
 * - Displays brand logo, contact information, and quick navigation links
 * - Uses a grid layout for responsive design (1 col on mobile, 4 cols on desktop)
 * - Social media icons are mapped dynamically for easier scalability
 * - Footer links and sections are defined in `footerData` for reusability
 */

import { Link } from 'react-router-dom';
import InnerSection from './InnerSection';
import OuterSection from './OuterSection';

import logo from '/assets/prime-academy-logo-full.png';

// Icons
import { FaFacebook, FaPhone, FaTwitter } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { LiaLinkedin } from 'react-icons/lia';

// Footer structured data
const footerData = [
  {
    id: 1,
    title: 'Training & Development',
    links: [
      { name: 'Web Development', url: '#' },
      { name: 'UI/UX Design', url: '#' },
      { name: 'Digital Marketing', url: '#' },
      { name: 'Freelancing Skills', url: '#' },
    ],
  },
  {
    id: 2,
    title: 'Support & Guidance',
    links: [
      { name: 'Career Counseling', url: '#' },
      { name: 'FAQs', url: '/faqs' },
      { name: 'Privacy Policy', url: '/privacy-policy' },
      { name: 'Refund Policy', url: '/refund-policy' },
    ],
  },
  {
    id: 3,
    title: 'Contact',
    links: [
      { name: 'Email: info@example.com', url: 'mailto:info@example.com' },
      { name: 'Phone: +880 1234-567890', url: 'tel:+8801234567890' },
      { name: 'Location: Dhaka, Bangladesh', url: '/contact' },
    ],
  },
];

// Social media links
const socialLinks = [
  { url: '#', icon: <FaFacebook />, label: 'Facebook' },
  { url: '#', icon: <FaTwitter />, label: 'Twitter' },
  { url: '#', icon: <LiaLinkedin />, label: 'LinkedIn' },
];

const Footer = () => {
  return (
    <OuterSection className="mt-auto bg-primary">
      <InnerSection
        Tag="footer"
        className="text-white grid grid-cols-1 md:grid-cols-4 gap-lg py-15"
      >
        {/* Brand + Primary Contact */}
        <div className="space-y-4">
          <Link to="/" aria-label="Go to Home">
            <img className="w-[135px]" src={logo} alt="Prime Academy Logo" />
          </Link>

          {/* Direct phone and email */}
          <Link
            href="tel:+8801319392030"
            className="hover:text-white flex items-center gap-2 mt-4 text-sm font-normal font-heading text-white/70 hover:underline"
          >
            <FaPhone /> +880 1319-392030
          </Link>
          <Link
            href="mailto:rahadmondal165@gmail.com"
            className="hover:text-white flex items-center gap-2 mt-2 text-sm font-normal font-heading text-white/70 hover:underline"
          >
            <FaMessage /> rahadmondal165@gmail.com
          </Link>

          {/* Social links */}
          <div className="flex items-center gap-4 mt-4">
            {socialLinks.map(({ url, icon, label }, index) => (
              <Link
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:text-white flex items-center justify-center text-base bg-white text-primary p-2 rounded-md hover:opacity-80 transition"
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Dynamic footer sections */}
        {footerData.map((section) => (
          <div key={section.id}>
            <h3 className="font-bold font-heading text-lg mb-4">{section.title}</h3>
            <ul className="space-y-3">
              {section.links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.url}
                    className="hover:text-white hover:underline text-sm font-normal font-heading text-white/70"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Copyright */}
        <div className="md:col-span-4 mt-10 text-center">
          <p className="text-sm font-normal font-heading text-white/70">
            © 2025 Prime Academy. All rights reserved.
          </p>
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default Footer;
```

## File: src/components/common/HeroBgLayouts.jsx

```javascript
import React, { useState } from 'react';

const HeroBgLayouts = ({ backgroundImage }) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {/* bg shape image of left side */}
      <div
        className="absolute left-0 top-0 w-full bg-cover bg-center h-[100%] z-3"
        style={{ backgroundImage: `url(/assets/hero-pattern.png)` }}
      ></div>

      {/* bg image from backend right side */}
      <img
        className={`absolute right-0 top-0 w-full md:w-[70%] h-[100%] object-cover z-2 transition-opacity duration-700 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        src={backgroundImage}
        alt="Hero"
        onLoad={() => setLoading(false)}
      />

      {/* bottom angle shape right */}
      <div className="absolute -right-10 -bottom-60 w-[120%] h-70 bg-white z-4 -rotate-6"></div>

      {/* bottom angle shape left */}
      <div className="absolute -left-40 md:-left-150 -bottom-60 w-[120%] h-70 bg-white z-4 rotate-10"></div>

      {/* light black overlay */}
      <div className="absolute z-3 top-0 left-0 w-full h-full bg-black/20"></div>
    </>
  );
};

export default HeroBgLayouts;
```

## File: src/components/common/HeroSection.jsx

```javascript
import OuterSection from './OuterSection';
import InnerSection from './InnerSection';
import PathUrl from './PathUrl';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import RoundShape from './RoundShape';
import HeroBgLayouts from './HeroBgLayouts';

const HeroSection = ({
  backgroundImage,
  className = '',
  layout = 'centered',
  contentPosition = 'start',
  title,
  description,
  additionalText,
  updatedDate,
  breadcrumbs,
  buttons,
}) => {
  const renderButtons = () => {
    if (!buttons || buttons.length === 0) return null;

    return (
      <div className="flex gap-lg flex-col sm:flex-row mt-xl">
        {buttons.map((button, index) => {
          const ButtonComponent = button?.type === 'primary' ? PrimaryButton : SecondaryButton;
          if (button?.url) {
            return (
              <ButtonComponent
                key={index}
                href={button.url}
                text={button.text}
                className="rounded-lg"
                from={`hero`}
              />
            );
          }
        })}
      </div>
    );
  };

  const renderContent = () => (
    <div className="max-w-[500px]">
      {/* Breadcrumbs */}
      {breadcrumbs && <PathUrl links={breadcrumbs} />}

      {/* Title */}
      <h1
        className={`uppercase text-white heading-5xl mb-md ${
          breadcrumbs ? 'mt-60 md:mt-[100px]' : ''
        } ${layout === 'split' ? 'leading-2xl' : ''}`}
      >
        {title}
      </h1>

      {/* Updated Date */}
      {updatedDate && (
        <p className="font-heading font-bold text-base text-white mb-md">
          Last updated: {updatedDate}
        </p>
      )}

      {/* Additional Text */}
      {additionalText && (
        <p className="font-heading font-bold text-base text-white mb-md">{additionalText}</p>
      )}

      {/* Description */}
      {description && (
        <p className="font-heading text-sm text-white/70 leading-lg lg:max-w-[80%]">
          {description}
        </p>
      )}

      {/* Buttons */}
      {renderButtons()}
    </div>
  );

  return (
    <OuterSection
      className={`bg-secondary relative common-hero-section min-h-[800px] pt-[70px] ${className}`}
      style={{ zIndex: 40 }}
    >
      {/* bg layouts */}
      <HeroBgLayouts backgroundImage={backgroundImage} />

      {/* content */}
      <InnerSection
        className={`z-5 ${contentPosition === 'start' ? 'self-start' : 'items-center'}`}
      >
        {layout === 'split' ? (
          <div className="grid grid-cols-12 justify-center items-center w-full gap-xs">
            <div className="col-span-12 lg:col-span-5 space-y-lg">{renderContent()}</div>
          </div>
        ) : (
          renderContent()
        )}
      </InnerSection>
    </OuterSection>
  );
};

export default HeroSection;
```

## File: src/components/common/HorizontalScroll.jsx

```javascript
'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const HorizontalScrollSection = ({ items }) => {
  if (!items?.length) {
    return;
  }

  const slides = [...items, ...items, ...items];

  const [activeIndex, setActiveIndex] = useState(0); // currently visible slide

  const getSlideColor = (slideIndex) =>
    slideIndex === activeIndex ? 'text-white' : 'text-white/30';

  return (
    <Swiper
      slidesPerView={1} // only one slide visible
      slidesPerGroup={1}
      loop={true}
      speed={700}
      modules={[Autoplay]}
      autoplay={{ delay: 1500, disableOnInteraction: false }}
      allowTouchMove={false}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      className="w-full"
    >
      {slides.map((item, i) => (
        <SwiperSlide key={i} className="flex justify-center">
          <h2
            className={`heading-home-hero-scroll whitespace-nowrap uppercase ${getSlideColor(i)}`}
          >
            {item?.text}
          </h2>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HorizontalScrollSection;
```

## File: src/components/common/ImageContent.jsx

```javascript
import { motion } from 'framer-motion';
import Modal from './Modal';
import YtVideoAutoPlay from './YtVideoPlay';
import { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import { getYouTubeID } from '../../utils/getYouTubeID.js';
import './css/videoButton.css';

const ImageContent = ({ data, ip }) => {
  const [modal, setModal] = useState(false);
  const [mute, setMute] = useState(true); // 🔇 Start muted

  const openModal = () => {
    setMute(false); // 🔊 Enable sound when clicked
    setModal(true);
  };

  return (
    <div className="flex gap-15 flex-col md:flex-row">
      {modal && (
        <Modal setModal={setModal}>
          <div className="w-full md:w-1/2 aspect-video" onClick={(e) => e.stopPropagation()}>
            <YtVideoAutoPlay url={data.video} mute={mute} />
          </div>
        </Modal>
      )}
      <div className={`flex-1 relative flex items-center ${ip === 'right' ? 'order-2' : ''}`}>
        <motion.div
          initial={{ opacity: 0, x: ip === 'right' ? 30 : -30, y: 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`w-full relative`}
        >
          {/* 🔹 Image / Video preview */}
          {data.image ? (
            <img
              src={data.image}
              alt={data.title}
              className="relative z-20 w-full h-full object-cover rounded-lg"
            />
          ) : (
            <img
              src={`https://i.ytimg.com/vi/${getYouTubeID(data.video)}/hq720.jpg`}
              alt={data.title}
              className="relative z-20 w-full h-full object-cover rounded-lg"
            />
          )}

          {/* Play button */}
          {data.video && (
            <div
              onClick={openModal}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white play cursor-pointer hover:bg-secondary z-30"
            ></div>
          )}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: ip === 'right' ? -30 : 30, y: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`w-full relative flex-1 flex gap-lg flex-col`}
      >
        <div className={`flex-1 flex flex-col justify-start ${ip == 'right' && 'order-1'}`}>
          <h2 className="text-3xl leading-xl font-bold text-black uppercase mb-md">{data.title}</h2>

          <div className="w-full space-y-sm">
            {data.additional_info.split('\n').map((answer, index) =>
              answer.trim().length ? (
                <p className="text-heading text-base leading-lg" key={index}>
                  {answer}
                </p>
              ) : null
            )}
          </div>

          {data.url ? (
            <PrimaryButton
              href={`/${data.url}`}
              text={data.buttonText}
              className="self-start rounded-lg mt-xl"
            />
          ) : (
            <>
              {data.buttonText && (
                <PrimaryButton className="self-start rounded-lg mt-xl" text={data.buttonText} />
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ImageContent;
```

## File: src/components/common/InnerSection.jsx

```javascript
const InnerSection = ({ Tag = 'div', children, className = '', style }) => {
  return (
    <Tag
      className={`w-max-w px-[20px] md:px-[30px] lg:px-[60px] py-15 overflow-x-hidden ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
};

export default InnerSection;
```

## File: src/components/common/KnowUs.jsx

```javascript
/**
 * KnowUs Component
 * ----------------
 * - Highlights key statistics and achievements of Prime Academy
 * - Split layout:
 *    1. Text and CTA on the left
 *    2. Statistics grid on the right
 * - Uses OuterSection + InnerSection for consistent layout
 * - Includes a PrimaryButton for user engagement
 */

import CountUp from 'react-countup';
import PrimaryButton from './PrimaryButton';
import { useEffect, useRef, useState } from 'react';

const KnowUsComponent = ({ content, statsData }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(ref);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting); // true if element is visible
      },
      { threshold: 0.5 } // 50% of element must be visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect(); // cleanup
  }, []);

  return (
    <div className="flex gap-xl flex-col md:flex-row">
      {/* Left Column: Heading, description, and CTA */}
      <div className="flex-1 self-start">
        <h2 className="text-3xl font-bold font-heading text-black mb-md">{content?.title}</h2>
        <p className="font-heading text-black text-sm font-normal max-w-90">
          {content?.description}
        </p>
        {content?.button_text && (
          <PrimaryButton
            className="rounded-lg mt-xl"
            text={content?.button_text}
            href={content?.button_url}
          />
        )}
      </div>

      {/* Right Column: Statistics grid */}
      <div className="flex-2 grid grid-cols-1 md:grid-cols-2 gap-lg justify-center items-start">
        {statsData.map((stat, index) => (
          <div ref={ref} key={index} className="space-y-sm">
            {stat.type == 'number' && inView ? (
              <CountUp start={0} duration={1} end={stat.value} delay={0} suffix={stat.extension}>
                {({ countUpRef }) => <h3 ref={countUpRef} className="break-words heading-5xl"></h3>}
              </CountUp>
            ) : (
              <h3 className="break-words heading-5xl">
                {/* Stat value */}
                {stat.value}
              </h3>
            )}

            {/* Decorative progress bar */}
            <div className="bg-secondary h-2 rounded-full w-[250px]"></div>

            {/* Stat description */}
            <p className="text-base text-black font-normal font-heading">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowUsComponent;
```

## File: src/components/common/Modal.jsx

```javascript
import { createPortal } from 'react-dom';
import { RxCross1 } from 'react-icons/rx';

const Modal = ({ children, setModal }) => {
  return createPortal(
    <div
      onClick={() => setModal(false)}
      className="z-[100] fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <button
        onClick={() => setModal(false)}
        className="absolute right-3 top-3 text-white text-xl font-bold cursor-pointer"
      >
        <RxCross1 />
      </button>
      {children}
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
```

## File: src/components/common/Navbar.jsx

```javascript
/**
 * Navbar Component
 * ----------------
 * - Displays the application logo and main navigation links
 * - Changes style dynamically based on:
 *    1. Current route (home vs. other pages)
 *    2. Scroll position (transparent vs. solid background on home)
 * - Provides consistent navigation across all pages
 */

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import OuterSection from './OuterSection';
import InnerSection from './InnerSection';
import { FiMenu, FiX } from 'react-icons/fi'; // ✅ react-icons
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Scroll effect only on home
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Background class
  const bgClass = isHome
    ? scrolled
      ? 'bg-white shadow-lg'
      : 'bg-transparent'
    : 'bg-white shadow-lg';

  // Logo change
  const logoSrc =
    isHome && !scrolled
      ? '/assets/prime-academy-logo-full.png'
      : '/assets/prime-academy-logo-full-dark.png';

  // Text color on home
  const textColor = isHome && !scrolled ? 'text-white' : 'text-black';

  const navLinks = [
    { text: 'About Us', url: '/about' },
    // { text: 'Blogs', url: '/blogs' },
    // { text: 'Courses', url: '/courses' },
    { text: 'Contact Us', url: '/contact' },
    { text: 'FAQs', url: '/faqs' },
    {
      text: isAuthenticated ? 'Dashboard' : 'Student Login',
      url: isAuthenticated ? '/dashboard' : '/login/student',
    },
    {
      text: !isAuthenticated && 'Role Login',
      url: !isAuthenticated && '/login/role',
    },
  ];

  return (
    <OuterSection
      className={`fixed top-0 left-0 w-full transition-colors duration-300 z-[100] ${bgClass}`}
      style={{ overflow: 'visible' }}
    >
      <InnerSection Tag="header" className="py-sm flex justify-between items-center">
        {/* Logo */}
        <Link to="/" aria-label="Go to Home" onClick={() => setMenuOpen(false)}>
          <img src={logoSrc} className="w-[190px]" alt="Prime Logo" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center gap-xl">
          {navLinks.map(({ text, url }) => {
            const isActive = location.pathname === url;
            return (
              <Link
                key={url}
                to={url}
                className={`font-semibold transition-colors duration-200 ${
                  isActive ? 'text-primary underline underline-offset-4' : textColor
                }`}
              >
                {text}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <FiX className={`w-7 h-7 ${textColor}`} />
          ) : (
            <FiMenu className={`w-7 h-7 ${textColor}`} />
          )}
        </button>
      </InnerSection>

      {/* Mobile Nav Drawer */}
      {menuOpen && (
        <div className={`md:hidden bg-white shadow-lg absolute w-full top-[80px]`}>
          <nav className="flex flex-col items-center gap-4 py-6">
            {navLinks.map(({ text, url }) => {
              const isActive = location.pathname === url;
              return (
                <Link
                  key={url}
                  to={url}
                  onClick={() => setMenuOpen(false)}
                  className={`font-semibold text-lg ${
                    isActive ? 'text-primary underline underline-offset-4' : 'text-black'
                  }`}
                >
                  {text}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </OuterSection>
  );
};

export default Navbar;
```

## File: src/components/common/NotFound.jsx

```javascript
const NotFound = () => {
  return (
    <div className="min-h-screen w-vw flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold">404 Not Found!</h1>
    </div>
  );
};

export default NotFound;
```

## File: src/components/common/OurCourse.jsx

```javascript
/**
 * OurCourse Component
 * -------------------
 * - Displays a list of courses categorized by levels (Level 3, 5, 6)
 * - Supports desktop tabs and mobile dropdown for category selection
 * - Uses OuterSection + InnerSection for consistent spacing and layout
 * - Displays course cards dynamically based on selected category
 */

import OuterSection from './OuterSection';
import InnerSection from './InnerSection';
import PrimaryButton from './PrimaryButton';
import CourseFeatureCard from './CourseFeatureCard';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'swiper/css';
import { coursesData } from '../../data/courseData';
import TabButtons from './TabButtons';

const OurCourse = () => {
  const [selectedCategory, setSelectedCategory] = useState(coursesData[0].category);

  // Filter courses based on selected category
  const selectedCourses = coursesData.find((c) => c.category === selectedCategory).courses;

  const swiperRef = useRef(null);
  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(false);

  const handleSlideChange = (swiper) => {
    // Show next/prev buttons only if scrolling is actually possible
    const atStart = swiper.isBeginning;
    const atEnd = swiper.isEnd;
    const canScroll = !(atStart && atEnd); // if both true, no scroll needed

    setCanSlidePrev(canScroll && !atStart);
    setCanSlideNext(canScroll && !atEnd);
  };

  const handleSwiperInit = (swiper) => {
    swiperRef.current = swiper;
    handleSlideChange(swiper); // initialize button state immediately
  };

  return (
    <OuterSection>
      <InnerSection className="space-y-lg">
        {/* Section title and description */}
        <h2 className="heading-4xl uppercase">Our Course</h2>
        <p className="w-full md:w-3/4 lg:w-1/2 font-heading font-normal text-base text-black/70 leading-lg text-justify">
          UK-certified training in English, IT, and Professional Skills — designed to sharpen your
          talent and accelerate career growth
        </p>

        <TabButtons
          data={coursesData}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />

        {/* Course cards grid */}
        <div className="relative w-full">
          <Swiper
            key={selectedCategory}
            onSwiper={handleSwiperInit}
            onSlideChange={handleSlideChange}
            loop={false}
            autoplay={false}
            allowTouchMove={false}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="!items-stretch"
            style={{ padding: '10px' }}
          >
            {selectedCourses.map((course) => (
              <SwiperSlide key={course.id} className="flex items-stretch !h-auto">
                <div className="flex-1 h-full">
                  <CourseFeatureCard course={course} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Prev Button */}
          {canSlidePrev && (
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-secondary/80 cursor-pointer text-white p-3 rounded-full shadow hover:bg-secondary transition"
            >
              <FaArrowLeft />
            </button>
          )}

          {/* Next Button */}
          {canSlideNext && (
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-secondary/80 cursor-pointer text-white p-3 rounded-full shadow hover:bg-secondary transition"
            >
              <FaArrowRight />
            </button>
          )}
        </div>

        {/* View all courses button */}
        <div className="flex justify-center items-center">
          <PrimaryButton className="rounded-lg" text={'View All Courses'} href={`/courses`} />
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default OurCourse;
```

## File: src/components/common/OuterSection.jsx

```javascript
const OuterSection = ({ children, className = '', style }) => {
  return (
    <section
      className={`w-full flex items-center justify-center z-40 overflow-hidden ${className}`}
      style={style}
    >
      {children}
    </section>
  );
};

export default OuterSection;
```

## File: src/components/common/PaginationSection.jsx

```javascript
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import OuterSection from './OuterSection';
import InnerSection from './InnerSection';

const PaginationSection = ({ pagination, pageSize, error }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // 🧠 Get current page from query (default = 1)
  useEffect(() => {
    const pageFromQuery = Number(searchParams.get('page')) || 1;
    setCurrentPage(pageFromQuery);
  }, [searchParams]);

  // page not found , move to page 1
  useEffect(() => {
    if (error?.message == 'Invalid page.') {
      setCurrentPage(1);

      // Update query param
      setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: 1 });
    }
  }, [error]);

  // 🧠 Calculate total pages from backend count
  useEffect(() => {
    if (pagination?.count) {
      setTotalPages(Math.ceil(pagination.count / pageSize));
    }
  }, [pagination]);

  // ⚡ Go to a specific page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);

      // Update query param
      setSearchParams({ ...Object.fromEntries(searchParams.entries()), page });
    }
  };

  // 🧮 Generate dynamic pagination numbers
  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <OuterSection>
      <InnerSection className="flex justify-center pt-0">
        <Pagination>
          <PaginationContent className="flex items-center gap-2">
            {/* Previous */}
            <PaginationItem>
              <Button
                variant="default"
                size="icon"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="mr-1 w-8 h-8 rounded-full bg-black text-white hover:bg-black/90 disabled:opacity-50"
              >
                <FaArrowLeft size={14} />
              </Button>
            </PaginationItem>

            {/* Pages */}
            {getPages().map((page, index) =>
              page === '...' ? (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => goToPage(page)}
                    className={`h-7 w-7 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                      page === currentPage ? 'bg-black text-white hover:text-black' : ''
                    }`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            {/* Next */}
            <PaginationItem>
              <Button
                variant="default"
                size="icon"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-1 w-8 h-8 rounded-full bg-black text-white hover:bg-black/90 disabled:opacity-50"
              >
                <FaArrowRight size={14} />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </InnerSection>
    </OuterSection>
  );
};

export default PaginationSection;
```

## File: src/components/common/PartnerCarousel.jsx

```javascript
/**
 * PartnerCarousel Component (Swiper Version)
 * ------------------------------------------
 * - Displays a scrolling carousel of partner logos
 * - Uses Swiper.js for responsiveness and autoplay
 * - Partners are defined in a local array (can later be fetched dynamically)
 */

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBrands } from '@/redux/brands/brandsAction';

const PartnerCarousel = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brands);

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  return (
    <div className="mx-auto w-full">
      <Swiper
        slidesPerGroup={1}
        loop={true}
        speed={700}
        modules={[Autoplay]}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        allowTouchMove={false}
        className="w-full"
        breakpoints={{
          0: { slidesPerView: 2 },
          464: { slidesPerView: 3 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 7 },
        }}
      >
        {[...brands, ...brands, ...brands].map((partner, i) => (
          <SwiperSlide key={i} className="flex justify-center">
            <div className="p-6 flex justify-center items-center">
              <img
                src={partner.logo}
                alt={`${partner.id} logo`}
                className="h-12 mx-auto object-contain"
                loading="lazy" // ✅ improves performance
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PartnerCarousel;
```

## File: src/components/common/PartnerSlider.jsx

```javascript
/**
 * PartnerSlider Component
 * ------------------------
 * - Displays a title and the partner carousel
 * - Uses OuterSection + InnerSection for consistent layout spacing
 * - Serves as a reusable section to showcase partner organizations/brands
 */

import OuterSection from './OuterSection';
import InnerSection from './InnerSection';
import PartnerCarousel from './PartnerCarousel';

const PartnerSlider = () => {
  return (
    <OuterSection>
      <InnerSection>
        {/* Section heading */}
        <h2
          className="text-3xl text-center font-heading font-bold text-black mb-6"
          aria-label="Partner Brands Section"
        >
          We’re Proud to Partner With
        </h2>

        {/* Carousel of partner logos */}
        <PartnerCarousel />
      </InnerSection>
    </OuterSection>
  );
};

export default PartnerSlider;
```

## File: src/components/common/PathUrl.jsx

```javascript
import React from 'react';
import { Link } from 'react-router-dom';

const PathUrl = ({ links }) => {
  return (
    <div className="flex gap-sm text-white/70 text-sm overflow-x-hidden whitespace-nowrap scrollbar-hide">
      {links.map((item, index) => (
        <React.Fragment key={index}>
          {index !== 0 && <span>/</span>}
          <Link
            className="hover:underline truncate min-w-[fit-content]"
            to={item.url}
            title={item.text}
          >
            {item.text}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default PathUrl;
```

## File: src/components/common/PrimaryButton.jsx

```javascript
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // shadcn/ui Button
import { FaSpinner } from 'react-icons/fa';

const PrimaryButton = ({
  text,
  href,
  type = 'button',
  className = '',
  onClick,
  disabled = false,
  loading = false,
  from,
  ...props
}) => {
  const content = loading ? (
    <span className="flex items-center gap-2">
      <FaSpinner className="animate-spin" /> Loading...
    </span>
  ) : (
    text
  );

  // Exact CSS from your old button
  const baseStyles = `min-w-[150px] bg-secondary p-lg font-bold text-base text-white cursor-pointer 
    transition-colors inline-flex items-center justify-center border-2 border-secondary
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${from === 'hero' ? 'hover:bg-transparent hover:border-white' : 'hover:bg-primary hover:border-primary'}
    ${className}`;

  // External vs internal links
  if (href) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return (
        <Button asChild className={baseStyles} disabled={disabled || loading} {...props}>
          <a href={href} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        </Button>
      );
    } else {
      return (
        <Button asChild className={baseStyles} disabled={disabled || loading} {...props}>
          <Link to={href}>{content}</Link>
        </Button>
      );
    }
  }

  // Default button
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseStyles}
      {...props}
    >
      {content}
    </Button>
  );
};

export default PrimaryButton;
```

## File: src/components/common/PrivacyHeading.jsx

```javascript
import React from 'react';

const PrivacyHeading = ({ children }) => {
  return <h2 className="font-heading mt-lg text-black underline text-3xl">{children}</h2>;
};

export default PrivacyHeading;
```

## File: src/components/common/RoundShape.jsx

```javascript
const RoundShape = ({ p, style, opacity }) => {
  return (
    <div
      style={style}
      className={`absolute ${p == 'right' ? 'right-[-300px]' : 'left-[-300px]'}  ${
        opacity
          ? 'bg-gradient-to-t from-secondary-light/40 to-secondary/40'
          : 'bg-gradient-to-t from-secondary-light to-secondary'
      } top-1/2 -translate-y-1/2 transform absolute h-full max-h-[500px] w-[500px] rounded-full -z-10 hidden lg:block`}
    ></div>
  );
};

export default RoundShape;
```

## File: src/components/common/SecondaryButton.jsx

```javascript
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // shadcn/ui Button
import { FaSpinner } from 'react-icons/fa';

const SecondaryButton = ({
  children,
  text,
  href,
  type = 'button',
  className = '',
  onClick,
  disabled = false,
  loading = false,
  from,
  ...props
}) => {
  const content = loading ? (
    <span className="flex items-center gap-2">
      <FaSpinner className="animate-spin" /> Loading...
    </span>
  ) : (
    children || text
  );

  // Exact previous Tailwind CSS
  const baseStyles = `min-w-[150px] rounded-lg p-lg font-bold text-base text-white cursor-pointer 
    transition-colors border-2 border-white inline-flex items-center justify-center bg-transparent
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${from === 'hero' ? 'hover:bg-secondary hover:border-secondary' : 'hover:bg-primary hover:border-primary'}
    ${className}`;

  // External vs internal links
  if (href) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return (
        <Button asChild className={baseStyles} disabled={disabled || loading} {...props}>
          <a href={href} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        </Button>
      );
    } else {
      return (
        <Button asChild className={baseStyles} disabled={disabled || loading} {...props}>
          <Link to={href}>{content}</Link>
        </Button>
      );
    }
  }

  // Default button
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseStyles}
      {...props}
    >
      {content}
    </Button>
  );
};

export default SecondaryButton;
```

## File: src/components/common/TabButtons.jsx

```javascript
import React from 'react';
import './css/tabButton.css';

const TabButtons = ({ data, selected, setSelected }) => {
  return (
    <div>
      {/* Desktop tabs */}
      <div className="hidden md:flex border-b-primary border-b-1 space-x-5 flex-wrap mb-xl">
        {data?.map((item, index) => (
          <button
            key={item.id + '-' + index}
            className={`tab-button cursor-pointer h-10 w-30 px-md flex items-center justify-center w-[fit-content] min-w-[180px] rounded relative top-0.5 text-black text-base ${
              selected === item.category
                ? 'bg-secondary/30 text-black font-bold text-base border-b-5 border-b-secondary'
                : 'border-b-5 border-b-transparent'
            } ${selected == null ? 'bg-secondary/30 text-black font-bold text-base' : ''}`}
            onClick={() => setSelected(item.category)}
          >
            {item.category}
          </button>
        ))}
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden mb-4">
        <select
          className="w-full border px-4 py-2 rounded"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {data?.map((item) => (
            <option key={item.id} value={item.category}>
              {item.category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TabButtons;
```

## File: src/components/common/TabContainSecton.jsx

```javascript
/**
 * OurValues Component
 * ------------------
 * - Displays the "Our Values" section of the About page
 * - Desktop: clickable buttons for each value category
 * - Mobile: dropdown select for smaller screens
 * - Shows associated content (image/video + description) via aboutOurValues
 */

import { useState } from 'react';
import OuterSection from './OuterSection';
import InnerSection from './InnerSection';
import ImageContent from './ImageContent';
import TabButtons from './TabButtons';
import RoundShape from './RoundShape';
import KnowUsComponent from './KnowUs';
import { aboutKnowUs } from '../../data/aboutPageData';

const TabContainSection = ({ tabContain }) => {
  const [activeData, setActiveData] = useState(tabContain[0]);

  return (
    <OuterSection className="relative">
      <RoundShape p="right" />
      <InnerSection>
        <TabButtons
          data={tabContain}
          selected={activeData.category}
          setSelected={(category) =>
            setActiveData(tabContain.find((item) => item.category === category))
          }
        />

        {/* Display selected value content */}
        <div className="w-full space-y-20">
          <ImageContent data={activeData} />
          <KnowUsComponent statsData={aboutKnowUs?.stats} content={aboutKnowUs?.content} />
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default TabContainSection;
```

## File: src/components/common/UpperFooterSection.jsx

```javascript
import OuterSection from './OuterSection';
import InnerSection from './InnerSection';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

const UpperFooterSection = ({
  backgroundImage,
  title,
  description,
  buttons,
  className = '',
  overlayOpacity = 60,
  height = '400px',
  layout = 'row',
}) => {
  return (
    <OuterSection
      className={`bg-cover bg-center relative ${className}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height,
      }}
      aria-label="Call to Action Section"
    >
      {/* Overlay for better text visibility */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
        aria-hidden="true"
      ></div>

      {/* Content container */}
      <InnerSection className="relative flex flex-col items-center gap-lg z-10 text-center">
        <h2 className="font-bold font-heading text-3xl text-white">{title}</h2>
        <p className="font-heading text-base text-white/70 max-w-[600px]">{description}</p>

        {/* CTA buttons */}
        <div
          className={`flex ${layout === 'row' ? 'flex-row gap-xl' : 'flex-col sm:flex-row gap-4 sm:gap-xl'} mt-lg`}
        >
          {buttons.map((button, index) => {
            const ButtonComponent = button.type === 'primary' ? PrimaryButton : SecondaryButton;

            return (
              <ButtonComponent
                key={index}
                onClick={button.onClick}
                text={button.text}
                className="rounded-lg"
                from="hero"
              />
            );
          })}
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default UpperFooterSection;
```

## File: src/components/common/VerticalScroll.jsx

```javascript
'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const VerticalScrollSection = ({ items }) => {
  if (!items?.length) {
    return;
  }

  const slides = [
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
  ];

  const [activeIndex, setActiveIndex] = useState(0); // center slide index

  const getSlideColor = (slideIndex) => {
    const viewportMiddle = activeIndex + 3; // middle of 7 slides
    const diff = Math.abs(slideIndex - viewportMiddle);

    if (diff === 0) return 'text-white'; // middle
    if (diff === 1) return 'text-white/60'; // one above/below
    return 'text-white/20'; // edges
  };

  return (
    <Swiper
      direction="vertical"
      slidesPerView={7}
      slidesPerGroup={1}
      loop={true}
      speed={700}
      modules={[Autoplay]}
      autoplay={{ delay: 1000, disableOnInteraction: false }}
      allowTouchMove={false}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      className="h-[420px]"
      style={{ marginLeft: 0 }}
    >
      {slides.map((item, i) => (
        <SwiperSlide key={i}>
          <h2 className={`heading-home-hero-scroll line-clamp-1 ${getSlideColor(i)}`}>
            {item?.text}
          </h2>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VerticalScrollSection;
```

## File: src/components/common/YtVideoPlay.jsx

```javascript
import { getYouTubeID } from '@/utils/getYouTubeID';

const YtVideoAutoPlay = ({ url, mute }) => {
  return (
    <iframe
      className="w-full h-full rounded-lg"
      src={`https://www.youtube.com/embed/${getYouTubeID(url)}?autoplay=1&mute=${mute ? 1 : 0}&playsinline=1`}
      title="YouTube video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default YtVideoAutoPlay;
```

## File: src/components/Root/about/CarrersSection.jsx

```javascript
/**
 * CarrersSection Component
 * ------------------------
 * - Highlights career opportunities at Prime Academy
 * - Displays an image/video along with additional description and an optional button
 * - Uses OuterSection + InnerSection for consistent layout spacing
 * - Includes a decorative RoundShape element
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import ImageContent from '../../common/ImageContent';
import RoundShape from '../../common/RoundShape';

// Content data for the careers section
const imageContent = {
  title: 'CAREERS AT Prime',
  image: 'https://www.balticapprenticeships.com/wp-content/uploads/2023/04/DSC07727-1.webp', // Image path
  video: '', // Optional video URL
  additional_info: `
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    Everything we do is built on a foundation of complete care — care for our apprentices, 
    our employers, and our team.
  `,
  buttonText: 'Search Course', // Optional button text
  url: '', // Optional button URL
};

const CarrersSection = () => {
  return (
    <OuterSection className="relative">
      {/* Decorative circular element */}
      <RoundShape />

      <InnerSection>
        {/* Main content block */}
        <ImageContent data={imageContent} />
      </InnerSection>
    </OuterSection>
  );
};

export default CarrersSection;
```

## File: src/components/Root/about/HeroSection.jsx

```javascript
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from '../../common/HeroSection';
import { useEffect, useState } from 'react';
import { fetcHeros } from '@/redux/hero/heroAction';

const AboutHero = () => {
  const [aboutHero, setAboutHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!heros?.length) {
      dispatch(fetcHeros());
    }
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.id == 2);
    setAboutHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      backgroundImage={aboutHero?.banner_image}
      className="relative"
      title={aboutHero?.title}
      description={aboutHero?.description}
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/about', text: 'About Us' },
      ]}
      buttons={[
        aboutHero?.button1_url && {
          text: aboutHero?.button1_text,
          url: aboutHero?.button1_url,
          type: 'primary',
        },
        aboutHero?.button2_url && {
          text: aboutHero?.button2_text,
          url: aboutHero?.button2_url,
          type: 'secondary',
        },
      ]}
    />
  );
};

export default AboutHero;
```

## File: src/components/Root/about/KnowUs.jsx

```javascript
/**
 * KnowUs Component
 * ----------------
 * - Displays key facts and figures about the academy
 * - Layout:
 *    1. Text content on the left (heading + description)
 *    2. Statistics grid on the right
 * - Includes a decorative RoundShape element for visual appeal
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import RoundShape from '../../common/RoundShape';
import KnowUsComponent from '../../common/KnowUs';
import { aboutKnowUs } from '../../../data/aboutPageData';

const KnowUs = () => {
  return (
    <OuterSection className="relative">
      {/* Decorative element positioned to the right */}

      <InnerSection className="flex flex-col md:flex-row gap-lg">
        <KnowUsComponent statsData={aboutKnowUs?.stats} content={aboutKnowUs?.content} />
      </InnerSection>
    </OuterSection>
  );
};

export default KnowUs;
```

## File: src/components/Root/about/LargestProvider.jsx

```javascript
/**
 * LargestProvider Component
 * ------------------------
 * - Highlights that the academy is the largest independent training provider in England
 * - Displays an image/video along with additional description and an optional button
 * - Uses OuterSection + InnerSection for layout consistency
 * - Includes a decorative RoundShape for visual appeal
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import ImageContent from '../../common/ImageContent';
import RoundShape from '../../common/RoundShape';
import { aboutlergestProvider } from '../../../data/aboutPageData';

const LargestProvider = () => {
  return (
    <OuterSection className="relative">
      {/* Decorative circular element */}
      <RoundShape />

      <InnerSection>
        {/* Main content block */}
        <ImageContent data={aboutlergestProvider} />
      </InnerSection>
    </OuterSection>
  );
};

export default LargestProvider;
```

## File: src/components/Root/about/OurValues.jsx

```javascript
/**
 * OurValues Component
 * ------------------
 * - Displays the "Our Values" section of the About page
 * - Desktop: clickable buttons for each value category
 * - Mobile: dropdown select for smaller screens
 * - Shows associated content (image/video + description) via aboutOurValues
 */

import { aboutOurValues } from '../../../data/aboutPageData';
import TabContainSection from '@/components/common/TabContainSecton';

const OurValues = () => {
  return (
    <>
      <TabContainSection tabContain={aboutOurValues} />
    </>
  );
};

export default OurValues;
```

## File: src/components/Root/about/WhoWeSection.jsx

```javascript
/**
 * WhoWeSection Component
 * ---------------------
 * - Represents the "Who We Are" section of the About page
 * - Displays video or image content along with additional info
 * - Uses OuterSection + InnerSection for consistent layout
 * - Includes a decorative RoundShape element
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import ImageContent from '../../common/ImageContent';
import RoundShape from '../../common/RoundShape';
import { aboutWhoWe } from '../../../data/aboutPageData';

const WhoWeSection = () => {
  return (
    <OuterSection className="relative">
      {/* Decorative circular element */}
      <RoundShape />

      <InnerSection>
        {/* Main content block (image/video + text) */}
        <ImageContent data={aboutWhoWe} />
      </InnerSection>
    </OuterSection>
  );
};

export default WhoWeSection;
```

## File: src/components/Root/blogPage/BlogBody.jsx

```javascript
/**
 * BlogBody Component
 * -----------------
 * - Displays the main content of a blog post
 * - Handles multi-paragraph content dynamically
 * - Supports an additional ImageContent section within the blog
 */

import { useSelector } from 'react-redux';
import ImageContent from '../../common/ImageContent';
import { blogImageContent } from '@/data/blogPageData';
import ReactMarkdown from 'react-markdown';
import BlogContentSkeleton from './BlogSkeleton';

const BlogBody = () => {
  const { blog, loadingBlog } = useSelector((state) => state.blog);
  return (
    <div className="flex-1 md:flex-3 flex flex-col gap-lg">
      {loadingBlog && <BlogContentSkeleton />}

      {/* Blog title */}
      <h2 className="text-3xl font-bold font-heading leading-xl">{blog?.title}</h2>

      {/* Blog content paragraphs */}
      <article className="space-y-md text-heading text-base leading-lg mb-lg">
        <ReactMarkdown>{blog?.content || ''}</ReactMarkdown>
      </article>

      {/* Optional featured image/content section */}
      <ImageContent data={blogImageContent} ip="left" />
    </div>
  );
};

export default BlogBody;
```

## File: src/components/Root/blogPage/BlogBodySection.jsx

```javascript
/**
 * BlogBodySection Component
 * -------------------------
 * - Layout component for a single blog post page
 * - Divides layout into main content (BlogBody) and social share (BlogShare)
 * - Uses OuterSection + InnerSection for consistent spacing and responsive layout
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import BlogBody from './BlogBody';
import BlogShare from './BlogShare';
import { blogData } from '../../../data/blogPageData';

const BlogBodySection = () => {
  return (
    <OuterSection>
      <InnerSection className="flex flex-col md:flex-row gap-lg">
        {/* Main blog content */}
        <BlogBody />

        {/* Social share sidebar */}
        <BlogShare cardData={blogData} />
      </InnerSection>
    </OuterSection>
  );
};

export default BlogBodySection;
```

## File: src/components/Root/blogPage/BlogShare.jsx

```javascript
/**
 * BlogShare Component
 * ------------------
 * - Displays social share buttons for the blog
 * - Shows author and publication date
 * - Designed for sidebar layout next to BlogBody
 */

import { dateConvertionBlogsPageBlogCard } from '@/utils/timeFormat';
import { FaShareAlt } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Icons = {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
};

const BlogShare = ({ cardData }) => {
  const { blog } = useSelector((state) => state.blog);

  // Make full URL
  const domain = typeof window !== 'undefined' ? window.location.origin : '';
  const fullUrl = `${domain}/${blog?.slug || ''}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedText = encodeURIComponent(blog?.title || '');
  return (
    <aside className="flex-1 bg-secondary-bg px-lg py-xl space-y-md self-start">
      {/* Share Section */}
      <div>
        <h2 className="font-bold text-black text-xl mb-2">Share This Article</h2>
        <div className="flex gap-3 items-center">
          <FaShareAlt aria-hidden="true" />
          {cardData.share.map((platform) => {
            const IconComponent = Icons[platform.icon];
            let shareUrl = platform.url + encodedUrl;
            if (platform.text) {
              shareUrl = platform.url + encodedUrl + '&text=' + encodedText;
            }
            return (
              <a
                key={platform.name}
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${platform.color} text-2xl hover:opacity-80 transition`}
              >
                <IconComponent />
              </a>
            );
          })}
        </div>
      </div>
      {/* Author Section */}
      <div>
        <h2 className="font-bold text-black text-xl mb-1">Written By</h2>
        <p className="text-heading text-base leading-lg">{blog?.author?.name || 'Authority'}</p>
      </div>
      {/* Date Section */}
      <div>
        <h2 className="font-bold text-black text-xl mb-1">Date</h2>
        <p className="text-heading text-base leading-lg">
          {dateConvertionBlogsPageBlogCard(blog?.created_at)}
        </p>
      </div>
    </aside>
  );
};

export default BlogShare;
```

## File: src/components/Root/blogPage/BlogSkeleton.jsx

```javascript
import { Skeleton } from '@/components/ui/skeleton';

const BlogContentSkeleton = () => {
  return (
    <>
      {/* Title Skeleton */}
      <Skeleton className="w-3/4 h-10 rounded" />

      {/* Paragraphs Skeleton */}
      <div className="space-y-4 mt-md">
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-5/6 h-4 rounded" />
        <br />
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-2/3 h-4 rounded" />
        <br />
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-full h-4 rounded" />
        <Skeleton className="w-5/6 h-4 rounded" />
      </div>
    </>
  );
};

export default BlogContentSkeleton;
```

## File: src/components/Root/blogPage/HeroSection.jsx

```javascript
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from '../../common/HeroSection';
import { useEffect, useState } from 'react';
import { fetcHeros } from '@/redux/hero/heroAction';

const SingleBlogHero = () => {
  const { blog } = useSelector((state) => state.blog);
  const [singleBlogHero, setSingleBlogHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!heros?.length) {
      dispatch(fetcHeros());
    }
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.id == 3);
    setSingleBlogHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      backgroundImage={singleBlogHero?.banner_image}
      title="The True Cost of Human Error in Cybersecurity"
      description="What's the true cost of human error in cybersecurity? And what does this human error really look like?"
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/blogs', text: 'Blogs & Resources' },
        { url: `/blogs/${blog?.slug}`, text: blog?.title },
      ]}
      buttons={[
        singleBlogHero?.button1_url && {
          text: singleBlogHero?.button1_text,
          url: singleBlogHero?.button1_url,
          type: 'primary',
        },
        singleBlogHero?.button2_url && {
          text: singleBlogHero?.button2_text,
          url: singleBlogHero?.button2_url,
          type: 'secondary',
        },
      ]}
    />
  );
};

export default SingleBlogHero;
```

## File: src/components/Root/blogs/BlogCard.jsx

```javascript
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { dateConvertionBlogsPageBlogCard } from '@/utils/timeFormat';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BlogCard = ({ item, index }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
    >
      <Card className="flex flex-col h-full overflow-hidden rounded-xl shadow-around-sm shadow-lg">
        {/* Top: Image */}
        <img src={item.featured_image} alt={item.title} className="w-full h-[180px] object-cover" />

        {/* Content */}
        <CardContent className="flex flex-col flex-1 gap-sm">
          <p className="font-heading text-base text-black/80">{item.category?.name}</p>

          <h2 className="text-xl font-heading font-bold line-clamp-2" title={item.title}>
            {item.title}
          </h2>

          <p className="font-heading text-base text-black/80 mb-xl line-clamp-3">
            {dateConvertionBlogsPageBlogCard(item.created_at)}
          </p>

          {/* Read More at bottom */}
          <Link
            to={item.slug}
            className="font-bold w-[fit-content] text-base text-black flex gap-sm items-center hover:underline mt-auto"
          >
            Read More <FaArrowRight />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
```

## File: src/components/Root/blogs/BlogCards.jsx

```javascript
/**
 * BlogCards Component
 * -------------------
 * - Displays a responsive grid of blog cards
 * - Uses BlogCard component for individual card rendering
 * - Fully responsive: 1 column on mobile, 2 on medium screens, 3 on large
 * - Card data is currently static but can be replaced with API data
 */

import { useDispatch, useSelector } from 'react-redux';
import BlogCard from './BlogCard';
import { fetchBlogs } from '@/redux/blogs/blogAction';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogCardSkeleton from './BlogCardSkeleton';

const BlogCards = () => {
  const { blogs, pageSize, loadingBlogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || null;
  const search = searchParams.get('search') || '';
  const order = searchParams.get('order') || '';
  const previousBlogs = useRef([]);

  useEffect(() => {
    if (blogs.length > 0) previousBlogs.current = blogs; // ✅ Store last blogs
  }, [blogs]);

  // ✅ Proper debounce effect for search
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(
        fetchBlogs({
          category,
          page: currentPage,
          page_size: pageSize,
          search,
          order,
        })
      );
    }, 600); // debounce delay 600ms

    return () => {
      clearTimeout(handler); // cleanup old timer before new one
    };
  }, [search, category, currentPage, dispatch, order]);

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
      {/* Show skeletons only if loading and no previous blogs */}
      {loadingBlogs && previousBlogs.current.length === 0
        ? Array.from({ length: 3 }).map((_, index) => (
            <BlogCardSkeleton index={index} key={index} />
          ))
        : (loadingBlogs ? previousBlogs.current : blogs).map((item, index) => (
            <BlogCard key={item.id || index} item={item} index={index} />
          ))}

      {/* Show "No Blogs Found" only if NOT loading AND no blogs AND we have fetched at least once */}
      {!loadingBlogs && !blogs.length && previousBlogs.current.length === 0 && (
        <h3 className="heading-3xl col-span-3 text-center">No Blogs Found</h3>
      )}
    </section>
  );
};

export default BlogCards;
```

## File: src/components/Root/blogs/BlogCardSkeleton.jsx

```javascript
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

const BlogCardSkeleton = ({ index = 0 }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
    >
      <Card className="flex flex-col h-full overflow-hidden rounded-xl shadow-around-sm animate-pulse">
        {/* Top: Image Placeholder */}
        <Skeleton className="w-full h-[180px]" />

        {/* Content */}
        <CardContent className="flex flex-col flex-1 gap-sm">
          {/* Category */}
          <Skeleton className="w-24 h-4 mt-3" />

          {/* Title */}
          <Skeleton className="w-full h-4 mt-2" />
          <Skeleton className="w-3/4 h-4 mt-1" />

          {/* Date */}
          <Skeleton className="w-32 h-4 mt-sm mb-xl" />

          {/* Read More */}
          <div className="mt-auto flex gap-sm items-center">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-4 h-4 rounded-full" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogCardSkeleton;
```

## File: src/components/Root/blogs/BlogCardsSection.jsx

```javascript
/**
 * BlogCardsSection Component
 * --------------------------
 * - Wraps the blog listing section
 * - Displays a sidebar filter (LeftFilter) and the blog cards (BlogCards)
 * - Fully responsive: flex-column on mobile, flex-row on desktop
 * - Uses OuterSection + InnerSection for consistent layout spacing
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import LeftFilter from './LeftFilter';
import BlogCards from './BlogCards';
import TopFilter from './TopFilter';
import { useSearchParams } from 'react-router-dom';

const BlogCardsSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const order = searchParams.get('order') || null;
  return (
    <OuterSection>
      <InnerSection>
        {/* Top Filter form */}
        <TopFilter />

        <div className="hidden lg:flex w-full flex-col">
          <div className="self-end space-x-sm">
            <label htmlFor="order">Sort By: </label>
            <select
              onChange={(e) => {
                const selectedOrder = e.target.value;
                const params = Object.fromEntries(searchParams.entries());
                setSearchParams({ ...params, order: selectedOrder });
              }}
              value={order || ''}
              className="px-lg py-sm shadow-xl border border-primary/20 rounded-lg outline-none"
              name="order"
              id="order"
            >
              <option value="">New First</option>
              <option value="published_at">Old First</option>
              <option value="-title">Title Desc</option>
              <option value="title">Title Asc</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-lg mt-lg">
          {/* Sidebar filter section */}
          <LeftFilter />

          {/* Blog cards listing */}
          <BlogCards />
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default BlogCardsSection;
```

## File: src/components/Root/blogs/BlogCategoriesSkeleton.jsx

```javascript
import { Skeleton } from '@/components/ui/skeleton';

const CategoryListSkeleton = ({ count = 5 }) => {
  return (
    <ul className="space-y-xs mt-md">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <Skeleton className="w-full h-8 rounded px-2 py-1" />
        </li>
      ))}
    </ul>
  );
};

export default CategoryListSkeleton;
```

## File: src/components/Root/blogs/HeroSection.jsx

```javascript
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from '../../common/HeroSection';
import { useEffect, useState } from 'react';
import { fetcHeros } from '@/redux/hero/heroAction';

const BlogHero = () => {
  const [blogsHero, setBlogsHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!heros?.length) {
      dispatch(fetcHeros());
    }
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.id == 4);
    setBlogsHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      backgroundImage={blogsHero?.banner_image}
      title={blogsHero?.title}
      description={blogsHero?.description}
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/blogs', text: 'Blogs & Resources' },
      ]}
      buttons={[
        blogsHero?.button1_url && {
          text: blogsHero?.button1_text,
          url: blogsHero?.button1_url,
          type: 'primary',
        },
        blogsHero?.button2_url && {
          text: blogsHero?.button2_text,
          url: blogsHero?.button2_url,
          type: 'secondary',
        },
      ]}
    />
  );
};

export default BlogHero;
```

## File: src/components/Root/blogs/LeftFilter.jsx

```javascript
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import CategoryListSkeleton from './BlogCategoriesSkeleton';
import PrimaryButton from '@/components/common/PrimaryButton';

const LeftFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, loadingBlogCategory } = useSelector((state) => state.blog);
  const category = searchParams.get('category') || null;

  return (
    <aside className="hidden lg:flex flex-col w-80 bg-secondary-bg px-lg py-sm rounded-md">
      {/* Title */}
      <p className="text-base font-semibold mb-sm">Filter Blogs</p>

      {/* Search Input */}
      <input
        type="text"
        className="border border-black/10 shadow bg-white w-full px-md py-sm rounded-md focus:outline-none focus:shadow-xl"
        placeholder="Search Blogs"
        value={searchParams.get('search') || ''}
        onChange={(e) =>
          setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            search: e.target.value,
            page: 1, // optional: reset page when searching
          })
        }
      />

      {loadingBlogCategory && <CategoryListSkeleton count={5} />}

      {/* Filter List */}
      <ul className="space-y-sm mt-md">
        {categories.map((item, index) => (
          <li key={index}>
            <button
              onClick={() =>
                setSearchParams({
                  ...Object.fromEntries(searchParams.entries()),
                  category: item.slug,
                })
              }
              className={`cursor-pointer text-left w-full px-2 py-1 rounded focus:outline-none ${
                String(category) === String(item.slug)
                  ? 'text-white bg-primary-light font-semibold'
                  : 'bg-black/5 hover:bg-black/15'
              }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
      <PrimaryButton
        text={`Reset Filter`}
        href={`/blogs`}
        className="mt-md w-[fit-content] self-end rounded-full hover:bg-red-500 border-none"
      />
    </aside>
  );
};

export default LeftFilter;
```

## File: src/components/Root/blogs/TopFilter.jsx

```javascript
import PrimaryButton from '@/components/common/PrimaryButton';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const TopFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useSelector((state) => state.blog);
  const category = searchParams.get('category') || null;
  const order = searchParams.get('order') || null;

  return (
    <div className="lg:hidden p-lg rounded-md shadow-lg flex flex-col gap-md mb-xl">
      <p className="text-base font-semibold">Blogs Filter</p>

      {/* Search Input & Order */}
      <div className="mb-sm w-full flex flex-col sm:flex-row gap-lg items-stretch">
        <div className="relative w-full sm:flex-1">
          <label
            htmlFor="search"
            className="absolute left-4 -top-2 px-1 bg-white text-black text-sm"
          >
            Search
          </label>
          <input
            id="search"
            type="text"
            className="w-full border border-black/10 shadow bg-white px-md py-sm rounded-md focus:outline-none focus:shadow-xl"
            placeholder="Search Blogs"
            value={searchParams.get('search') || ''}
            onChange={(e) =>
              setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                search: e.target.value,
                page: 1,
              })
            }
          />
        </div>

        <div className="relative sm:w-[150px] w-full">
          <label
            htmlFor="order"
            className="absolute left-4 -top-2 px-1 bg-white text-black text-sm"
          >
            Sort Blogs
          </label>
          <select
            id="order"
            onChange={(e) => {
              const selectedOrder = e.target.value;
              const params = Object.fromEntries(searchParams.entries());
              setSearchParams({ ...params, order: selectedOrder });
            }}
            value={order || ''}
            className="w-full px-lg py-sm shadow-sm border border-primary/20 rounded-lg outline-none"
          >
            <option value="">New First</option>
            <option value="published_at">Old First</option>
            <option value="-title">Title Desc</option>
            <option value="title">Title Asc</option>
          </select>
        </div>
      </div>

      {/* Category Filter & Reset Button */}
      <div className="mb-sm w-full flex flex-col sm:flex-row gap-lg items-stretch">
        <div className="relative w-full sm:flex-1">
          <label
            htmlFor="category"
            className="absolute left-4 -top-2 px-1 bg-white text-black text-sm"
          >
            Select Category
          </label>
          <select
            id="category"
            value={category || ''}
            onChange={(e) => {
              const selectedCategory = e.target.value;
              const params = Object.fromEntries(searchParams.entries());
              setSearchParams({ ...params, category: selectedCategory, page: 1 });
            }}
            className="w-full px-lg py-sm rounded-md border border-black/10 bg-white text-black hover:border-primary focus:outline-none focus:shadow-xl transition-colors shadow"
          >
            <option value="">All Categories</option>
            {categories.map((item) => (
              <option key={item.id} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <PrimaryButton
          text="Reset Filter"
          href="/blogs"
          className="sm:w-[150px] w-full hover:bg-[red] border-none"
        />
      </div>
    </div>
  );
};

export default TopFilter;
```

## File: src/components/Root/blogs/UpperFooterSection.jsx

```javascript
import UpperFooterSection from '../../common/UpperFooterSection';
import bg from '/assets/blog-bottom-banner.jpg';

const UpperFooterBlogs = () => {
  return (
    <UpperFooterSection
      backgroundImage={bg}
      title="NOT SURE WHAT YOUR NEXT STEPS ARE?"
      description="There is never just one way to reach a destination. We offer an alternative career path and a different route to developing skills."
      buttons={[
        {
          text: 'Search Course',
          type: 'primary',
        },
        {
          text: 'Talk To Us Today',
          type: 'secondary',
        },
      ]}
      layout="column"
      className="bg-cover bg-center h-[400px] relative"
    />
  );
};

export default UpperFooterBlogs;
```

## File: src/components/Root/contact/FormSection.jsx

```javascript
/**
 * FormSection Component
 * ---------------------
 * - Renders the contact form section for the website.
 * - Includes company contact info and a form to submit user inquiries.
 * - Fully responsive for mobile and desktop.
 * - Accessibility-friendly with proper labels, types, and required fields.
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import { BsTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../common/PrimaryButton';

const FormSection = () => {
  return (
    <OuterSection>
      <InnerSection className="flex gap-xl lg:gap-lg flex-col lg:flex-row">
        {/* Contact Information Section */}
        <div className="flex-1 flex gap-lg flex-col">
          <h2 className="text-3xl font-bold font-heading leading-xl">Get in touch</h2>
          <p className="text-heading text-base leading-lg max-w-[320px]">
            Complete the form and a member of our team will be in touch within 48 hours.
          </p>

          {/* Phone Contact */}
          <div className="flex gap-md items-center">
            <BsTelephoneFill />
            <Link to={`tel:+8801325731050`} className="hover:underline">
              01325 731 050
            </Link>
          </div>

          {/* Email Contact */}
          <div className="flex gap-md items-center">
            <MdEmail />
            <Link to={`mailto:example@gmail.com`} className="hover:underline">
              example@gmail.com
            </Link>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="flex-2">
          <form className="w-full space-y-md">
            {/* First Name & Last Name */}
            <div className="flex gap-md w-full flex-col sm:flex-row">
              <div className="flex-1">
                <label htmlFor="fname" className="font-heading font-bold text-base">
                  First Name*
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lname" className="font-heading font-bold text-base">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="flex gap-md w-full flex-col sm:flex-row">
              <div className="flex-1">
                <label htmlFor="email" className="font-heading font-bold text-base">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="phone" className="font-heading font-bold text-base">
                  Phone*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex gap-md w-full flex-col">
              <label htmlFor="message" className="font-heading font-bold text-base">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-required="true"
                className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10"
                placeholder="Enter your message"
              ></textarea>
            </div>

            {/* Privacy Policy Agreement */}
            <div className="flex gap-md w-full items-center">
              <input
                type="checkbox"
                id="check"
                name="check"
                required
                aria-required="true"
                className="text-secondary rounded border-2 border-black/10 w-5 h-5"
              />
              <label htmlFor="check" className="font-heading font-bold text-base">
                I agree to the Privacy Policy.*
              </label>
            </div>

            {/* Submit Button */}
            <PrimaryButton type="submit" text={`Submit`} className="rounded-lg" />
          </form>
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default FormSection;
```

## File: src/components/Root/contact/HeroSection.jsx

```javascript
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from '../../common/HeroSection';
import { useEffect, useState } from 'react';
import { fetcHeros } from '@/redux/hero/heroAction';

const ContactHero = () => {
  const [contactHero, setContactHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!heros?.length) {
      dispatch(fetcHeros());
    }
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.id == 5);
    setContactHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      backgroundImage={contactHero?.banner_image}
      title={contactHero?.title}
      description={contactHero?.description}
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/contact', text: 'Contact Us' },
      ]}
      buttons={[
        contactHero?.button1_url && {
          text: contactHero?.button1_text,
          url: contactHero?.button1_url,
          type: 'primary',
        },
        contactHero?.button2_url && {
          text: contactHero?.button2_text,
          url: contactHero?.button2_url,
          type: 'secondary',
        },
      ]}
    />
  );
};

export default ContactHero;
```

## File: src/components/Root/courses/CourseCard.jsx

```javascript
import { Card, CardContent } from '@/components/ui/card';
import { dateConvertionBlogsPageBlogCard } from '@/utils/timeFormat';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CourseCard = ({ item, index }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: 0 * 0.05, ease: 'easeOut' }}
    >
      <Card className="flex flex-col h-full overflow-hidden rounded-xl shadow-around-sm  shadow-lg">
        {/* Top: Image */}
        <img src={item.featured_image} alt={item.title} className="w-full h-[180px] object-cover" />

        {/* Content */}
        <CardContent className="flex flex-col flex-1 gap-sm">
          <p className="font-heading text-base text-black/80">{item.category?.name}</p>

          <h2 className="text-xl font-heading font-bold line-clamp-2" title={item.title}>
            {item.title}
          </h2>

          <p className="font-heading text-base text-black/80 mb-xl line-clamp-3">
            {dateConvertionBlogsPageBlogCard(item.created_at)}
          </p>

          {/* Read More at bottom */}
          <Link
            to={item.slug}
            className="font-bold w-[fit-content] text-base text-black flex gap-sm items-center hover:underline mt-auto"
          >
            Read More <FaArrowRight />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
```

## File: src/components/Root/courses/CourseCards.jsx

```javascript
/**
 * CourseCards Component
 * -------------------
 * - Displays a responsive grid of course cards
 * - Uses CourseCard component for individual card rendering
 * - Fully responsive: 1 column on mobile, 2 on medium screens, 3 on large
 * - Card data is currently static but can be replaced with API data
 */

import { useDispatch, useSelector } from 'react-redux';
import CourseCard from './CourseCard';
import { fetchCourses } from '@/redux/courses/courseAction';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import CourseCardSkeleton from './CourseCardSkeleton';

const CourseCards = () => {
  const { courses, pageSize, loadingCourses } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || null;
  const search = searchParams.get('search') || '';

  const previousCourses = useRef([]);

  useEffect(() => {
    if (courses.length > 0) previousCourses.current = courses; // ✅ Store last course
  }, [courses]);
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(
        fetchCourses({
          category: category,
          page: currentPage,
          page_size: pageSize,
          search,
        })
      );
    }, 600); // debounce delay 600ms

    return () => {
      clearTimeout(handler); // cleanup old timer before new one
    };
  }, [dispatch, currentPage, category, search]);

  return (
    <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-lg">
      {loadingCourses && previousCourses.current.length === 0
        ? Array.from({ length: 3 }).map((_, index) => (
            <CourseCardSkeleton key={index} index={index} />
          ))
        : (loadingCourses ? previousCourses.current : courses).map((item, index) => (
            <CourseCard key={index} index={index} item={item} />
          ))}

      {/* Show "No Course Found" only if NOT loading AND no courses AND we have fetched at least once */}
      {!loadingCourses && !courses.length && previousCourses.current.length === 0 && (
        <h3 className="heading-3xl col-span-3 text-center">No Course Found</h3>
      )}
    </section>
  );
};

export default CourseCards;
```

## File: src/components/Root/courses/CourseCardSkeleton.jsx

```javascript
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

const CourseCardSkeleton = ({ index }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, delay: 0 * 0.05, ease: 'easeOut' }}
    >
      <Card className="flex flex-col h-full overflow-hidden rounded-xl shadow-around-sm animate-pulse">
        {/* Top: Image Placeholder */}
        <Skeleton className="w-full h-[180px]" />

        {/* Content */}
        <CardContent className="flex flex-col flex-1 gap-sm">
          {/* Category */}
          <Skeleton className="w-24 h-4 mt-3" />

          {/* Title */}
          <Skeleton className="w-full h-6 mt-2" />
          <Skeleton className="w-3/4 h-6 mt-1" />

          {/* Date */}
          <Skeleton className="w-32 h-4 mt-sm mb-xl" />

          {/* Read More */}
          <div className="mt-auto flex gap-sm items-center">
            <Skeleton className="w-24 h-5" />
            <Skeleton className="w-4 h-4 rounded-full" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CourseCardSkeleton;
```

## File: src/components/Root/courses/CourseCardsSection.jsx

```javascript
/**
 * CourseCardsSection Component
 * --------------------------
 * - Wraps the course listing section
 * - Displays a sidebar filter (LeftFilter) and the course cards (CourseCards)
 * - Fully responsive: flex-column on mobile, flex-row on desktop
 * - Uses OuterSection + InnerSection for consistent layout spacing
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import CourseCards from './CourseCards';
import TopFilter from './TopFilter';

const CourseCardsSection = () => {
  return (
    <OuterSection>
      <InnerSection>
        {/* Top Filter form */}
        <TopFilter />

        <div className="flex flex-col md:flex-row gap-lg mt-lg">
          {/* Course cards listing */}
          <CourseCards />
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default CourseCardsSection;
```

## File: src/components/Root/courses/HeroSection.jsx

```javascript
import { useEffect, useState } from 'react';
import HeroSection from '../../common/HeroSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetcHeros } from '@/redux/hero/heroAction';

const CourseHero = () => {
  const [courseHero, setCourseHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!heros?.length) {
      dispatch(fetcHeros());
    }
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.id == 6);
    setCourseHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      backgroundImage={courseHero?.banner_image}
      title={courseHero?.title}
      description={courseHero?.description}
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/courses', text: 'Courses' },
      ]}
      buttons={[
        courseHero?.button1_url && {
          text: courseHero?.button1_text,
          url: courseHero?.button1_url,
          type: 'primary',
        },
        courseHero?.button2_url && {
          text: courseHero?.button2_text,
          url: courseHero?.button2_url,
          type: 'secondary',
        },
      ]}
    />
  );
};

export default CourseHero;
```

## File: src/components/Root/courses/TopFilter.jsx

```javascript
import PrimaryButton from '@/components/common/PrimaryButton';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const TopFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useSelector((state) => state.course);
  const category = searchParams.get('category') || '';

  return (
    <div className="p-lg rounded-md shadow-lg flex flex-col gap-md mb-xl bg-white">
      <p className="text-base font-semibold">Courses Filter</p>

      {/* Responsive Layout */}
      <div className="flex flex-col lg:flex-row gap-md lg:gap-lg items-stretch lg:items-end">
        {/* 🔹 Search Input */}

        <input
          type="text"
          className="flex-1 px-md py-sm rounded-md border border-black/10 bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition"
          placeholder="Search Course"
          value={searchParams.get('search') || ''}
          onChange={(e) =>
            setSearchParams({
              ...Object.fromEntries(searchParams.entries()),
              search: e.target.value,
              page: 1,
            })
          }
        />

        {/* 🔹 Category Dropdown */}
        <div className="flex-1">
          <select
            value={category}
            onChange={(e) => {
              const selectedCategory = e.target.value;
              const params = Object.fromEntries(searchParams.entries());
              setSearchParams({ ...params, category: selectedCategory, page: 1 });
            }}
            className="w-full px-md py-sm rounded-md border border-black/10 bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition"
          >
            <option value="">All Categories</option>
            {categories.map((item) => (
              <option key={item.id} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* 🔹 Reset Button */}
        <div className="w-full lg:w-auto">
          <PrimaryButton
            text="Reset Filter"
            href="/courses"
            className="w-full lg:w-auto hover:bg-red-500 text-white border-none transition"
          />
        </div>
      </div>
    </div>
  );
};

export default TopFilter;
```

## File: src/components/Root/courses/UpperFooterSection.jsx

```javascript
import UpperFooterSection from '../../common/UpperFooterSection';
import bg from '/assets/blog-bottom-banner.jpg';

const UpperFooterCourses = () => {
  return (
    <UpperFooterSection
      backgroundImage={bg}
      title="NOT SURE WHAT YOUR NEXT STEPS ARE?"
      description="There is never just one way to reach a destination. We offer an alternative career path and a different route to developing skills."
      buttons={[
        {
          text: 'Search Course',
          type: 'primary',
        },
        {
          text: 'Talk To Us Today',
          type: 'secondary',
        },
      ]}
      layout="column"
      className="bg-cover bg-center h-[400px] relative"
    />
  );
};

export default UpperFooterCourses;
```

## File: src/components/Root/faqs/FaqsSections.jsx

```javascript
/**
 * FaqsSections Component
 * ----------------------
 * - Displays FAQs grouped by categories (Apprentice, Employer, Levy, etc.).
 * - Includes an accordion-style toggle for each question.
 * - Integrates ScrollIntoSectionButtons for quick navigation to categories.
 * - Fully responsive and accessible.
 */

import { useState } from 'react';
import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import ScrollIntoSectionButtons from './ScrollIntoSectionButtons';
import { faqsData } from '../../../data/faqsPageData';

const FaqsSections = () => {
  // Track currently opened FAQ by unique ID `${categoryIndex}-${qnaIndex}`
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (categoryIndex, qnaIndex) => {
    const id = `${categoryIndex}-${qnaIndex}`;
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <OuterSection>
      <InnerSection>
        {/* Quick navigation buttons for each FAQ category */}
        <ScrollIntoSectionButtons headings={faqsData} />

        {/* FAQ Categories */}
        {faqsData.map((category, categoryIndex) => (
          <div key={category.category} id={category.category} className="w-full my-xl pt-xl">
            <h2 className="uppercase font-heading font-bold text-3xl mb-sm">{category.category}</h2>

            {/* FAQ Questions */}
            {category.qna.map((qna, qnaIndex) => {
              const id = `${categoryIndex}-${qnaIndex}`;
              const isOpen = activeFaq === id;

              return (
                <div
                  key={qna.question}
                  className="flex w-full flex-col border-b border-black/50 py-md"
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleFaq(categoryIndex, qnaIndex)}
                    className="flex justify-between items-center cursor-pointer font-bold font-heading text-left w-full"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${id}`}
                  >
                    <span>{qna.question}</span>
                    <span className="text-xl font-bold">{isOpen ? '−' : '+'}</span>
                  </button>

                  {/* Answer with smooth transition */}
                  <div
                    id={`faq-${id}`}
                    className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      {qna.answer.split('\n').map(
                        (answer, index) =>
                          answer.trim().length > 0 && (
                            <p key={index} className="text-heading text-base leading-lg mt-2">
                              {answer}
                            </p>
                          )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </InnerSection>
    </OuterSection>
  );
};

export default FaqsSections;
```

## File: src/components/Root/faqs/HeroSection.jsx

```javascript
import { useEffect, useState } from 'react';
import HeroSection from '../../common/HeroSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetcHeros } from '@/redux/hero/heroAction';

const FAQsHero = () => {
  const [faqsHero, setFaqsHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!heros?.length) {
      dispatch(fetcHeros());
    }
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.id == 7);
    setFaqsHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      backgroundImage={faqsHero?.banner_image}
      title={faqsHero?.title}
      description={faqsHero?.description}
      updatedDate="16th March 2023"
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/faqs', text: 'FAQs' },
      ]}
      buttons={[
        faqsHero?.button1_url && {
          text: faqsHero?.button1_text,
          url: faqsHero?.button1_url,
          type: 'primary',
        },
        faqsHero?.button2_url && {
          text: faqsHero?.button2_text,
          url: faqsHero?.button2_url,
          type: 'secondary',
        },
      ]}
    />
  );
};

export default FAQsHero;
```

## File: src/components/Root/faqs/ScrollIntoSectionButtons.jsx

```javascript
/**
 * ScrollIntoSectionButtons Component
 * -----------------------------------
 * - Renders a set of buttons to quickly navigate to different FAQ categories.
 * - Smoothly scrolls to the target section with a configurable offset.
 * - Fully responsive and accessible.
 */

import TabButtons from '@/components/common/TabButtons';

const ScrollIntoSectionButtons = ({ headings }) => {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70; // Keeps 70px space at the top for fixed headers
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <TabButtons
      data={headings}
      selected={null} // not needed here
      setSelected={(category) => handleScroll(category)}
    />
  );
};

export default ScrollIntoSectionButtons;
```

## File: src/components/Root/faqs/UpperFooterSection.jsx

```javascript
import UpperFooterSection from '../../common/UpperFooterSection';
import bg from '/assets/blog-bottom-banner.jpg';

const UpperFooterFaq = () => {
  return (
    <UpperFooterSection
      backgroundImage={bg}
      title="NOT SURE WHAT YOUR NEXT STEPS ARE?"
      description="There is never just one way to reach a destination. We offer an alternative career path and a different route to developing skills."
      buttons={[
        {
          text: 'Explore This Site',
          type: 'primary',
        },
        {
          text: 'Talk To Us Today',
          type: 'secondary',
        },
      ]}
      layout="row"
    />
  );
};

export default UpperFooterFaq;
```

## File: src/components/Root/home/AboutPrimeAcademy.jsx

```javascript
import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import ImageContent from '../../common/ImageContent';
import RoundShape from '../../common/RoundShape';
import { homeAboutData } from '../../../data/homePageData';

const AboutPrimeAcademy = () => {
  return (
    <OuterSection className="relative">
      <RoundShape p={`right`} opacity={true} />
      <InnerSection>
        <ImageContent data={homeAboutData} />
      </InnerSection>
    </OuterSection>
  );
};

export default AboutPrimeAcademy;
```

## File: src/components/Root/home/BlogCard.jsx

```javascript
import { Card, CardContent } from '@/components/ui/card';
import { dateConvertionHomePageBlogCard } from '@/utils/timeFormat';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogCard = ({ blog }) => {
  return (
    <Card className="flex flex-col h-full rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Image section */}
      <div className="relative">
        <motion.img
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          src={blog.featured_image}
          alt={blog.title}
          className="w-full h-[250px] object-cover"
        />
        {blog?.category && (
          <p className="absolute top-3 left-3 bg-secondary px-3 py-1 rounded-full text-black font-semibold font-heading text-xs">
            {blog?.category?.name}
          </p>
        )}
      </div>

      {/* Content */}
      <CardContent className="flex flex-col flex-1 justify-start p-lg gap-sm">
        <p className="font-heading text-base text-black/50">
          {dateConvertionHomePageBlogCard(blog.created_at)}
        </p>
        <h3 className="font-heading font-bold text-primary text-xl line-clamp-2 min-h-[56px]">
          {blog.title}
        </h3>
        <p className="font-heading text-base text-black/50 line-clamp-3 min-h-[66px]">
          {blog.excerpt}
        </p>
      </CardContent>

      {/* Button */}
      <div className="p-lg pt-0 mt-auto">
        <Link
          to={`/blogs/${blog?.slug}`}
          className="flex w-[fit-content] items-center gap-sm text-primary font-heading font-bold text-base hover:underline"
        >
          Read More <FaArrowRight />
        </Link>
      </div>
    </Card>
  );
};

export default BlogCard;
```

## File: src/components/Root/home/css/hero.css

```css
/* home hero heading */
.heading-home-hero,
.heading-home-hero-scroll {
  font-size: 48px;
  font-family: var(--font-heading);
  text-transform: uppercase;
  font-weight: bold;
  line-height: var(--leading-xl);
}

.heading-home-hero,
.home-hero-left {
  width: 490px !important;
  margin-top: 63px;
}

@media screen and (max-width: 1170px) {
  .heading-home-hero,
  .heading-home-hero-scroll {
    font-size: 40px;
  }
  .heading-home-hero,
  .home-hero-left {
    width: 410px !important;
  }
}

@media screen and (max-width: 970px) {
  .heading-home-hero,
  .heading-home-hero-scroll {
    font-size: 36px;
  }
  .heading-home-hero,
  .home-hero-left {
    max-width: 400px;
    width: 100% !important;
  }
}

@media screen and (max-width: 670px) {
  .heading-home-hero,
  .heading-home-hero-scroll {
    font-size: 32px;
  }
}

@media screen and (max-width: 520px) {
  .heading-home-hero,
  .heading-home-hero-scroll {
    font-size: 28px;
  }
}
```

## File: src/components/Root/home/FeaturesSection.jsx

```javascript
import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import { homFeaturesData } from '../../../data/homePageData';
import CourseFeatureCard from '../../common/CourseFeatureCard';

const FeaturesSection = () => {
  return (
    <OuterSection>
      <InnerSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {homFeaturesData.map((feature) => (
            <CourseFeatureCard key={feature.id} course={feature} />
          ))}
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default FeaturesSection;
```

## File: src/components/Root/home/HeroSection.jsx

```javascript
import HorizontalScrollSection from '../../common/HorizontalScroll';
import VerticalScrollSection from '../../common/VerticalScroll';
import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import PrimaryButton from '../../common/PrimaryButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetcHeros } from '@/redux/hero/heroAction';
import ReactMarkdown from 'react-markdown';
import SecondaryButton from '@/components/common/SecondaryButton';
import HomeHeroBgLayouts from './HomeHeroBgLayouts';
import './css/hero.css';

const HomeHero = () => {
  const [homeHero, setHomeHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!heros?.length) {
      dispatch(fetcHeros());
    }
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.id == 1);
    setHomeHero(current[0]);
  }, [heros]);

  return (
    <OuterSection
      className="bg-secondary relative min-h-[800px] pt-[70px] items-start"
      style={{ zIndex: 40 }}
    >
      {/* bg layouts  */}
      <HomeHeroBgLayouts image={homeHero?.banner_image} />

      {/* content  */}
      <InnerSection className="items-start z-5">
        <div className="flex flex-col lg:flex-row justify-start lg:items-center w-full gap-sm">
          {/* Left Content */}
          <div className="home-hero-left">
            <h1 className="mt-60 md:mt-0 heading-home-hero mb-md text-white">
              {/* <ReactMarkdown>{homeHero?.title || ''}</ReactMarkdown> */}
              GIVING YOU <br /> THE CONFIDENCE TO
            </h1>

            <div className="w-full flex lg:hidden gap-xl mb-md">
              <HorizontalScrollSection items={homeHero?.slides} />
            </div>
            <div className="font-heading text-sm text-white leading-lg lg:max-w-[85%] space-y-md">
              <ReactMarkdown>{homeHero?.description || ''}</ReactMarkdown>
            </div>

            <div className="flex gap-lg flex-wrap mt-xl">
              {homeHero?.button1_url && (
                <div className="flex gap-lg">
                  <PrimaryButton
                    href={homeHero?.button1_url}
                    text={homeHero?.button1_text}
                    className="rounded-lg"
                  />
                </div>
              )}
              {homeHero?.button2_url && (
                <div className="flex gap-lg">
                  <SecondaryButton
                    href={homeHero?.button2_url}
                    text={homeHero?.button2_text}
                    className="rounded-lg"
                    from="hero"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Vertical Scroll */}
          <div className="hidden w-full lg:flex">
            <VerticalScrollSection items={homeHero?.slides} />
          </div>
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default HomeHero;
```

## File: src/components/Root/home/HomeHeroBgLayouts.jsx

```javascript
import React, { useState } from 'react';

const HomeHeroBgLayouts = ({ image }) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <div
        className="absolute right-0 top-0 w-full h-[800px] bg-cover bg-center z-3 scale-x-[-1]"
        style={{ backgroundImage: `url(/assets/hero-pattern.png)` }}
      ></div>
      <img
        className={`absolute left-0 top-0 w-full md:w-[70%] h-[100%] object-cover z-2 transition-opacity duration-700 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setLoading(false)}
        src={image}
        alt=""
      />
      <div className="absolute -left-10 -bottom-60 w-[120%] h-70 bg-white z-5 rotate-6"></div>
      <div className="absolute -right-40 md:-right-150 -bottom-60 w-[120%] h-70 bg-white z-5 -rotate-10"></div>
      <div className="absolute z-4 top-0 left-0 w-full h-full bg-black/30"></div>
    </>
  );
};

export default HomeHeroBgLayouts;
```

## File: src/components/Root/home/ImageContentSection.jsx

```javascript
/**
 * ImageContentSection Component
 * -----------------------------
 * - Displays an image/video content section with optional additional info and CTA button
 * - Uses `OuterSection` + `InnerSection` for consistent layout
 * - Includes a decorative `RoundShape` for visual design
 * - The actual content is passed via the `imageContent` object
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import ImageContent from '../../common/ImageContent';
import RoundShape from '../../common/RoundShape';
import { homeImageContent } from '../../../data/homePageData';

const ImageContentSection = () => {
  return (
    <OuterSection className="relative">
      {/* Decorative circular element */}
      <RoundShape />

      <InnerSection>
        {/* Main content block */}
        <ImageContent data={homeImageContent} />
      </InnerSection>
    </OuterSection>
  );
};

export default ImageContentSection;
```

## File: src/components/Root/home/KnowUs.jsx

```javascript
/**
 * KnowUs Component
 * ----------------
 * - Highlights key statistics and achievements of Prime Academy
 * - Split layout:
 *    1. Text and CTA on the left
 *    2. Statistics grid on the right
 * - Uses OuterSection + InnerSection for consistent layout
 * - Includes a PrimaryButton for user engagement
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import KnowUsComponent from '../../common/KnowUs';
import { homeKhowUs } from '../../../data/homePageData';

const KnowUs = () => {
  return (
    <OuterSection>
      <InnerSection className="flex flex-col lg:flex-row gap-lg">
        <KnowUsComponent statsData={homeKhowUs?.stats} content={homeKhowUs?.content} />
      </InnerSection>
    </OuterSection>
  );
};

export default KnowUs;
```

## File: src/components/Root/home/OurBlogs.jsx

```javascript
/**
 * OurBlogs Component
 * -----------------
 * - Displays a preview of recent blog posts in a responsive grid
 * - Includes a heading, description, blog cards, and a call-to-action button
 * - Uses OuterSection + InnerSection for consistent layout
 * - Blog data is defined locally but can be fetched dynamically in production
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import BlogCard from './BlogCard';
import PrimaryButton from '../../common/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestBlogs } from '@/redux/blogs/blogAction';
import { useEffect } from 'react';

const OurBlogs = () => {
  const { latestBlogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!latestBlogs.length) {
      dispatch(fetchLatestBlogs());
    }
  }, []);

  return (
    <OuterSection>
      <InnerSection className="space-y-lg">
        {/* Section Heading */}
        <h2 className="text-primary heading-4xl text-center">Our Blogs</h2>

        {/* Section Description */}
        <p className="text-base font-normal font-heading text-black/50 text-center">
          Stay updated with the latest insights, success stories, and educational trends
        </p>

        {/* Blog Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-lg items-stretch"
          style={{ padding: '10px' }}
        >
          {latestBlogs.map((blog) => (
            <BlogCard key={blog.title} blog={blog} />
          ))}
        </div>

        {/* Call-to-Action Button */}
        <div className="flex justify-center">
          <PrimaryButton text={`View All Blogs`} href={`/blogs`} className="rounded-lg" />
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default OurBlogs;
```

## File: src/components/Root/landing/LandingFooter.jsx

```javascript
import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import React from 'react';
import { Link } from 'react-router-dom';

const LandingFooter = () => {
  return (
    <OuterSection className="bg-primary">
      <InnerSection Tag="footer" className="z-1 ">
        <div className="mx-auto flex w-full items-center justify-between py-5">
          <div>
            <div className="font-extrabold">Prime Academy</div>
            <p className="text-sm text-white/50">
              Why wait? This is the moment to stay ahead in the AI era.
            </p>
          </div>
          <div className="hidden gap-4 text-sm font-semibold text-white/50 md:flex">
            <Link className="hover:text-white" to="#about">
              About
            </Link>
            <Link className="hover:text-white" to="#syllabus">
              Syllabus
            </Link>
            <Link className="hover:text-white" to="#pricing">
              Pricing
            </Link>
            <Link className="hover:text-white" to="#enroll">
              Enroll
            </Link>
          </div>
        </div>
        <div className="border-t border-[#1a2338] py-3 text-center text-xs text-white/50">
          © Prime Academy Bangladesh · Made by 💛 J. R. Polok
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default LandingFooter;
```

## File: src/components/Root/landing/LandingNavbar.jsx

```javascript
import { useState } from 'react';
import { Link } from 'react-router-dom';
import OuterSection from '@/components/common/OuterSection';
import InnerSection from '@/components/common/InnerSection';
import { FiMenu, FiX } from 'react-icons/fi';

const LandingNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { text: 'About', url: '#about' },
    { text: 'Why Us', url: '#why' },
    { text: 'Pricing', url: '#pricing' },
    { text: 'Syllabus', url: '#syllabus' },
    { text: 'Instructor', url: '#instructor' },
  ];

  return (
    <OuterSection
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-black/40 shadow-xl backdrop-blur-md`}
      style={{ overflow: 'visible' }}
    >
      <InnerSection Tag="header" style={{ paddingBlock: '10px' }}>
        <div className="mx-auto flex h-16 w-full items-center justify-between px-4 md:px-0">
          {/* Logo */}
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img
              src={`/assets/prime-academy-logo-full.png`}
              className="w-[190px]"
              alt="Prime Logo"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-semibold">
            {navLinks.map(({ text, url }) => (
              <Link
                key={url}
                to={url}
                className={`hover:text-white transition-colors text-white/60`}
              >
                {text}
              </Link>
            ))}
            <Link
              to="#enroll"
              className="inline-flex h-9 items-center rounded-lg border border-transparent bg-[#f2c94c] px-3 font-bold text-[#1b1b1b] hover:brightness-105 transition"
            >
              Enroll Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <FiX className={`w-7 h-7 text-white`} />
            ) : (
              <FiMenu className={`w-7 h-7 text-white`} />
            )}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {menuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full backdrop-blur-md bg-primary shadow-lg z-40">
            <nav className="flex flex-col items-center gap-4 py-6">
              {navLinks.map(({ text, url }) => (
                <Link
                  key={url}
                  to={url}
                  onClick={() => setMenuOpen(false)}
                  className="font-semibold text-lg text-white hover:text-primary transition-colors"
                >
                  {text}
                </Link>
              ))}
              <Link
                to="#enroll"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-10 items-center rounded-lg bg-[#f2c94c] px-4 font-bold text-[#1b1b1b] hover:brightness-105 transition"
              >
                Enroll Now
              </Link>
            </nav>
          </div>
        )}
      </InnerSection>
    </OuterSection>
  );
};

export default LandingNavbar;
```

## File: src/components/Root/login/ContentCard.jsx

```javascript
const ContentCard = ({ icon, heading, content }) => {
  return (
    <div className="flex flex-col items-start justify-center gap-3 mt-6 bg-white shadow-around-sm p-6 rounded-lg">
      <p className="text-3xl text-secondary">{icon}</p>
      <h1 className="font-semibold">{heading}</h1>
      <p className="text-sm text-black/50">{content}</p>
    </div>
  );
};

export default ContentCard;
```

## File: src/components/Root/login/RoleButton.jsx

```javascript
export const RoleButton = ({ icon, text, role, setRole, activeRole }) => {
  const handleSetRole = () => {
    setRole(role);
  };
  return (
    <button
      onClick={handleSetRole}
      className={`flex-grow basis-[140px] border border-secondary/25 px-4 py-3 rounded-xl w-full flex flex-col items-center justify-center gap-1 cursor-pointer ${activeRole == role ? 'bg-secondary-light' : ' bg-secondary/15'}`}
    >
      {icon}
      <p className="text-primary-text font-semibold text-xs"> {text}</p>
    </button>
  );
};
```

## File: src/components/Root/privacypolicy/PrivacyContent.jsx

```javascript
import PrivacyHeading from '../../common/PrivacyHeading';
import InnerSection from '../../common/InnerSection';
import OuterSection from '../../common/OuterSection';

const PrivacyContent = () => {
  return (
    <OuterSection>
      <InnerSection>
        <div className="flex flex-col gap-lg">
          <PrivacyHeading>
            <strong>
              <u>Introduction</u>
            </strong>
          </PrivacyHeading>
          <p>
            This privacy policy has been prepared in accordance with the General Data Protection
            Regulation (EU) 2016/679 (“GDPR”) and the Data Protection Act 2018.
          </p>
          <p>
            This notice sets out the basis on which any personal data including special category
            personal data that we collect from you, or that you provide to us, will be processed by
            us.&nbsp; Personal data means information about you that may identify you from that
            data.
          </p>
          <p>This policy applies to Candidates, Learners, Employers and Partners.</p>
          <p>
            This policy ensures Prime Academy Apprenticeships meets the Data Protection Principles
            which require information to be:
          </p>
          <ul class="list-disc list-inside">
            <li>Handled fairly and lawfully</li>
            <li>Kept and used for limited purposes</li>
            <li>Required for good reason</li>
            <li>Correct and up to date</li>
            <li>Not kept longer than necessary</li>
            <li>Handled confidentially</li>
            <li>Stored securely</li>
            <li>Not transferred to unapproved countries outside the European Economic Area</li>
          </ul>
          <PrivacyHeading>
            <strong>
              <u>Who we are</u>
            </strong>
          </PrivacyHeading>
          <p>
            Prime Academy Training Services Ltd (known as Prime Academy Apprenticeships) &nbsp;is a
            Training Provider who contracts with the Educations and Skills Funding Agency (ESFA), an
            executive agency of the Department for Education (DfE) to deliver Apprenticeship and
            Adult Education Training Programmes.
          </p>
          <PrivacyHeading>
            <strong>
              <u>Data Controller Statement</u>
            </strong>
          </PrivacyHeading>
          <p>
            Prime Academy Training Services Ltd, (also referred to in this policy as “we” or “us”)
            registered office is Pioneer House, Pioneer Court, Darlington, Co Durham, DL1 4WD
            company number 05868493 is the Data Controller in respect of all data collected.
          </p>
          <PrivacyHeading>
            <strong>
              <u>Your acceptance of this policy and our right to change it</u>
            </strong>
          </PrivacyHeading>
          <p>
            By using our websites, social media pages or by providing your information, you
            understand that we will collect and use the information provided in the way(s) set out
            in this policy.&nbsp; If you do not agree to this policy do not use our sites, social
            media pages or services.
          </p>
          <p>
            We may make changes to this policy from time to time.&nbsp; If we do so, will post the
            changes on this page and they will apply form the time we post them.
          </p>
          <p>
            <strong>
              <u>&nbsp;</u>
            </strong>
          </p>
          <PrivacyHeading>
            <strong>
              <u>What information do we collect from you or ask you to provide?</u>
            </strong>
          </PrivacyHeading>
          <p>
            <strong>
              We collect data directly from you during recruitment, induction and programme
              delivery, this includes;
            </strong>
          </p>
          <p>
            Personal information – such as your name, date of birth, National Insurance number,
            gender, contact details, details of your current situation with regarding to education,
            training or employment, qualifications and your future career aspirations.
          </p>
          <p>
            Special categories of personal data – such as ethnic origin, physical or mental health
            or condition.
          </p>
          <p>
            We will collect information you voluntarily provide us when you contact us with queries,
            complaints or customer feedback.
          </p>
          <p>
            We operate call recording for training and quality purposes, any personal data disclosed
            during telephone/Teams meeting calls to and from our offices will be collected.
          </p>
          <p>
            We operate training delivery call recording to support reasonable adjustments for our
            learners with a learning difficulty, disability and/or medical condition and for staff
            training, quality and compliance purposes.&nbsp; For clarification training includes all
            aspects of programme delivery including Induction, Online Classroom Training, Workshops,
            Support Sessions and Progress Reviews.
          </p>
          <h3>
            <strong>
              If you visit our website, we may automatically collect the following information:
            </strong>
          </h3>
          <p>
            Technical information, including the internet protocol (IP) address used to connect your
            computer to the Internet, login information, browser type and version, time zone
            setting, browser plug-in types and versions, operating system and platform;
          </p>
          <p>
            Information about your visit to our website such as the products and/or services you
            searched for and view, page response times, download errors, length of visits to certain
            pages, page interaction information (such as scrolling, clicks, and mouse-overs), and
            methods used to browse away from the page.
          </p>
          <h3>
            <strong>Other sources of personal data</strong>
          </h3>
          <p>
            We may also use personal data from other sources, such as specialist companies that
            supply information, online media channels and public registers and public website
            domains.
          </p>
          <PrivacyHeading>
            <strong>
              <u>Purpose of data?</u>
            </strong>
          </PrivacyHeading>
          <p>We need to collect, hold and process information about you in order to:</p>
          <ul class="list-disc list-inside">
            <li>
              Confirm your identify and keep in touch with you by post, email, text or telephone
            </li>
            <li>Help you find and prepare for employment and training opportunities</li>
            <li>Confirm your eligibility for training programme participation</li>
            <li>
              Register you on a training programme in accordance with the compliance requirements
              detailed in The Education &amp; Skills Funding Agency Funding (ESFA) Funding &amp;
              Performance Management rules and ESFA Individual Learning Record (ILR) guidance
            </li>
            <li>Understand your needs and provide you with the appropriate support</li>
            <li>
              Meet our statutory obligations including those related to equality &amp; diversity
            </li>
            <li>
              Manage our employer customer account and provide you with details of our services
            </li>
            <li>Respond to queries, complaints or customer feedback</li>
          </ul>
          <PrivacyHeading>
            <strong>
              <u>Legal basis for processing your data</u>
            </strong>
          </PrivacyHeading>
          <p>
            <strong>Candidate Recruitment – Legitimate interest:</strong>&nbsp; To ensure that Prime
            Academy Apprenticeships&nbsp;&nbsp; match candidates wishing to seek apprenticeship and
            learning opportunities and considering their interests, skills and abilities to match
            them with employer apprenticeship and employment opportunities.
          </p>
          <p>
            <strong>Learner Enrolment and on programme participation</strong>{' '}
            <strong>– Legitimate interest:</strong> To ensure Prime Academy Apprenticeships deliver
            a programme of training in accordance with ESFA requirements which supports individuals
            and meets their learning and welfare needs.&nbsp; For special categories of personal
            data, this is processed as it is necessary for employment.
          </p>
          <p>
            <strong>Employers – Legitimate interest:</strong> To ensure Prime Academy
            Apprenticeships supports your recruitment needs and that together we deliver a
            successful apprenticeship programme to our learners/employees.
          </p>
          <p>
            <strong>Employers (Direct Marketing) – Legitimate interest:</strong>
            &nbsp; To ensure Employers are invited to support the Government’s Apprenticeships and
            Skills Policy in England. Apprenticeships are one of the initiatives the government has
            in place to improve the skills held by workers in England.&nbsp; Apprenticeships ensure
            the skills system is more responsive to employer needs.
          </p>
          <p>
            <strong>Improving our service – Legitimate interest:</strong>&nbsp; To make sure that
            Prime Academy Apprenticeships continue to improve our service and provider the best and
            most effective service possible to our customers (candidates, learners and employers)
          </p>
          <PrivacyHeading>
            <strong>
              <u>Cookies &amp; Tracking</u>
            </strong>
          </PrivacyHeading>
          <p>Our organisation utilises Force24’s marketing automation platform.</p>
          <p>
            Force24 cookies are first party cookies and are enabled at the point of cookie
            acceptance on this website. The cookies are named below:
          </p>
          <ul class="list-disc list-inside">
            <li>F24_autoID</li>
            <li>F24_personID</li>
          </ul>
          <p>
            They allow us to understand our audience engagement, allowing better optimisation of
            marketing activity.
          </p>
          <p>
            <strong>f24_autoId</strong>&nbsp;– This is a temporary identifier on a local machine or
            phone browser that helps us track anonymous information to be later married up with
            f24_personid. If this is left anonymous it will be deleted after 6 months.
            Non-essential, first party, 10 years, persistent.
          </p>
          <p>
            <strong>f24_personId</strong>&nbsp;– This is an ID generated per individual contact in
            the Force24 system to be able to track behaviour and form submissions into the Force24
            system from outside sources per user. This is used for personalisation and ability to
            segment decisions for further communications. Non-essential, first party, 10 years,
            persistent.
          </p>
          <p>The information stored by Force24 cookies remains anonymous until:</p>
          <ul class="list-disc list-inside">
            <li>
              Our website is visited via clicking from an email or SMS message, sent via the Force24
              platform and cookies are accepted on the website.
            </li>
            <li>
              A user of the website completes a form containing email address from either our
              website or our Force24 landing pages.
            </li>
          </ul>
          <p>The Force24 cookies will remain on a device for 10 years unless they are deleted.</p>
          <h3>
            <strong>Other Tracking </strong>
          </h3>
          <p>
            We also use similar technologies including tracking pixels and link tracking to monitor
            your viewing activities
          </p>
          <h3>
            <strong>Device &amp; browser type and open statistics</strong>
          </h3>
          <p>
            All emails have a tracking pixel (a tiny invisible image) with a query string in the
            URL. Within the URL we have user details to identify who opened an email for statistical
            purposes.
          </p>
          <h3>
            <strong>Link Tracking</strong>
          </h3>
          <p>
            All links within emails and SMS messages sent from the Force24 platform contain a{' '}
            <em>unique tracking </em>reference, this reference help us identify who clicked an email
            for statistical purposes.
          </p>
          <p>
            <strong>
              <u>&nbsp;</u>
            </strong>
          </p>
          <PrivacyHeading>
            <strong>
              <u>Who might we share your information with?</u>
            </strong>
          </PrivacyHeading>
          <p>We do need to share your data with some third parties.</p>
          <p>
            Candidate data will be shared with employers recruiting to fulfil an apprenticeship
            vacancy
          </p>
          <p>
            Learner data will be shared with the Education &amp; Skills Funding Agency,
            Qualification Awarding Bodies, and End Point Assessment Organisations (EPAOs).&nbsp;
            These organisations will become Data Controllers on receipt of data. &nbsp;Portfolio
            platforms used by EPAOs are data processors (ACE360 and EPA Pro).&nbsp;&nbsp; Your
            contact details will be shared with organisations who carry out destination surveys on
            completion of your apprenticeship. These organisations will also be data processors.
          </p>
          <p>Employer data will be shared with the Education &amp; Skills Funding Agency.</p>
          <p>
            Data will be visible to service providers who provide the mechanisms Prime Academy
            Apprenticeships use to collect and store data:
          </p>
          <ul class="list-disc list-inside">
            <li>Databases are provided by Perspective (Sunesis), Bud and Salesforce Seven20.</li>
            <li>Our E-portfolio provider is SMART Assessor and Bud</li>
            <li>Company sharepoints is Microsoft</li>
            <li>Company email service is provided by Aspire</li>
            <li>Documentation signature and exchange is provided by SignNow</li>
            <li>Apprentice Community provided by Hivebrite</li>
          </ul>
          <PrivacyHeading>
            <strong>
              <u>How we protect your information?</u>
            </strong>
          </PrivacyHeading>
          <p>
            Measures we have in place to protect your information include computer safeguards such
            as firewalls and data encryption and we enforce physical access controls to our
            buildings and files to keep data safe.&nbsp; We only authorise access to employees who
            need it to carry out their job responsibilities.&nbsp;&nbsp; Please note that we cannot
            guarantee the security of any personal data that you transfer to us by email, for
            example a CV you submit to us for a vacancy.&nbsp; CVs and Applications submitted via
            our website portal are secure.
          </p>
          <PrivacyHeading>
            <strong>
              <u>How we store your information?</u>
            </strong>
          </PrivacyHeading>
          <p>
            Prime Academy Apprenticeships maintains records of the geographical location of your
            personal data and special categories of personal data.&nbsp;&nbsp; This is either:
          </p>
          <ul class="list-disc list-inside">
            <li>Stored in the UK or</li>
            <li>Stored within the European Economic Area (EEA)</li>
          </ul>
          <PrivacyHeading>
            <strong>
              <u>How long do we keep hold of your information?</u>
            </strong>
          </PrivacyHeading>
          <p>
            Candidate/Learner and Employer funding data will be retained in accordance with our ESFA
            and ESF contractual requirements, this is currently until 31<sup>st</sup> December 2030
            for learners starting prior to 1<sup>st</sup> August 2023.
          </p>
          <p>
            For starts from 1<sup>st</sup> August 2023 Learner and Employer funding data will be
            retained in according with our ESFA contractual requirements, this is currently 6 years.
          </p>
          <p>
            Operations delivery of Training/Workshops/Support Sessions (Adobe or Teams Recordings)
            will be retained for the duration of the learners programme of learning.
          </p>
          <p>
            Telephone/Teams meeting call recordings to/from Sales and non-learner facing calls will
            be retained for 9 months.
          </p>
          <p>
            Telephone/Teams meeting call recordings to/from learners will be retained for the
            duration of the learners programme of learning, up to 18 months.
          </p>
          <p>
            Unplaced candidate data will be retained for a period of 12 months from date of last
            contact
          </p>
          <PrivacyHeading>
            <strong>
              <u>Automated decision making</u>
            </strong>
          </PrivacyHeading>
          <p>Please be advised that no decisions are made using automated decision mechanisms.</p>
          <p>
            <strong>
              <u>&nbsp;</u>
            </strong>
          </p>
          <PrivacyHeading>
            <strong>
              <u>Your rights under General Data Protection Regulation</u>
            </strong>
          </PrivacyHeading>
          <p>
            You have a number of rights under data protection law. We will need to ask you for proof
            of your identify before we can respond to a request to exercise any of the rights set
            out below.&nbsp; We also may need to ask you for more information, for example to help
            us to locate the personal data that your request relates to.
          </p>
          <h3>
            <strong>Right 1 – A right to access your information</strong>
          </h3>
          <p>
            You have a right to ask us for a copy of your personal data that we hold about
            you.&nbsp; A request to exercise this right is called a “subject access request” Details
            of our subject access procedure can be found on our website at{' '}
            <a href="http://www.prime-academy-bd.vercel.app">www.prime-academy-bd.vercel.app</a> or
            you can request a copy at{' '}
            <a href="mailto:example@primeacademy.com">example@primeacademy.com</a>
          </p>
          <h3>
            <strong>Right 2 – A right to object to us processing your information</strong>
          </h3>
          <p>
            You have a right to object to us processing any personal data that we process where we
            are relying on legitimate interests as the legal basis of our processing.&nbsp; This
            includes all of your personal data that we process for all of the purposes set out in
            this Privacy Policy.&nbsp;&nbsp; If we have compelling legitimate grounds to carry on
            processing your personal data, we will be able to continue to do so.&nbsp; Otherwise we
            will cease processing your personal data.
          </p>
          <p>
            You can exercise this right by emailing{' '}
            <a href="mailto:example@primeacademy.com">example@primeacademy.com</a>
          </p>
          <h3>
            <strong>Right 3 – A right to have inaccurate data corrected </strong>
          </h3>
          <p>
            You have the right to ask us to correct inaccurate data that we hold about you; on
            notification we will correct your personal data.
          </p>
          <h3>
            <strong>Right 4 – A right to have your data erased</strong>
          </h3>
          <p>
            You have the right to ask us to delete your personal data in certain circumstances for
            example if we no longer need the data for the purpose set out in this Privacy
            Policy.&nbsp; You can exercise this right by emailing{' '}
            <a href="mailto:example@primeacademy.com">example@primeacademy.com</a>
          </p>
          <h3>
            <strong>Right 5 – A right to ask us not to market to you</strong>
          </h3>
          <p>
            You can ask us not to send you direct marketing, you can exercise this right be emailing{' '}
            <a href="mailto:example@primeacademy.com">example@primeacademy.com</a>
          </p>
          <h3>
            <strong>Right 6 – A right to have processing of your data restricted</strong>
          </h3>
          <p>
            You can ask us to restrict processing of your personal data in some circumstances, for
            example if you think the data is inaccurate and we need to verify its accuracy.
          </p>
          <PrivacyHeading>
            <strong>
              <u>How to contact us</u>
            </strong>
          </PrivacyHeading>
          <p>
            If you have any questions or concerns about this Privacy Policy and/or our processing of
            your personal data you can contact us at{' '}
            <a href="mailto:example@primeacademy.com">example@primeacademy.com</a>
          </p>
          <PrivacyHeading>
            <strong>
              <u>What if you have a complaint?</u>
            </strong>
          </PrivacyHeading>
          <p>
            You have a right to complain to the Information Commissioner’s Office (ICO) which
            regulates data protection compliance in the UK, if you are unhappy with how we have
            processed your personal data.&nbsp; You can find out how to do this by visiting{' '}
            <a href="http://www.ico.org.uk">www.ico.org.uk</a>
          </p>
          <PrivacyHeading>
            <strong>
              <u>Policy review</u>
            </strong>
          </PrivacyHeading>
          <p>This policy will be reviewed annually or when changes are required.</p>
          <h3 style={{ textAlign: 'center' }}>
            <strong>&nbsp;&nbsp; – Promoting equality and diversity –</strong>
          </h3>
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default PrivacyContent;
```

## File: src/components/Root/privacypolicy/PrivacyPolicyHero.jsx

```javascript
import { useEffect, useState } from 'react';
import HeroSection from '../../common/HeroSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetcHeros } from '@/redux/hero/heroAction';

const PrivacyPolicyHero = () => {
  const [ppHero, setPpHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!heros?.length) {
      dispatch(fetcHeros());
    }
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.id == 8);
    setPpHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      backgroundImage={ppHero?.banner_image}
      className="relative"
      title={ppHero?.title}
      description={ppHero?.description}
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/privacy-policy', text: 'PrivacyPolicy' },
      ]}
      buttons={[
        ppHero?.button1_url && {
          text: ppHero?.button1_text,
          url: ppHero?.button1_url,
          type: 'primary',
        },
        ppHero?.button2_url && {
          text: ppHero?.button2_text,
          url: ppHero?.button2_url,
          type: 'secondary',
        },
      ]}
    />
  );
};

export default PrivacyPolicyHero;
```

## File: src/components/Root/refundpolicy/RefundContent.jsx

```javascript
import PrivacyHeading from '../../common/PrivacyHeading';
import InnerSection from '../../common/InnerSection';
import OuterSection from '../../common/OuterSection';

const RefundContent = () => {
  return (
    <OuterSection>
      <InnerSection>
        <div className="flex flex-col gap-lg">
          <PrivacyHeading>
            <strong>
              <u>Introduction</u>
            </strong>
          </PrivacyHeading>
          <p>
            This privacy policy has been prepared in accordance with the General Data Protection
            Regulation (EU) 2016/679 (“GDPR”) and the Data Protection Act 2018.
          </p>
          <p>
            This notice sets out the basis on which any personal data including special category
            personal data that we collect from you, or that you provide to us, will be processed by
            us.&nbsp; Personal data means information about you that may identify you from that
            data.
          </p>
          <p>This policy applies to Candidates, Learners, Employers and Partners.</p>
          <p>
            This policy ensures Prime Academy Apprenticeships meets the Data Protection Principles
            which require information to be:
          </p>
          <ul class="list-disc list-inside">
            <li>Handled fairly and lawfully</li>
            <li>Kept and used for limited purposes</li>
            <li>Required for good reason</li>
            <li>Correct and up to date</li>
            <li>Not kept longer than necessary</li>
            <li>Handled confidentially</li>
            <li>Stored securely</li>
            <li>Not transferred to unapproved countries outside the European Economic Area</li>
          </ul>
          <PrivacyHeading>
            <strong>
              <u>Who we are</u>
            </strong>
          </PrivacyHeading>
          <p>
            Prime Academy Training Services Ltd (known as Prime Academy Apprenticeships) &nbsp;is a
            Training Provider who contracts with the Educations and Skills Funding Agency (ESFA), an
            executive agency of the Department for Education (DfE) to deliver Apprenticeship and
            Adult Education Training Programmes.
          </p>
          <PrivacyHeading>
            <strong>
              <u>Data Controller Statement</u>
            </strong>
          </PrivacyHeading>
          <p>
            Prime Academy Training Services Ltd, (also referred to in this policy as “we” or “us”)
            registered office is Pioneer House, Pioneer Court, Darlington, Co Durham, DL1 4WD
            company number 05868493 is the Data Controller in respect of all data collected.
          </p>
          <PrivacyHeading>
            <strong>
              <u>Your acceptance of this policy and our right to change it</u>
            </strong>
          </PrivacyHeading>
          <p>
            By using our websites, social media pages or by providing your information, you
            understand that we will collect and use the information provided in the way(s) set out
            in this policy.&nbsp; If you do not agree to this policy do not use our sites, social
            media pages or services.
          </p>
          <p>
            We may make changes to this policy from time to time.&nbsp; If we do so, will post the
            changes on this page and they will apply form the time we post them.
          </p>
          <p>
            <strong>
              <u>&nbsp;</u>
            </strong>
          </p>
          <PrivacyHeading>
            <strong>
              <u>What information do we collect from you or ask you to provide?</u>
            </strong>
          </PrivacyHeading>
          <p>
            <strong>
              We collect data directly from you during recruitment, induction and programme
              delivery, this includes;
            </strong>
          </p>
          <p>
            Personal information – such as your name, date of birth, National Insurance number,
            gender, contact details, details of your current situation with regarding to education,
            training or employment, qualifications and your future career aspirations.
          </p>
          <p>
            Special categories of personal data – such as ethnic origin, physical or mental health
            or condition.
          </p>
          <p>
            We will collect information you voluntarily provide us when you contact us with queries,
            complaints or customer feedback.
          </p>
          <p>
            We operate call recording for training and quality purposes, any personal data disclosed
            during telephone/Teams meeting calls to and from our offices will be collected.
          </p>
          <p>
            We operate training delivery call recording to support reasonable adjustments for our
            learners with a learning difficulty, disability and/or medical condition and for staff
            training, quality and compliance purposes.&nbsp; For clarification training includes all
            aspects of programme delivery including Induction, Online Classroom Training, Workshops,
            Support Sessions and Progress Reviews.
          </p>
          <h3>
            <strong>
              If you visit our website, we may automatically collect the following information:
            </strong>
          </h3>
          <p>
            Technical information, including the internet protocol (IP) address used to connect your
            computer to the Internet, login information, browser type and version, time zone
            setting, browser plug-in types and versions, operating system and platform;
          </p>
          <p>
            Information about your visit to our website such as the products and/or services you
            searched for and view, page response times, download errors, length of visits to certain
            pages, page interaction information (such as scrolling, clicks, and mouse-overs), and
            methods used to browse away from the page.
          </p>
          <h3>
            <strong>Other sources of personal data</strong>
          </h3>
          <p>
            We may also use personal data from other sources, such as specialist companies that
            supply information, online media channels and public registers and public website
            domains.
          </p>
          <PrivacyHeading>
            <strong>
              <u>Purpose of data?</u>
            </strong>
          </PrivacyHeading>
          <p>We need to collect, hold and process information about you in order to:</p>
          <ul class="list-disc list-inside">
            <li>
              Confirm your identify and keep in touch with you by post, email, text or telephone
            </li>
            <li>Help you find and prepare for employment and training opportunities</li>
            <li>Confirm your eligibility for training programme participation</li>
            <li>
              Register you on a training programme in accordance with the compliance requirements
              detailed in The Education &amp; Skills Funding Agency Funding (ESFA) Funding &amp;
              Performance Management rules and ESFA Individual Learning Record (ILR) guidance
            </li>
            <li>Understand your needs and provide you with the appropriate support</li>
            <li>
              Meet our statutory obligations including those related to equality &amp; diversity
            </li>
            <li>
              Manage our employer customer account and provide you with details of our services
            </li>
            <li>Respond to queries, complaints or customer feedback</li>
          </ul>
          <PrivacyHeading>
            <strong>
              <u>Legal basis for processing your data</u>
            </strong>
          </PrivacyHeading>
          <p>
            <strong>Candidate Recruitment – Legitimate interest:</strong>&nbsp; To ensure that Prime
            Academy Apprenticeships&nbsp;&nbsp; match candidates wishing to seek apprenticeship and
            learning opportunities and considering their interests, skills and abilities to match
            them with employer apprenticeship and employment opportunities.
          </p>
          <p>
            <strong>Learner Enrolment and on programme participation</strong>{' '}
            <strong>– Legitimate interest:</strong> To ensure Prime Academy Apprenticeships deliver
            a programme of training in accordance with ESFA requirements which supports individuals
            and meets their learning and welfare needs.&nbsp; For special categories of personal
            data, this is processed as it is necessary for employment.
          </p>
          <p>
            <strong>Employers – Legitimate interest:</strong> To ensure Prime Academy
            Apprenticeships supports your recruitment needs and that together we deliver a
            successful apprenticeship programme to our learners/employees.
          </p>
          <p>
            <strong>Employers (Direct Marketing) – Legitimate interest:</strong>
            &nbsp; To ensure Employers are invited to support the Government’s Apprenticeships and
            Skills Policy in England. Apprenticeships are one of the initiatives the government has
            in place to improve the skills held by workers in England.&nbsp; Apprenticeships ensure
            the skills system is more responsive to employer needs.
          </p>
          <p>
            <strong>Improving our service – Legitimate interest:</strong>&nbsp; To make sure that
            Prime Academy Apprenticeships continue to improve our service and provider the best and
            most effective service possible to our customers (candidates, learners and employers)
          </p>
          <PrivacyHeading>
            <strong>
              <u>Cookies &amp; Tracking</u>
            </strong>
          </PrivacyHeading>
          <p>Our organisation utilises Force24’s marketing automation platform.</p>
          <p>
            Force24 cookies are first party cookies and are enabled at the point of cookie
            acceptance on this website. The cookies are named below:
          </p>
          <ul class="list-disc list-inside">
            <li>F24_autoID</li>
            <li>F24_personID</li>
          </ul>
          <p>
            They allow us to understand our audience engagement, allowing better optimisation of
            marketing activity.
          </p>
          <p>
            <strong>f24_autoId</strong>&nbsp;– This is a temporary identifier on a local machine or
            phone browser that helps us track anonymous information to be later married up with
            f24_personid. If this is left anonymous it will be deleted after 6 months.
            Non-essential, first party, 10 years, persistent.
          </p>
          <p>
            <strong>f24_personId</strong>&nbsp;– This is an ID generated per individual contact in
            the Force24 system to be able to track behaviour and form submissions into the Force24
            system from outside sources per user. This is used for personalisation and ability to
            segment decisions for further communications. Non-essential, first party, 10 years,
            persistent.
          </p>
          <p>The information stored by Force24 cookies remains anonymous until:</p>
          <ul class="list-disc list-inside">
            <li>
              Our website is visited via clicking from an email or SMS message, sent via the Force24
              platform and cookies are accepted on the website.
            </li>
            <li>
              A user of the website completes a form containing email address from either our
              website or our Force24 landing pages.
            </li>
          </ul>
          <p>The Force24 cookies will remain on a device for 10 years unless they are deleted.</p>
          <h3>
            <strong>Other Tracking </strong>
          </h3>
          <p>
            We also use similar technologies including tracking pixels and link tracking to monitor
            your viewing activities
          </p>
          <h3>
            <strong>Device &amp; browser type and open statistics</strong>
          </h3>
          <p>
            All emails have a tracking pixel (a tiny invisible image) with a query string in the
            URL. Within the URL we have user details to identify who opened an email for statistical
            purposes.
          </p>
          <h3>
            <strong>Link Tracking</strong>
          </h3>
          <p>
            All links within emails and SMS messages sent from the Force24 platform contain a{' '}
            <em>unique tracking </em>reference, this reference help us identify who clicked an email
            for statistical purposes.
          </p>
          <p>
            <strong>
              <u>&nbsp;</u>
            </strong>
          </p>
          <PrivacyHeading>
            <strong>
              <u>Who might we share your information with?</u>
            </strong>
          </PrivacyHeading>
          <p>We do need to share your data with some third parties.</p>
          <p>
            Candidate data will be shared with employers recruiting to fulfil an apprenticeship
            vacancy
          </p>
          <p>
            Learner data will be shared with the Education &amp; Skills Funding Agency,
            Qualification Awarding Bodies, and End Point Assessment Organisations (EPAOs).&nbsp;
            These organisations will become Data Controllers on receipt of data. &nbsp;Portfolio
            platforms used by EPAOs are data processors (ACE360 and EPA Pro).&nbsp;&nbsp; Your
            contact details will be shared with organisations who carry out destination surveys on
            completion of your apprenticeship. These organisations will also be data processors.
          </p>
          <p>Employer data will be shared with the Education &amp; Skills Funding Agency.</p>
          <p>
            Data will be visible to service providers who provide the mechanisms Prime Academy
            Apprenticeships use to collect and store data:
          </p>
          <ul class="list-disc list-inside">
            <li>Databases are provided by Perspective (Sunesis), Bud and Salesforce Seven20.</li>
            <li>Our E-portfolio provider is SMART Assessor and Bud</li>
            <li>Company sharepoints is Microsoft</li>
            <li>Company email service is provided by Aspire</li>
            <li>Documentation signature and exchange is provided by SignNow</li>
            <li>Apprentice Community provided by Hivebrite</li>
          </ul>
          <PrivacyHeading>
            <strong>
              <u>How we protect your information?</u>
            </strong>
          </PrivacyHeading>
          <p>
            Measures we have in place to protect your information include computer safeguards such
            as firewalls and data encryption and we enforce physical access controls to our
            buildings and files to keep data safe.&nbsp; We only authorise access to employees who
            need it to carry out their job responsibilities.&nbsp;&nbsp; Please note that we cannot
            guarantee the security of any personal data that you transfer to us by email, for
            example a CV you submit to us for a vacancy.&nbsp; CVs and Applications submitted via
            our website portal are secure.
          </p>
          <PrivacyHeading>
            <strong>
              <u>How we store your information?</u>
            </strong>
          </PrivacyHeading>
          <p>
            Prime Academy Apprenticeships maintains records of the geographical location of your
            personal data and special categories of personal data.&nbsp;&nbsp; This is either:
          </p>
          <ul class="list-disc list-inside">
            <li>Stored in the UK or</li>
            <li>Stored within the European Economic Area (EEA)</li>
          </ul>
          <PrivacyHeading>
            <strong>
              <u>How long do we keep hold of your information?</u>
            </strong>
          </PrivacyHeading>
          <p>
            Candidate/Learner and Employer funding data will be retained in accordance with our ESFA
            and ESF contractual requirements, this is currently until 31<sup>st</sup> December 2030
            for learners starting prior to 1<sup>st</sup> August 2023.
          </p>
          <p>
            For starts from 1<sup>st</sup> August 2023 Learner and Employer funding data will be
            retained in according with our ESFA contractual requirements, this is currently 6 years.
          </p>
          <p>
            Operations delivery of Training/Workshops/Support Sessions (Adobe or Teams Recordings)
            will be retained for the duration of the learners programme of learning.
          </p>
          <p>
            Telephone/Teams meeting call recordings to/from Sales and non-learner facing calls will
            be retained for 9 months.
          </p>
          <p>
            Telephone/Teams meeting call recordings to/from learners will be retained for the
            duration of the learners programme of learning, up to 18 months.
          </p>
          <p>
            Unplaced candidate data will be retained for a period of 12 months from date of last
            contact
          </p>
          <PrivacyHeading>
            <strong>
              <u>Automated decision making</u>
            </strong>
          </PrivacyHeading>
          <p>Please be advised that no decisions are made using automated decision mechanisms.</p>
          <p>
            <strong>
              <u>&nbsp;</u>
            </strong>
          </p>
          <PrivacyHeading>
            <strong>
              <u>Your rights under General Data Protection Regulation</u>
            </strong>
          </PrivacyHeading>
          <p>
            You have a number of rights under data protection law. We will need to ask you for proof
            of your identify before we can respond to a request to exercise any of the rights set
            out below.&nbsp; We also may need to ask you for more information, for example to help
            us to locate the personal data that your request relates to.
          </p>
          <h3>
            <strong>Right 1 – A right to access your information</strong>
          </h3>
          <p>
            You have a right to ask us for a copy of your personal data that we hold about
            you.&nbsp; A request to exercise this right is called a “subject access request” Details
            of our subject access procedure can be found on our website at{' '}
            <a href="http://www.prime-academy-bd.vercel.app">www.prime-academy-bd.vercel.app</a> or
            you can request a copy at{' '}
            <a href="mailto:dataprotection@prime-academy-bd.vercel.app">
              dataprotection@prime-academy-bd.vercel.app
            </a>
          </p>
          <h3>
            <strong>Right 2 – A right to object to us processing your information</strong>
          </h3>
          <p>
            You have a right to object to us processing any personal data that we process where we
            are relying on legitimate interests as the legal basis of our processing.&nbsp; This
            includes all of your personal data that we process for all of the purposes set out in
            this Privacy Policy.&nbsp;&nbsp; If we have compelling legitimate grounds to carry on
            processing your personal data, we will be able to continue to do so.&nbsp; Otherwise we
            will cease processing your personal data.
          </p>
          <p>
            You can exercise this right by emailing{' '}
            <a href="mailto:dataprotection@prime-academy-bd.vercel.app">
              dataprotection@prime-academy-bd.vercel.app
            </a>
          </p>
          <h3>
            <strong>Right 3 – A right to have inaccurate data corrected </strong>
          </h3>
          <p>
            You have the right to ask us to correct inaccurate data that we hold about you; on
            notification we will correct your personal data.
          </p>
          <h3>
            <strong>Right 4 – A right to have your data erased</strong>
          </h3>
          <p>
            You have the right to ask us to delete your personal data in certain circumstances for
            example if we no longer need the data for the purpose set out in this Privacy
            Policy.&nbsp; You can exercise this right by emailing{' '}
            <a href="mailto:dataprotection@prime-academy-bd.vercel.app">
              dataprotection@prime-academy-bd.vercel.app
            </a>
          </p>
          <h3>
            <strong>Right 5 – A right to ask us not to market to you</strong>
          </h3>
          <p>
            You can ask us not to send you direct marketing, you can exercise this right be emailing{' '}
            <a href="mailto:dataprotection@prime-academy-bd.vercel.app">
              dataprotection@prime-academy-bd.vercel.app
            </a>
          </p>
          <h3>
            <strong>Right 6 – A right to have processing of your data restricted</strong>
          </h3>
          <p>
            You can ask us to restrict processing of your personal data in some circumstances, for
            example if you think the data is inaccurate and we need to verify its accuracy.
          </p>
          <PrivacyHeading>
            <strong>
              <u>How to contact us</u>
            </strong>
          </PrivacyHeading>
          <p>
            If you have any questions or concerns about this Privacy Policy and/or our processing of
            your personal data you can contact us at{' '}
            <a href="mailto:dataprotection@prime-academy-bd.vercel.app">
              dataprotection@prime-academy-bd.vercel.app
            </a>
          </p>
          <PrivacyHeading>
            <strong>
              <u>What if you have a complaint?</u>
            </strong>
          </PrivacyHeading>
          <p>
            You have a right to complain to the Information Commissioner’s Office (ICO) which
            regulates data protection compliance in the UK, if you are unhappy with how we have
            processed your personal data.&nbsp; You can find out how to do this by visiting{' '}
            <a href="http://www.ico.org.uk">www.ico.org.uk</a>
          </p>
          <PrivacyHeading>
            <strong>
              <u>Policy review</u>
            </strong>
          </PrivacyHeading>
          <p>This policy will be reviewed annually or when changes are required.</p>
          <h3 style={{ textAlign: 'center' }}>
            <strong>&nbsp;&nbsp; – Promoting equality and diversity –</strong>
          </h3>
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default RefundContent;
```

## File: src/components/Root/refundpolicy/RefundPolicyHero.jsx

```javascript
import { useEffect, useState } from 'react';
import HeroSection from '../../common/HeroSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetcHeros } from '@/redux/hero/heroAction';

const RefundPolicyHero = () => {
  const [rpHero, setRpHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!heros?.length) {
      dispatch(fetcHeros());
    }
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.id == 9);
    setRpHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      backgroundImage={rpHero?.banner_image}
      className="relative"
      title={rpHero?.title}
      description={rpHero?.description}
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/privacy-policy', text: 'PrivacyPolicy' },
      ]}
      buttons={[
        rpHero?.button1_url && {
          text: rpHero?.button1_text,
          url: rpHero?.button1_url,
          type: 'primary',
        },
        rpHero?.button2_url && {
          text: rpHero?.button2_text,
          url: rpHero?.button2_url,
          type: 'secondary',
        },
      ]}
    />
  );
};

export default RefundPolicyHero;
```

## File: src/components/Root/singleCourse/BenefitsThisCourse.jsx

```javascript
import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import { benefitsThisCourse } from '@/data/singleCoursePageData';
import React from 'react';
import CourseQuestionCard from './CourseQuestionCard';

const BenefitsThisCourse = () => {
  return (
    <OuterSection>
      <InnerSection className="space-y-xl">
        <h1 className="uppercase heading-4xl text-center">BENEFITS OF INVESTING IN DATA SKILLS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl ">
          {benefitsThisCourse.map((benefit) => (
            <CourseQuestionCard key={benefit.id} question={benefit} />
          ))}
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default BenefitsThisCourse;
```

## File: src/components/Root/singleCourse/CourseContent.jsx

```javascript
/**
 * CarrersSection Component
 * ------------------------
 * - Highlights career opportunities at Prime Academy
 * - Displays an image/video along with additional description and an optional button
 * - Uses OuterSection + InnerSection for consistent layout spacing
 * - Includes a decorative RoundShape element
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import ImageContent from '../../common/ImageContent';
import RoundShape from '../../common/RoundShape';
import Image from '/assets/home-image-content.png';

// Content data for the careers section
const imageContent = {
  title: 'CAREERS AT BE-SPOKE APPRENTICESHIPS',
  image: Image, // Image path
  video: '', // Optional video URL
  additional_info: `
    Be-Spoke ensures your training aligns perfectly with business strategies, industry demands, and core values, creating a more effective and tailored development pathway for your apprentices.\n The platform gives you the tools to easily create apprenticeship programmes that are fully aligned with your industry-specific requirements. Each Be-Spoke apprenticeship is made up of 4 key features: Core Modules, Essential Modules, Expert Modules, and Be-Spoke Modules. \n With our innovative approach, you’re not just selecting an apprenticeship but curating an entirely bespoke roadmap to success.
  `,
  buttonText: 'Create your Be-spoke Apprenticeships ', // Optional button text
  url: '', // Optional button URL
};

const CourseContent = () => {
  return (
    <OuterSection className="relative">
      {/* Decorative circular element */}
      <RoundShape />

      <InnerSection>
        {/* Main content block */}
        <ImageContent data={imageContent} />
      </InnerSection>
    </OuterSection>
  );
};

export default CourseContent;
```

## File: src/components/Root/singleCourse/CourseOutLine.jsx

```javascript
import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import { courseData } from '@/data/singleCoursePageData';
import React, { useState } from 'react';
import OutLineData from './OutLineData';

const CourseOutLine = () => {
  const [courses, setCourses] = useState(courseData.courses);

  const handelOpen = (id) => {
    const updateCourses = courses.map((course) => ({
      ...course,
      active: course.id === id ? !course.active : false,
    }));
    setCourses(updateCourses);
  };
  return (
    <OuterSection>
      <InnerSection>
        <div className="w-full md:w-1/2 mb-8 space-y-2">
          <h1 className="font-bold  text-3xl ">TECHNICAL TRAINING</h1>
          <p className="text-[16px] text-justify w-full md:w-3/4">
            The technical training component of our Level 3 IT Support apprenticeship is split into
            six practice-led courses. Each practice-led course is then split into two parts.
          </p>
        </div>
        <div className="my-3">
          {courses.map((course, index) => (
            <OutLineData
              key={course.id}
              course={course}
              handelOpen={handelOpen}
              index={index}
              length={courses.length}
            />
          ))}
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default CourseOutLine;
```

## File: src/components/Root/singleCourse/CourseQuestionCard.jsx

```javascript
import React from 'react';

const CourseQuestionCard = ({ question }) => {
  return (
    <div className="flex flex-col items-center gap-md p-sm">
      <img className="w-[50px] h-[50px]" src={question.icon} alt="" />
      <h1 className="heading-3xl text-center line-clamp-1" title={question.title}>
        {question.title}
      </h1>
      <p className="text-base text-center">{question.description}</p>
    </div>
  );
};

export default CourseQuestionCard;
```

## File: src/components/Root/singleCourse/CourseValueHeading.jsx

```javascript
import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';

const CourseValueHeading = () => {
  return (
    <OuterSection>
      <InnerSection style={{ paddingBottom: '0px' }}>
        <h1 className="heading-4xl">Level 3 Data & Business Insights Apprenticeship</h1>
        <p className="pera-sm-bold">⏰ Lorem Ipsum | 💻 Lorem Ipsum | 👤 Lorem Ipsum</p>
      </InnerSection>
    </OuterSection>
  );
};

export default CourseValueHeading;
```

## File: src/components/Root/singleCourse/FactStat.jsx

```javascript
import InnerSection from '@/components/common/InnerSection';
import KnowUsComponent from '@/components/common/KnowUs';
import OuterSection from '@/components/common/OuterSection';
import { singleCourseFactsAndStat } from '@/data/singleCoursePageData';
import React from 'react';

const FactStat = () => {
  return (
    <OuterSection>
      <InnerSection className="flex flex-col md:flex-row gap-lg">
        <KnowUsComponent
          statsData={singleCourseFactsAndStat?.stats}
          content={singleCourseFactsAndStat?.content}
        />
      </InnerSection>
    </OuterSection>
  );
};

export default FactStat;
```

## File: src/components/Root/singleCourse/ImgContentBottom.jsx

```javascript
/**
 * CarrersSection Component
 * ------------------------
 * - Highlights career opportunities at Prime Academy
 * - Displays an image/video along with additional description and an optional button
 * - Uses OuterSection + InnerSection for consistent layout spacing
 * - Includes a decorative RoundShape element
 */

import OuterSection from '../../common/OuterSection';
import InnerSection from '../../common/InnerSection';
import ImageContent from '../../common/ImageContent';
import RoundShape from '../../common/RoundShape';
import Image from '/assets/Image-Content.png';

// Content data for the careers section
const imageContent = {
  title: 'CAREERS AT BE-SPOKE APPRENTICESHIPS',
  image: Image, // Image path
  video: '', // Optional video URL
  additional_info: `
    Be-Spoke ensures your training aligns perfectly with business strategies, industry demands, and core values, creating a more effective and tailored development pathway for your apprentices.\n The platform gives you the tools to easily create apprenticeship programmes that are fully aligned with your industry-specific requirements. Each Be-Spoke apprenticeship is made up of 4 key features: Core Modules, Essential Modules, Expert Modules, and Be-Spoke Modules. \n With our innovative approach, you’re not just selecting an apprenticeship but curating an entirely bespoke roadmap to success.
  `,
  buttonText: 'Create your Be-spoke Apprenticeships ', // Optional button text
  url: '', // Optional button URL
};

const ImgContentBottom = () => {
  return (
    <OuterSection className="relative">
      {/* Decorative circular element */}
      <RoundShape />

      <InnerSection>
        {/* Main content block */}
        <ImageContent data={imageContent} />
      </InnerSection>
    </OuterSection>
  );
};

export default ImgContentBottom;
```

## File: src/components/Root/singleCourse/LeftSideContent/LeftSideContent.jsx

```javascript
import TabContainSection from '@/components/common/TabContainSecton';
import { singleCourseValues } from '@/data/singleCoursePageData';
import React from 'react';
import CourseValueHeading from '../CourseValueHeading';
import WhoCanEnroll from '../WhoCanEnroll';
import CourseOutLine from '../CourseOutLine';
import CourseContent from '../CourseContent';
import BenefitsThisCourse from '../BenefitsThisCourse';
import PartnerSlider from '@/components/common/PartnerSlider';
import OurCourse from '@/components/common/OurCourse';
import ImgContentBottom from '../ImgContentBottom';
import LetStartFrom from '../LetStartFrom';
import SuccessStories from '../SuccessStories';

const LeftSideContent = () => {
  return (
    <>
      <CourseValueHeading />
      <TabContainSection tabContain={singleCourseValues} />
      <WhoCanEnroll />
      <CourseOutLine />
      <CourseContent />
      <BenefitsThisCourse />
      <LetStartFrom />
      <ImgContentBottom />
      <PartnerSlider />
      <SuccessStories />
      <OurCourse />
    </>
  );
};

export default LeftSideContent;
```

## File: src/components/Root/singleCourse/LetStartFrom.jsx

```javascript
import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import React from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import SecondaryButton from '@/components/common/SecondaryButton';

const LetStartFrom = () => {
  return (
    <OuterSection
      className="w-full min-h-[800px] bg-cover bg-center"
      style={{ backgroundImage: `url(/assets/course-page-form-bg.jpg)` }}
    >
      <InnerSection className="flex gap-xl lg:gap-lg flex-col lg:flex-row text-white">
        {/* Contact Information Section */}
        <div className="flex-1 flex gap-lg flex-col">
          <h2 className="text-3xl font-bold font-heading leading-xl">LET’S GET STARTED</h2>
          <p className="text-heading text-base leading-lg max-w-[320px]">
            Complete the form and a member of our team will be in touch in the next 48 hours.
          </p>

          {/* Phone Contact */}
          <div className="flex gap-md items-center">
            <BsTelephoneFill />
            <Link to={`tel:+8801325731050`} className="hover:underline">
              01325 731 050
            </Link>
          </div>

          {/* Email Contact */}
          <div className="flex gap-md items-center">
            <MdEmail />
            <Link to={`mailto:yourfuture@prime-academy-bd.vercel.app`} className="hover:underline">
              yourfuture@prime-academy-bd.vercel.app
            </Link>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="flex-2">
          <form className="w-full space-y-md">
            {/* First Name & Last Name */}
            <div className="flex gap-md w-full flex-col sm:flex-row">
              <div className="flex-1">
                <label htmlFor="question" className="font-heading font-bold text-base">
                  How can we help you?*
                </label>
                <input
                  type="text"
                  id="question"
                  name="question"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10 bg-white text-black"
                  placeholder="I'm looking to recruit a new apprentice"
                />
              </div>
            </div>
            <div className="flex gap-md w-full flex-col sm:flex-row">
              <div className="flex-1">
                <label htmlFor="fname" className="font-heading font-bold text-base">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10 bg-white text-black"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="jobtitle" className="font-heading font-bold text-base">
                  Job Title*
                </label>
                <input
                  type="text"
                  id="jobtitle"
                  name="jobtitle"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10 bg-white text-black"
                  placeholder="Enter your job title"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="flex gap-md w-full flex-col sm:flex-row">
              <div className="flex-1">
                <label htmlFor="email" className="font-heading font-bold text-base">
                  Work Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10 bg-white text-black"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="phone" className="font-heading font-bold text-base">
                  Mobile/Telephone*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  aria-required="true"
                  className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10 bg-white text-black"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex w-full flex-col">
              <label htmlFor="message" className="font-heading font-bold text-base">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-required="true"
                className="w-full px-md py-sm mt-xs rounded-md border-2 border-black/10 bg-white text-black"
                placeholder="Enter your message"
              ></textarea>
            </div>

            {/* Privacy Policy Agreement */}
            <div className="flex gap-md w-full items-center">
              <label className="font-heading text-xs">
                By submitting this form, you are consenting to opt-in to receive marketing
                communications from us. You may unsubscribe from our communications at any time. For
                more information on how we store your data, view our Privacy Policy.
              </label>
            </div>

            {/* Submit Button */}
            <SecondaryButton
              from={'hero'}
              type="submit"
              text={`Let's go!`}
              className="rounded-lg mt-md"
            />
          </form>
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default LetStartFrom;
```

## File: src/components/Root/singleCourse/OutLineData.jsx

```javascript
import { FaAngleDown, FaChevronUp } from 'react-icons/fa';

const OutLineData = ({ course, handelOpen, index, length }) => {
  return (
    <div className="flex">
      <div className="flex-2 hidden md:block">
        <p className="font-bold text-lg">{course.title}</p>
      </div>
      <div className="flex-1 hidden md:flex flex-col mt-2 relative">
        <div
          className={`z-1 w-6 h-6 rounded-full border-[3px] border-[#553982] shrink-0 ${
            course.active ? 'bg-[#553982]' : 'bg-white'
          }`}
        ></div>
        {index < length - 1 && (
          <div className="z-0 w-[3px] bg-[#553982] flex-1 absolute left-[11px] h-full top-2"></div>
        )}
      </div>
      <div className="flex-5 bg-[#f6f6f6] mb-3 px-4 py-3 rounded-2xl space-y-2 containBox relative ">
        <h1
          onClick={() => handelOpen(course.id)}
          className="font-bold text-lg select-none cursor-pointer"
        >
          {course.heading}
        </h1>
        <p
          className={`${
            course.active ? 'max-h-[500px]' : 'max-h-0 overflow-hidden '
          } text-[16px] transition-all duration-300 ease-in-out `}
        >
          {course.description}
        </p>

        <button
          className="flex items-center gap-2 font-bold text-[16px]"
          onClick={() => handelOpen(course.id)}
        >
          Discover More {course.active ? <FaChevronUp /> : <FaAngleDown />}
        </button>
      </div>
    </div>
  );
};

export default OutLineData;
```

## File: src/components/Root/singleCourse/RightSideContent/RightSideContent.jsx

```javascript
import React from 'react';
import CourseValueHeading from '../CourseValueHeading';
import TabContainSection from '@/components/common/TabContainSecton';

import { singleCourseValues } from '@/data/singleCoursePageData';
import CourseOutLine from '../CourseOutLine';
import FactStat from '../FactStat';
import ImgContentBottom from '../ImgContentBottom';
import PartnerSlider from '@/components/common/PartnerSlider';
import SuccessStories from '../SuccessStories';

const RightSideContent = () => {
  return (
    <>
      <CourseValueHeading />
      <TabContainSection tabContain={singleCourseValues} />
      <CourseOutLine />
      <FactStat />
      <ImgContentBottom />
      <PartnerSlider />
      <SuccessStories />
    </>
  );
};

export default RightSideContent;
```

## File: src/components/Root/singleCourse/SingleCourseHero.jsx

```javascript
import HeroSection from '@/components/common/HeroSection';
import { fetcHeros } from '@/redux/hero/heroAction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SingleCourseHero = () => {
  const [courseHero, setCourseHero] = useState();
  const { heros } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!heros?.length) {
      dispatch(fetcHeros());
    }
  }, []);

  useEffect(() => {
    let current = heros.filter((item) => item.id == 10);
    setCourseHero(current[0]);
  }, [heros]);

  return (
    <HeroSection
      backgroundImage={courseHero?.banner_image}
      title={courseHero?.title}
      description={courseHero?.description}
      className="relative"
      breadcrumbs={[
        { url: '/', text: 'Home' },
        { url: '/course', text: 'Course' },
        { url: '/course/1', text: '1' },
      ]}
      buttons={[
        courseHero?.button1_url && {
          text: courseHero?.button1_text,
          url: courseHero?.button1_url,
          type: 'primary',
        },
        courseHero?.button2_url && {
          text: courseHero?.button2_text,
          url: courseHero?.button2_url,
          type: 'secondary',
        },
      ]}
    />
  );
};

export default SingleCourseHero;
```

## File: src/components/Root/singleCourse/SingleCourseTab.jsx

```javascript
import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import { tabs } from '@/data/singleCoursePageData';
import TabBuuton from './TabBuuton';

const SingleCourseTab = ({ openTab, setOpenTab }) => {
  return (
    <OuterSection className="border-b-2 border-transparent md:border-secondary">
      <InnerSection
        className="flex justify-between gap-10 items-center flex-wrap"
        style={{ paddingBottom: '0px' }}
      >
        {/* ✅ Desktop View */}
        <div className="hidden md:flex justify-between gap-6 w-full">
          {tabs.map((button) => (
            <TabBuuton
              key={button.id}
              button={button}
              isActive={button.id === openTab}
              onClick={() => setOpenTab(button.id)}
            />
          ))}
        </div>

        {/* ✅ Mobile View */}
        <div className="w-full md:hidden mb-md space-y-sm">
          <label htmlFor="contenttab" className="text-primary font-bold text-base">
            Please select content for apprentice or employer
          </label>
          <select
            id="contenttab"
            value={openTab}
            onChange={(e) => setOpenTab(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          >
            {tabs.map((button) => (
              <option key={button.id} value={button.id}>
                {button.title}
              </option>
            ))}
          </select>
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default SingleCourseTab;
```

## File: src/components/Root/singleCourse/StoryCard.jsx

```javascript
import BaseCard from '@/components/common/BaseCard';
import SecondaryButton from '@/components/common/SecondaryButton';
import React from 'react';
import ReactMarkdown from 'react-markdown';

const StoryCard = ({ story }) => {
  return (
    <BaseCard className={`bg-transparent`}>
      <div className="space-y-xl">
        {story.logo ? (
          <img src={story.logo} alt={'success story'} width={50} />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded" />
        )}
        <ReactMarkdown>{story?.content || ''}</ReactMarkdown>
        <p className="text-xs">{story?.paragraph || ''}</p>
      </div>

      <SecondaryButton
        className="mt-lg w-[fit-content]"
        text={'Learn More'}
        href={'#'}
        from={'hero'}
      />
    </BaseCard>
  );
};

export default StoryCard;
```

## File: src/components/Root/singleCourse/SuccessStories.jsx

```javascript
import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import React from 'react';
import SecondaryButton from '@/components/common/SecondaryButton';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import StoryCard from './StoryCard';
import { success1, success2 } from '@/data/singleCoursePageData';

const SuccessStories = () => {
  return (
    <OuterSection
      className="w-full min-h-[600px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(/assets/success-bg.jpg)` }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0, 0, 0, ${60 / 100})` }}
        aria-hidden="true"
      ></div>

      {/* Content container */}
      <InnerSection className="z-10 text-white">
        <div className="flex items-center justify-between gap-xl w-full flex-col md:flex-row">
          <h3 className="text-3xl font-bold font-heading">Success Stories</h3>
          <div className="flex gap-lg">
            <Link
              to={'#'}
              className="flex items-center gap-2 mt-auto text-sm text-primary text-white font-heading hover:underline"
            >
              Lorem Ipsum Is very <FaArrowRight />
            </Link>
            <Link
              to={'#'}
              className="flex items-center gap-2 mt-auto text-sm text-primary text-white font-heading hover:underline"
            >
              Lorem Ipsum very <FaArrowRight />
            </Link>
          </div>
        </div>
        <div className="flex gap-xl mt-lg flex-col md:flex-row">
          <StoryCard story={success1} />
          <StoryCard story={success2} />
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default SuccessStories;
```

## File: src/components/Root/singleCourse/TabBuuton.jsx

```javascript
import { FaCheck } from 'react-icons/fa6';

const TabBuuton = ({ button, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-between w-full items-center gap-xl py-xl px-lg border-b-5 ${isActive ? 'bg-black/5  border-secondary ' : ' border-transparent'} `}
    >
      <div className="flex justify-start flex-col flex-11/12 ">
        <p
          className={`uppercase text-left pera-sm-bold ${isActive ? 'text-secondary' : 'text-primary'}`}
        >
          {button?.title}
        </p>
        <h3 className="heading-3xl uppercase w-[80%] text-left">{button?.content}</h3>
      </div>
      <div
        className={`flex-1/12 rounded-full  border-2 border-primary w-8 aspect-square flex items-center justify-center ${isActive ? 'bg-primary' : 'bg-white'}`}
      >
        {isActive && <FaCheck className="text-white" />}
      </div>
    </button>
  );
};

export default TabBuuton;
```

## File: src/components/Root/singleCourse/WhoCanEnroll.jsx

```javascript
import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import { whoEnrol } from '@/data/singleCoursePageData';
import React from 'react';
import CourseQuestionCard from './CourseQuestionCard';

const WhoCanEnroll = () => {
  return (
    <OuterSection>
      <InnerSection className="space-y-lg">
        <h1 className="uppercase heading-4xl text-center">Who Can Enrol ?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
          {whoEnrol.map((q) => (
            <CourseQuestionCard question={q} />
          ))}
        </div>
      </InnerSection>
    </OuterSection>
  );
};

export default WhoCanEnroll;
```

## File: src/components/ui/button.jsx

```javascript
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-secondary hover:text-secondary-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-secondary hover:text-secondary-foreground dark:hover:bg-secondary/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

## File: src/components/ui/card.jsx

```javascript
import * as React from 'react';

import { cn } from '@/lib/utils';

function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-md rounded-xl shadow-sm',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return <div data-slot="card-content" className={cn('px-md pb-md', className)} {...props} />;
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
```

## File: src/components/ui/pagination.jsx

```javascript
import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }) {
  return <li data-slot="pagination-item" {...props} />;
}

function PaginationLink({ className, isActive, size = 'icon', ...props }) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
```

## File: src/components/ui/skeleton.jsx

```javascript
import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-black/10 animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
```

## File: src/data/aboutPageData.js

```javascript
export const aboutKnowUs = {
  content: {
    title: 'THE FACTS & FIGURES',
    description: `
    Lorem Ipsum has been the industry's standard dummy text ever since the
    1500s, when an unknown printer took a galley of type and scrambled it to
    make a type specimen book.Lorem Ipsum has been the industry's
    standard dummy text ever since the 1500s, when an unknown printer took 
    a galley of type and scrambled it to make a type specimen book.

    Lorem Ipsum has been the industry's standard dummy text ever since the
    1500s, when an unknown printer took a galley of type and scrambled it to
    `,
    button_text: '',
    button_url: '',
  },

  stats: [
    {
      value: 1500,
      extension: '+',
      type: 'number',
      description: 'Apprentices are currently on their career journey with us',
    },
    {
      value: 1200,
      extension: '+',
      type: 'number',
      description: 'Businesses partner with us to build their future talent pipeline',
    },
    {
      value: 97,
      extension: '%',
      type: 'number',
      description: 'Of our learners successfully pass their apprenticeship',
    },
    {
      value: 220,
      extension: '+',
      type: 'number',
      description: 'Employees who make all this possible',
    },
  ],
};

export const aboutlergestProvider = {
  title: 'We’re the Largest Independent Training Provider in England',
  image: 'https://www.balticapprenticeships.com/wp-content/uploads/2023/04/DSC07856.webp', // Image path
  video: '', // Optional video URL
  additional_info: `
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  `,
  buttonText: 'Download Lorem', // Optional button text
  url: '', // Optional button URL
};

export const aboutOurValues = [
  {
    category: 'Be The Expert',
    title: 'Be The Expert',
    image: 'https://www.balticapprenticeships.com/wp-content/uploads/2023/04/DSC08137.webp',
    video: '',
    additional_info: `
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      Everything we do is built on a foundation of complete care — care for our apprentices,
      our employers, and our team.
    `,
    buttonText: '',
    url: '',
  },
  {
    category: 'Be The Customer',
    title: 'WHO WE ARE',
    image: 'https://www.balticapprenticeships.com/wp-content/uploads/2023/05/DSC07894.webp',
    video: '',
    additional_info: `
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      Everything we do is built on a foundation of complete care — care for our apprentices,
      our employers, and our team.
    `,
    buttonText: '',
    url: '',
  },
];

export const aboutWhoWe = {
  title: 'WHO WE ARE',
  image: '', // Optional image path
  video: 'https://www.youtube.com/watch?v=jKd_w6LN-5U', // Optional video URL
  additional_info: `
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    Everything we do is built on a foundation of complete care — care for our apprentices, our employers, and our team.
  `,
  buttonText: '', // Optional button text
  url: '', // Optional button URL
};
```

## File: src/data/blogPageData.js

```javascript
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export const blogImageContent = {
  title: 'The Cost of a Click',
  image: '/assets/imagecontent.jpg', // Replace with actual image path
  video: '', // Optional video URL
  additional_info: `
    Our free guide to why your people are your biggest cybersecurity vulnerability.
    Learn how a simple mistake can lead to a massive cybersecurity failure – and what you can do to reduce your risk.
  `,
  buttonText: 'Explore this site', // Optional button text
  url: '', // Optional button URL
};

export const blogData = {
  share: [
    {
      name: 'Facebook',
      icon: 'FaFacebook',
      url: 'https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=',
      color: 'text-blue-600',
    },
    {
      name: 'Twitter',
      icon: 'FaTwitter',
      url: 'https://twitter.com/intent/tweet?url=',
      text: 'Check this out!',
      color: 'text-sky-500',
    },
    {
      name: 'LinkedIn',
      icon: 'FaLinkedin',
      url: 'https://www.linkedin.com/sharing/share-offsite/?url=',
      color: 'text-blue-700',
    },
    {
      name: 'WhatsApp',
      icon: 'FaWhatsapp',
      url: 'https://api.whatsapp.com/send?text=',
      color: 'text-green-500',
    },
  ],
};
```

## File: src/data/courseData.js

```javascript
import { FaUser } from 'react-icons/fa';

// Courses data organized by category
export const coursesData = [
  {
    id: 1,
    category: 'Level 3',
    courses: [
      {
        id: 101,
        title: 'HTML & CSS Basics',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore voluptates quaerat, voluptatibus earum nobis nihil maxime voluptatem reprehenderit optio laudantium dolores deserunt vitae impedit provident fugiat, similique quas ex atque sed delectus quis? Odio cupiditate quisquam consequatur fuga recusandae quasi.',
        duration: '4 weeks',
        logo: 'https://cdn-icons-png.flaticon.com/128/478/478544.png',
      },

      {
        id: 102,
        title: 'JavaScript Essentials',
        description:
          'Dolore voluptates quaerat, voluptatibus earum nobis nihil maxime voluptatem reprehenderit optio laudantium dolores deserunt vitae impedit provident fugiat, similique quas ex atque sed delectus quis? Odio cupiditate quisquam consequatur fuga recusandae quasi.',
        duration: '5 weeks',
        logo: 'https://cdn-icons-png.flaticon.com/128/622/622397.png',
      },
      {
        id: 103,
        title: 'Responsive Design',
        description: 'Learn how to make websites look great on all devices.',
        duration: '3 weeks',
        logo: 'https://cdn-icons-png.flaticon.com/128/2642/2642651.png',
      },
      {
        id: 104,
        title: 'HTML & CSS Basics',
        description: 'Learn the fundamentals of web development using HTML & CSS.',
        duration: '4 weeks',
        logo: 'https://cdn-icons-png.flaticon.com/128/11743/11743790.png',
      },
      {
        id: 105,
        title: 'JavaScript Essentials',
        description: 'Understand core JavaScript concepts and DOM manipulation.',
        duration: '5 weeks',
        logo: 'https://cdn-icons-png.flaticon.com/128/478/478544.png',
      },
      {
        id: 106,
        title: 'Responsive Design',
        description: 'Learn how to make websites look great on all devices.',
        duration: '3 weeks',
        logo: 'https://cdn-icons-png.flaticon.com/128/622/622397.png',
      },
      {
        id: 107,
        title: 'HTML & CSS Basics',
        description: 'Learn the fundamentals of web development using HTML & CSS.',
        duration: '4 weeks',
        logo: 'https://cdn-icons-png.flaticon.com/128/2642/2642651.png',
      },
      {
        id: 108,
        title: 'JavaScript Essentials',
        description: 'Understand core JavaScript concepts and DOM manipulation.',
        duration: '5 weeks',
        logo: 'https://cdn-icons-png.flaticon.com/128/11743/11743790.png',
      },
      {
        id: 109,
        title: 'Responsive Design',
        description: 'Learn how to make websites look great on all devices.',
        duration: '3 weeks',
        logo: 'https://cdn-icons-png.flaticon.com/128/2642/2642651.png',
      },
    ],
  },
  {
    id: 2,
    category: 'Level 5',
    courses: [
      {
        id: 201,
        title: 'React JS Fundamentals',
        description: 'Learn React basics, components, props, and state management.',
        duration: '6 weeks',
        logo: 'https://cdn-icons-png.flaticon.com/128/478/478544.png',
      },
      {
        id: 202,
        title: 'Advanced CSS & Tailwind',
        description: 'Master Tailwind CSS and modern CSS techniques.',
        duration: '4 weeks',
        logo: 'https://cdn-icons-png.flaticon.com/128/622/622397.png',
      },
      {
        id: 203,
        title: 'API Integration',
        description: 'Learn to connect your frontend with REST APIs.',
        duration: '3 weeks',
        logo: 'https://cdn-icons-png.flaticon.com/128/2642/2642651.png',
      },
    ],
  },
  {
    id: 3,
    category: 'Level 6',
    courses: [
      {
        id: 301,
        title: 'Next.js & SSR',
        description: 'Learn server-side rendering and routing with Next.js.',
        duration: '6 weeks',
        logo: 'https://cdn-icons-png.flaticon.com/128/478/478544.png',
      },
      {
        id: 302,
        title: 'Full Stack Project',
        description:
          'Build a complete full-stack project using MERN stack. Build a complete full-stack project using MERN stack. Build a complete full-stack project using MERN stack.',
        duration: '8 weeks',
        logo: 'https://cdn-icons-png.flaticon.com/128/622/622397.png',
      },
      {
        id: 303,
        title: 'Freelancing Tips',
        description: 'Learn how to start freelancing and manage clients.',
        duration: '2 weeks',
        logo: 'https://cdn-icons-png.flaticon.com/128/2642/2642651.png',
      },
    ],
  },
];
```

## File: src/data/faqsPageData.js

```javascript
export const faqsData = [
  {
    category: 'Apprentice FAQs',
    qna: [
      { question: 'WHAT IS AN APPRENTICESHIP?', answer: 'Answer for WHAT IS AN APPRENTICESHIP?' },
      { question: 'WHAT PROGRAMMES ARE AVAILABLE?', answer: 'Answer for available programmes.' },
      { question: 'WHAT QUALIFICATION WILL I GET?', answer: 'Answer for qualifications.' },
      // ...other FAQs
    ],
  },
  {
    category: 'Employer FAQs',
    qna: [
      { question: 'Can I use a Data Apprenticeship to hire a new employee?', answer: 'Answer...' },
      { question: 'How are Data Apprenticeships assessed?', answer: 'Answer...' },
      // ...other FAQs
    ],
  },
  {
    category: 'Apprentice Levy FAQs',
    qna: [
      {
        question: 'HOW DO I KNOW IF MY ORGANISATION PAYS INTO THE APPRENTICESHIP LEVY?',
        answer: 'Answer...',
      },
      { question: 'HOW ARE MY APPRENTICESHIP LEVY CONTRIBUTIONS PAID?', answer: 'Answer...' },
      // ...other FAQs
    ],
  },
];
```

## File: src/data/homePageData.js

```javascript
export const homeAboutData = {
  title: 'About prime academy',
  image: 'https://www.balticapprenticeships.com/wp-content/uploads/2023/04/DSC07726.webp', // ইমেজ পাথ
  video: '',
  additional_info: `
  Prime Academy is a leading professional and IT training institute in Bangladesh, offering UK-certified, practical, and career-focused education.
  Our mission is to empower students and professionals with the skills, confidence, and global-standard knowledge needed to succeed in today’s competitive world.
  From Corporate English & IELTS to Web Development, Data Science, Digital Marketing, and Leadership Pathways, our courses are designed to bridge the gap between education and employment — helping learners unlock their potential and achieve long-term success.
  `,
  buttonText: 'Learn More',
  url: 'about',
};

export const homFeaturesData = [
  {
    id: 1,
    title: 'Fast Performance.',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse a veritatis culpa corrupti. Voluptatem praesentium ratione repudiandae perspiciatis iste! Cumque perspiciatis necessitatibus, architecto saepe eum quibusdam.',
    logo: 'https://cdn-icons-png.flaticon.com/128/478/478544.png',
  },
  {
    id: 2,
    title: 'Secure Platform',
    description: 'We prioritize the security of your data above everything else',
    logo: 'https://cdn-icons-png.flaticon.com/128/622/622397.png',
  },
  {
    id: 3,
    title: 'Easy Integration',
    description: 'Our platform is built to integrate effortlessly with your existing tools',
    logo: 'https://cdn-icons-png.flaticon.com/128/2642/2642651.png',
  },
];

export const homeImageContent = {
  title: 'Lorem Ipsum is very simply',
  image: '/assets/home-image-content.png', // Image path
  video: '', // Optional video URL (can be used inside ImageContent)
  additional_info: `
    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
    making it look like readable English. Many desktop applications use it as a placeholder.
  `,
  buttonText: 'Learn More', // Text for CTA button
  url: '', // Optional CTA link
};

// Statistics data
export const homeKhowUs = {
  content: {
    title: 'Get to know us',
    description:
      'Prime Academy is shaping Bangladesh’s future workforce with UK-certified,practical, and industry-relevant training. We work with students, professionals, and employers to deliver skills that create real opportunities, drive career growth, and strengthen businesses.',
    button_text: 'Explore Prime Academy',
    button_url: '/',
  },
  stats: [
    {
      value: 1000,
      extension: '+',
      type: 'number',
      description: 'Learners trained across Bangladesh',
    },
    {
      value: 500,
      extension: '+',
      type: 'number',
      description: 'Corporate partners supported with tailored training solutions',
    },
    {
      value: 'OUTSTANDING',
      extension: '',
      type: '',
      description: 'Ofsted rating at our last inspection in 2024',
    },
    {
      value: 'PARTNERSHIPS',
      extension: '',
      type: '',
      description: 'Collaborations with institutions in the UK, Antigua & Barbuda, and Asia',
    },
  ],
};
```

## File: src/data/singleCoursePageData.js

```javascript
export const tabs = [
  {
    id: 'left',
    title: 'Employer',
    content: 'I’m looking to train future digital talent',
  },
  {
    id: 'right',
    title: 'Apprentice',
    content: 'I’m looking to develop digital skills',
  },
];

export const singleCourseValues = [
  {
    category: 'Be The Expert',
    title: 'Be The Expert',
    image: 'https://www.balticapprenticeships.com/wp-content/uploads/2023/04/DSC08137.webp',
    video: '',
    additional_info: `
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      Everything we do is built on a foundation of complete care — care for our apprentices,
      our employers, and our team.
    `,
    buttonText: 'View More',
    url: '',
  },
  {
    category: 'Be The Customer',
    title: 'WHO WE ARE',
    image: 'https://www.balticapprenticeships.com/wp-content/uploads/2023/05/DSC07894.webp',
    video: '',
    additional_info: `
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      Everything we do is built on a foundation of complete care — care for our apprentices,
      our employers, and our team.
    `,
    buttonText: 'View More',
    url: '',
  },
];

export const whoEnrol = [
  {
    id: 'who-can-enroll',
    icon: 'https://cdn-icons-png.flaticon.com/128/476/476863.png',
    title: 'Who Can Enroll',
    description:
      'This course is ideal for students, beginners, and professionals who want to build a strong foundation in web development. Anyone with a basic understanding of computers and a passion for learning new technologies can join this program.',
  },
  {
    id: 'course-benefits',
    icon: 'https://cdn-icons-png.flaticon.com/128/560/560277.png',
    title: 'Course Benefits',
    description:
      'By enrolling in this course, you will gain hands-on experience, learn the latest web technologies, and get guidance from industry experts to build real-world projects.',
  },
];

export const courseData = {
  courses: [
    {
      id: 'accordionInputblock-14--block-timeline-1-1',
      title: 'COURSE 1',
      heading: 'Role of an IT Technician',
      description:
        'This course details the exciting role of an IT Technician and teaches the need for IT support processes and procedures. The course focuses on customer service and communication, cultural awareness and diversity, and relevant legislation.',
      active: false,
    },
    {
      id: 'accordionInputblock-14--block-timeline-2-1',
      title: 'COURSE 2',
      heading: 'IT Troubleshooting Tools & Techniques',
      description:
        'This course covers the principles of root cause problem-solving and fault diagnostics. We teach learners how to use common troubleshooting tools while working safely and in line with policies & procedures.',
      active: false,
    },
    {
      id: 'accordionInputblock-14--block-timeline-3-1',
      title: 'COURSE 3',
      heading: 'Working with Client Architecture',
      description:
        'This course ensures learners are confident working with common client device systems and identifying system hardware components. We prepare learners to install and configure operating systems and provide IT solutions in line with customer requirements.',
      active: false,
    },
    {
      id: 'accordionInputblock-14--block-timeline-4-1',
      title: 'COURSE 4',
      heading: 'Upgrading & Maintaining Client Architecture',
      description:
        'In this course, learners will master upgrading and maintaining client architecture. We teach the fundamentals of disaster recovery plans, system upgrades and updates, IT maintenance, and fault prevention.',
      active: false,
    },
    {
      id: 'accordionInputblock-14--block-timeline-5-1',
      title: 'COURSE 5',
      heading: 'Working with Network Architecture',
      description:
        'This course ensures learners can efficiently and effectively work with network architecture. The 2-day course covers network types, network addressing, and implementing network services.',
      active: false,
    },
    {
      id: 'accordionInputblock-14--block-timeline-6-1',
      title: 'COURSE 6',
      heading: 'Cloud & Virtualisation',
      description:
        'In this course, we teach the principles of cloud and cloud-based services. Our expert coaches cover the principles of server, application, and network virtualisation, alongside how to securely integrate and manage mobile devices using the cloud.',
      active: false,
    },
  ],
};

export const benefitsThisCourse = [
  {
    id: 1,
    title: 'Grow Profitability',
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png',
    description:
      'A McKinsey report suggests that organisations that embed data skills into their operations outperform their competitors by 126%.',
  },
  {
    id: 2,
    title: 'Enhance Efficiency',
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png',
    description:
      'In a survey conducted by MicroStrategy, 73% of businesses said they’ve improved operational efficiency and the speed of decision-making through data analysis.',
  },
  {
    id: 3,
    title: 'Competitive Advantage',
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
    description:
      'Harvard Business Review found that organisations that use data-driven insights for decision-making experience a 5–6% increase in productivity and a 6% increase in profitability.',
  },
  {
    id: 4,
    title: 'Increase Daily Output',
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135738.png',
    description:
      'A 2023 State of Data Literacy report found that 89% of UK leaders value basic data literacy skills as the most critical skill for their workforce’s day-to-day tasks.',
  },
  {
    id: 5,
    title: 'Reduce Risk',
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    description:
      '41% of UK respondents identified inaccurate decision-making as the number one business risk.',
  },
  {
    id: 6,
    title: 'Future-proof Your Business',
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135796.png',
    description:
      '67% of data and business leaders believe that organisations that invest in data upskilling are more likely to be recession-proof.',
  },
];

export const success1 = {
  logo: 'https://images.vexels.com/media/users/3/223246/isolated/preview/a5e1b4a04c71beac7b6d7537dd007b35-like-icon-flat.png',
  content: `
  Lorem Ipsum is simply dummy text of the printing
  Lorem Ipsum is simply dummy text of the printing
  Lorem Ipsum is simply dummy text of the printing
  Lorem Ipsum is simply

  Lorem Ipsum is simply dummy text of the printing
  simply dummy text of the printing
  Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply
  `,
  paragraph: 'Lorem Ipsum is simply dummy text of the printing',
  button_text: 'Learn More',
  button_url: '#',
};

export const success2 = {
  logo: 'https://cdn1.iconfinder.com/data/icons/navigation-ui/154/love-heart-512.png',
  content: `
  Lorem Ipsum is simply dummy text of the printing
  Lorem Ipsum is simply dummy text of the printing
  Lorem Ipsum is simply dummy text of the printing
  Lorem Ipsum is simply

  Lorem Ipsum is simply dummy text of the printing
  simply dummy text of the printing
  Lorem Ipsum is simply dummy text of the printing Lorem Ipsum is simply
  `,
  paragraph: 'Lorem Ipsum is simply dummy text of the printing',
  button_text: 'Learn More',
  button_url: '#',
};

export const singleCourseFactsAndStat = {
  content: {
    title: 'FACTS & STATISTICS',
    description:
      'Our apprenticeships are made with your future employability in mind. We help you build the sought-after digital skills that will improve your overall employability, alongside benefitting your chosen sector and helping repair critical industry issues. Don’t believe us? Let’s look at the data.',
    button_text: '',
    button_url: '',
  },

  stats: [
    {
      value: 64,
      extension: '%',
      type: 'number',
      description: 'Of people are not comfortable working with data',
    },
    {
      value: 376,
      extension: '%',
      type: 'number',
      description: 'Rise in data skills training for businesses since 2019',
    },
    {
      value: 93,
      extension: '%',
      type: 'number',
      description:
        'Of our data apprentices received a Pass or higher upon completion of their apprenticeship',
    },
    {
      value: 99,
      extension: '%',
      type: 'number',
      description:
        'Of our 2021/2022 learners confirmed they are in paid employment or further education',
    },
  ],
};
```

## File: src/index.css

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import 'tailwindcss';
@import 'tw-animate-css';

/* @custom-variant dark (&:is(.dark *)); */
body {
  font-family: 'DM Sans', sans-serif;
}

@theme {
  /* Base Theme Variables (Mobile First) */
  --color-primary: #053867;
  --color-primary-light: #243985;
  --color-secondary: #f7b922;
  --color-secondary-light: #f3ce48;
  --color-secondary-bg: #f5f5f5;
  --color-white: #ffffff;
  --color-black: #000002;

  --font-heading: 'Poppins', sans-serif;
  --width-max-w: 1480px;

  --spacing-xs: 2px;
  --spacing-sm: 6px;
  --spacing-md: 10px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;

  --text-sm: 12px;
  --text-base: 14px;
  --text-lg: 16px;
  --text-xl: 18px;
  --text-2xl: 20px;
  --text-3xl: 24px;
  --text-4xl: 28px;
  --text-5xl: 32px;

  --leading-lg: 1.7;
  --leading-xl: 1.16;
  --leading-2xl: 1.18;
  --shadow-around-sm: rgba(0, 0, 0, 0.1) 0px 0px 30px 0px;
}

/* ✅ Media Queries Outside @theme */
@media (min-width: 640px) {
  :root {
    --spacing-xs: 3px;
    --spacing-sm: 8px;
    --spacing-md: 12px;
    --spacing-lg: 18px;
    --spacing-xl: 26px;

    --text-sm: 13px;
    --text-base: 15px;
    --text-lg: 17px;
    --text-xl: 19px;
    --text-2xl: 22px;
    --text-3xl: 26px;
    --text-4xl: 32px;
    --text-5xl: 36px;
  }
}

@media (min-width: 1024px) {
  :root {
    --spacing-xs: 4px;
    --spacing-sm: 10px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;

    --text-sm: 14px;
    --text-base: 16px;
    --text-lg: 18px;
    --text-xl: 20px;
    --text-2xl: 24px;
    --text-3xl: 30px;
    --text-4xl: 36px;
    --text-5xl: 48px;
  }
}

/* class groups  */
.heading-5xl {
  @apply text-5xl font-bold font-heading;
}

.heading-4xl {
  @apply font-bold font-heading text-4xl;
}

.heading-3xl {
  @apply font-bold text-3xl font-heading text-primary;
}

.pera-sm-bold {
  @apply font-bold text-lg font-heading;
}
```

## File: src/layouts/AuthLayout.jsx

```javascript
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthLayout() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <div className="w-full flex flex-col min-h-screen">
      {/* Persistent navigation bar at the top */}
      <Navbar />

      {/* Main content area; dynamic route content is injected via <Outlet /> */}
      <main className="w-full flex-1 flex flex-col items-center overflow-x-hidden">
        <Outlet />
      </main>

      {/* Persistent footer at the bottom */}
      <Footer />
    </div>
  );
}
```

## File: src/layouts/LandingLayout.jsx

```javascript
import LandingFooter from '@/components/Root/landing/LandingFooter';
import LandingNavbar from '@/components/Root/landing/LandingNavbar';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function LandingLayout() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <div className="w-full flex flex-col min-h-screen">
      {/* Persistent navigation bar at the top */}
      <LandingNavbar />

      {/* Main content area; dynamic route content is injected via <Outlet /> */}
      <main className="w-full flex-1 flex flex-col items-center overflow-x-hidden">
        <Outlet />
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
```

## File: src/layouts/ProtectedLayout.jsx

```javascript
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedLayout() {
  const { isAuthenticated, authLoaded } = useSelector((state) => state.auth);

  if (!authLoaded) {
    return <div>Loading...</div>; // wait until redux finishes loading user
  }
  return isAuthenticated ? (
    <div className="w-full flex flex-col min-h-screen">
      {/* Persistent navigation bar at the top */}
      <Navbar />

      {/* Main content area; dynamic route content is injected via <Outlet /> */}
      <main className="w-full flex-1 flex flex-col items-center overflow-x-hidden">
        <Outlet />
      </main>

      {/* Persistent footer at the bottom */}
      <Footer />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
}
```

## File: src/layouts/PublicLayout.jsx

```javascript
/**
 * PublicLayout
 * -------------
 * - Defines the shared layout for all public-facing pages
 * - Includes a Navbar (header), main content area, and Footer
 * - Uses <Outlet /> from react-router-dom to render child routes
 * - Ensures consistent UI and responsive structure across pages
 */

import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const PublicLayout = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Persistent navigation bar at the top */}
      <Navbar />

      {/* Main content area; dynamic route content is injected via <Outlet /> */}
      <main className="w-full flex-1 flex flex-col items-center overflow-x-hidden">
        <Outlet />
      </main>

      {/* Persistent footer at the bottom */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
```

## File: src/lib/utils.js

```javascript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

## File: src/main.jsx

```javascript
/**
 * Entry point for the React application
 * -------------------------------------
 * Responsibilities:
 *  - Render the React app into the DOM
 *  - Wraps the app with essential providers (ErrorBoundary, Redux, Router)
 *  - Ensures a clean, maintainable setup for production
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';

import App from './App.jsx';
import './index.css'; // Global styles
import store from './redux/store.js';
import ErrorPage from './components/common/ErrorPage.jsx';
import { loadUserFromStorage } from './redux/auth/authSlice.js';

// Mounting point in index.html
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

store.dispatch(loadUserFromStorage());

// Render the React application
root.render(
  <ErrorBoundary FallbackComponent={ErrorPage}>
    {/* Redux Provider makes the global store accessible throughout the app */}
    <Provider store={store}>
      {/* BrowserRouter handles client-side routing */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>
);
```

## File: src/pages/Dashboard/Dashboard/Dashboard.jsx

```javascript
import PrimaryButton from '@/components/common/PrimaryButton';
import { clearAuthMessage, logout } from '@/redux/auth/authSlice';
import SwalUtils from '@/utils/sweetAlert';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const { message, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      SwalUtils.success(message);
      dispatch(clearAuthMessage());
    }
  }, [message]);

  return (
    <div className="pt-[100px]">
      <h1 className="heading-4xl">Dashboard of {user.role}</h1>
      <PrimaryButton text={`Logout`} onClick={() => dispatch(logout())} />
    </div>
  );
};

export default Dashboard;
```

## File: src/pages/Root/About/About.jsx

```javascript
/**
 * About Page Component
 * -------------------
 * - Composes multiple sections to present information about the academy
 * - Sections are imported as separate components for modularity
 * - Includes hero, values, achievements, partners, and career opportunities
 */

import AboutHero from '../../../components/Root/about/HeroSection';
import WhoWeSection from '../../../components/Root/about/WhoWeSection';
import OurValues from '../../../components/Root/about/OurValues';
import LargestProvider from '../../../components/Root/about/LargestProvider';
import PartnerSlider from '../../../components/common/PartnerSlider';
import CarrersSection from '../../../components/Root/about/CarrersSection';
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <>
      <Helmet>
        <title>Prime Academy | About</title>
        <meta
          name="description"
          content="Prime Academy - Unlock your potential with expert courses and guidance."
        />
      </Helmet>
      {/* Hero banner for About page */}
      <AboutHero />

      {/* Who we are section */}
      <WhoWeSection />

      {/* Core values of the academy */}

      <OurValues />

      {/* Largest provider showcase */}
      <LargestProvider />

      {/* Partners carousel */}
      <PartnerSlider />

      {/* Career opportunities section */}
      <CarrersSection />
    </>
  );
};

export default About;
```

## File: src/pages/Root/Blog/Blog.jsx

```javascript
/**
 * Blog Page
 * ----------
 * - Displays a single blog post page
 * - Includes Hero section, Blog content with sidebar, and a course promotion section
 * - Fully reusable template: pass data to BlogBodySection for different blog posts
 */

import SingleBlogHero from '../../../components/Root/blogPage/HeroSection';
import BlogBodySection from '../../../components/Root/blogPage/BlogBodySection';
import OurCourse from '../../../components/common/OurCourse';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchSingleBlog } from '@/redux/blogs/blogAction';
import { useDispatch, useSelector } from 'react-redux';

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleBlog(id));
  }, [dispatch, id]);

  return (
    <>
      <Helmet>
        <title>Prime Academy | Single Blog</title>
        <meta
          name="description"
          content="Prime Academy - Unlock your potential with expert courses and guidance."
        />
      </Helmet>
      {/* Hero banner for the blog */}
      <SingleBlogHero />

      {/* Blog content and sidebar */}
      <BlogBodySection />

      {/* Course promotion section */}
      <OurCourse />
    </>
  );
};

export default Blog;
```

## File: src/pages/Root/Blogs/Blogs.jsx

```javascript
/**
 * BlogPage Component
 * ------------------
 * - Displays the main blog listing page
 * - Sections include:
 *    1. Hero banner
 *    2. Top filter bar
 *    3. Grid/list of blog cards
 *    4. Pagination controls
 *    5. Upper footer or CTA section
 * - Fully modular: each section is a separate component
 */

import BlogHero from '../../../components/Root/blogs/HeroSection';
import BlogCardsSection from '../../../components/Root/blogs/BlogCardsSection';
import UpperFooterBlogs from '../../../components/Root/blogs/UpperFooterSection';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogCategories } from '@/redux/blogs/blogAction';
import PaginationSection from '@/components/common/PaginationSection';

const BlogPage = () => {
  const { blogPagination, pageSize, error } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogCategories());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Prime Academy | Blogs</title>
        <meta name="description" content="Prime Academy - All blogs" />
      </Helmet>
      {/* Hero banner for blog listing */}
      <BlogHero />

      {/* Blog cards listing */}
      <BlogCardsSection />

      {/* Pagination controls for blog list */}
      <PaginationSection pagination={blogPagination} pageSize={pageSize} error={error} />

      {/* Optional upper footer or CTA section */}
      <UpperFooterBlogs />
    </>
  );
};

export default BlogPage;
```

## File: src/pages/Root/Contact/Contact.jsx

```javascript
import { Helmet } from 'react-helmet';

import ContactHero from '../../../components/Root/contact/HeroSection';
import FormSection from '../../../components/Root/contact/FormSection';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Prime Academy | Contact Us</title>
        <meta name="description" content="Prime Academy - Contact Prime academy support" />
      </Helmet>
      <ContactHero />
      <FormSection />
    </>
  );
};

export default Contact;
```

## File: src/pages/Root/Courses/Courses.jsx

```javascript
/**
 * CoursesPage Component
 * ------------------
 * - Displays the main course listing page
 * - Sections include:
 *    1. Hero banner
 *    2. Top filter bar
 *    3. Grid/list of course cards
 *    4. Pagination controls
 *    5. Upper footer or CTA section
 * - Fully modular: each section is a separate component
 */

import CourseHero from '../../../components/Root/courses/HeroSection';
import UpperFooterCourses from '../../../components/Root/courses/UpperFooterSection';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories } from '@/redux/courses/courseAction';
import CourseCardsSection from '@/components/Root/courses/CourseCardsSection';
import PaginationSection from '@/components/common/PaginationSection';

const CoursesPage = () => {
  const { coursePagination, pageSize, error } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourseCategories());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Prime Academy | Courses</title>
        <meta name="description" content="Prime Academy - All Course" />
      </Helmet>
      {/* Hero banner for course listing */}
      <CourseHero />

      {/* Course cards listing */}
      <CourseCardsSection />

      {/* Pagination controls for course list */}
      <PaginationSection pagination={coursePagination} pageSize={pageSize} error={error} />

      {/* Optional upper footer or CTA section */}
      <UpperFooterCourses />
    </>
  );
};

export default CoursesPage;
```

## File: src/pages/Root/FAQs/FAQs.jsx

```javascript
/**
 * FAQs Page
 * ----------
 * - Renders the Frequently Asked Questions page.
 * - Includes a hero section, FAQ accordion sections, and a footer CTA.
 */

import { Helmet } from 'react-helmet';

import FAQsHero from '../../../components/Root/faqs/HeroSection';
import FaqsSections from '../../../components/Root/faqs/FaqsSections';
import UpperFooterFaq from '../../../components/Root/faqs/UpperFooterSection';

const FAQs = () => {
  return (
    <>
      <Helmet>
        <title>Prime Academy | FAQs</title>
        <meta name="description" content="Prime Academy - Frequently ask question and answer" />
      </Helmet>
      {/* Hero / Banner Section */}
      <FAQsHero />

      {/* FAQ Accordion Section */}
      <FaqsSections />

      {/* Call-to-Action Footer Section */}
      <UpperFooterFaq />
    </>
  );
};

export default FAQs;
```

## File: src/pages/Root/Home/Home.jsx

```javascript
/**
 * HomePage Component
 * -----------------
 * - Serves as the main landing page of the website
 * - Composes multiple sections to create the full homepage experience
 * - Sections are imported as separate components for modularity and maintainability
 */
import { Helmet } from 'react-helmet';

import HomeHero from '../../../components/Root/home/HeroSection';
import FeaturesSection from '../../../components/Root/home/FeaturesSection';
import AboutPrimeAcademy from '../../../components/Root/home/AboutPrimeAcademy';
import KnowUs from '../../../components/Root/home/KnowUs';
import OurBlogs from '../../../components/Root/home/OurBlogs';
import ImageContentSection from '../../../components/Root/home/ImageContentSection';
import OurCourse from '../../../components/common/OurCourse';
import PartnerSlider from '../../../components/common/PartnerSlider';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Prime Academy</title>
        <meta
          name="description"
          content="Prime Academy - Unlock your potential with expert courses and guidance."
        />
      </Helmet>
      {/* Hero banner with CTA */}
      <HomeHero />

      {/* Courses showcase */}
      <OurCourse />

      {/* Partner logos carousel */}
      <PartnerSlider />

      {/* Image content section with optional video */}
      <ImageContentSection />

      {/* Key features of the academy */}
      <FeaturesSection />

      {/* About Prime Academy section */}
      <AboutPrimeAcademy />

      {/* Statistics and achievements */}
      <KnowUs />

      {/* Latest blog posts */}
      <OurBlogs />
    </>
  );
};

export default HomePage;
```

## File: src/pages/Root/Landing/Landing.jsx

```javascript
import InnerSection from '@/components/common/InnerSection';
import OuterSection from '@/components/common/OuterSection';
import PrimaryButton from '@/components/common/PrimaryButton';
import SecondaryButton from '@/components/common/SecondaryButton';
import React, { useMemo, useState } from 'react';

export default function LandingPage() {
  const syllabus = useMemo(
    () => [
      {
        title: 'Module 1: Introduction to AI',
        bullets: ['Course Overview + AI Basics', 'AI vs Automation vs ML', 'Real-life examples'],
        tag: '2 Classes',
      },
      {
        title: 'Module 2: AI for Personal Productivity',
        bullets: [
          'Writing & Communication (emails, blogs, resumes)',
          'Time & Task Management, Notion + AI',
          'Mini Project: Weekly Planner',
        ],
        tag: '4 Classes',
      },
      {
        title: 'Module 3: AI for Office & Business',
        bullets: [
          'Docs/Slides/Reports automation',
          'Sheets analysis + dashboards',
          'Marketing content + chat support',
        ],
        tag: '6 Classes',
      },
      {
        title: 'Module 4: AI Creativity & Advanced Tools',
        bullets: ['Image, Logo, Poster (DALL·E/MJ)', 'Voice + Video creation'],
        tag: '2 Classes',
      },
      {
        title: 'Module 5: Ethics & the Future of AI',
        bullets: ['Responsible AI, privacy, bias', 'Career planning + final presentation'],
        tag: '2 Classes',
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      { q: 'How long is the course?', a: '2 months · 16 live online classes · 2 hours each.' },
      {
        q: 'Do I need coding experience?',
        a: 'No. It’s designed for beginners and non-technical learners.',
      },
      {
        q: 'Will I get a certificate?',
        a: 'Yes, an official certificate upon successful completion.',
      },
      {
        q: 'Can I pay in installments?',
        a: 'Yes, you can pay a portion during registration and the rest later.',
      },
      {
        q: 'Are sessions recorded?',
        a: 'All live classes are recorded and shared for replay anytime.',
      },
    ],
    []
  );

  const [openFaq, setOpenFaq] = useState(0);
  const [openModule, setOpenModule] = useState(0);

  return (
    <>
      {/* Hero */}
      <OuterSection
        className="relative pt-[40px] bg-cover bg-center"
        style={{ backgroundImage: `url(https://codersfly.xyz/test-site/img/hero-1.jpg)` }}
      >
        <div className="absolute left-0 top-0 w-full h-full bg-black/50 backdrop-blur-sm" />
        <InnerSection className="z-1 grid w-full grid-cols-1 gap-10 md:grid-cols-[1.3fr,0.7fr]">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center rounded-full bg-secondary/20 px-3 py-1 text-[12px] font-extrabold text-secondary ring-1 ring-amber-200">
              2 Months · 16 Live Classes · Online
            </div>

            <h1 className="text-5xl text-white font-extrabold leading-tight tracking-tight">
              The World is changing. The way we work is changing. Tomorrow, AI will do half of
              today’s tasks. The question is—are you ready?
            </h1>
            <p className="text-lg font-semibold text-secondary">
              Tomorrow, AI will do half of today’s tasks. Are you ready?
            </p>
            <p className="max-w-[65ch] text-slate-600 text-white/50">
              Imagine—AI writes emails, prepares study notes, analyzes data, designs slides,
              schedules meetings, and creates social content in a click. That’s{' '}
              <strong>AI for Personal & Official Uses</strong>.
            </p>

            <div className="flex flex-wrap gap-3">
              <PrimaryButton from="hero" text="Enroll Now" href="#enroll" />
              <SecondaryButton from="hero" text="Watch Course Preview" href="#preview" />
            </div>

            {/* Social proof bar */}
            <div className="bg-black/20 backdrop-blur-lg border border-primary flex flex-wrap items-center gap-4 rounded-xl px-4 py-3 shadow-around-sm ring-1 ring-slate-200">
              <span className="text-white/50 inline-flex items-center gap-2 text-sm">
                <span className="inline-block size-2 rounded-full bg-emerald-500" />
                Live cohorts with project reviews
              </span>
              <span className="inline-block h-4 w-px bg-slate-200" />
              <span className="text-white/50 text-sm">
                Recordings included · Certificate awarded
              </span>
              <span className="inline-block h-4 w-px bg-slate-200" />
              <span className="text-white/50 text-sm">Beginner friendly · No coding required</span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat num="500+" label="Learners" />
              <Stat num="99%" label="Satisfaction" />
              <Stat num="16" label="Live Classes" />
              <Stat num="3×" label="Productivity" />
            </div>
          </div>
        </InnerSection>
      </OuterSection>

      {/* Price card */}
      <OuterSection>
        <InnerSection>
          <div id="pricing">
            <div className="rounded-2xl bg-white p-5 shadow-around-sm ring-1 ring-slate-200">
              <div className="font-extrabold">Course Fee & Offer</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-slate-400 line-through">৳ 10,000</span>
                <span className="text-3xl font-black text-amber-700">৳ 4,000</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Special introductory price for the first 20 learners.
              </p>
              <a
                href="#enroll"
                className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-lg bg-secondary px-3 font-extrabold text-amber-950 shadow-around-sm transition hover:brightness-105"
              >
                Enroll Now
              </a>

              <div className="mt-4 rounded-xl bg-amber-50 p-3 ring-1 ring-amber-100">
                <div className="text-xs font-extrabold text-amber-900">Offer ends in</div>
                <div className="mt-2 grid grid-cols-3 gap-3 text-center">
                  <Countdown num="00" label="Days" />
                  <Countdown num="00" label="Hours" />
                  <Countdown num="00" label="Minutes" />
                </div>
              </div>

              <ul className="mt-3 grid gap-2 text-sm text-slate-600">
                <li className="before:mr-2 before:text-amber-600 before:content-['✔']">
                  Live classes + recordings
                </li>
                <li className="before:mr-2 before:text-amber-600 before:content-['✔']">
                  Hands-on projects
                </li>
                <li className="before:mr-2 before:text-amber-600 before:content-['✔']">
                  Certificate on completion
                </li>
              </ul>
            </div>
          </div>
        </InnerSection>
      </OuterSection>

      {/* What you'll learn */}
      <OuterSection id="about" className="bg-white">
        <InnerSection className="w-full">
          <h2 className="text-[28px] font-extrabold tracking-tight">What will you learn?</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Card title="AI Tools" items={['ChatGPT', 'Gemini', 'Claude', 'Copilot']} />
            <Card
              title="Prompt Writing & Office Automation"
              items={['Docs/Sheets/Slides', 'Google Workspace', 'Email & Reports']}
            />
            <Card
              title="Creative + Data"
              items={['Image · Video · Voice', 'Data analysis & reporting']}
            />
          </div>
        </InnerSection>
      </OuterSection>

      {/* Why choose us */}
      <OuterSection id="why" className="bg-secondary/20">
        <InnerSection className="w-full">
          <h2 className="text-[28px] font-extrabold tracking-tight">Why Choose Us</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <IconCard
              title="Industry-Aligned"
              desc="Curriculum mapped to current tools & workflows used in teams."
            />
            <IconCard
              title="Project-Based"
              desc="Hands-on tasks, mentor reviews, and portfolio-ready work."
            />
            <IconCard
              title="Affordable"
              desc="Clear pricing with limited-time offers and installment options."
            />
            <IconCard
              title="Live + Support"
              desc="Live Q&A, recordings, and ongoing community support."
            />
            <IconCard
              title="Career Support"
              desc="Interview prep, portfolio guidance, and playbooks."
            />
            <IconCard
              title="High Satisfaction"
              desc="99% learner satisfaction backed by outcomes."
            />
          </div>
        </InnerSection>
      </OuterSection>

      {/* Syllabus */}
      <OuterSection id="syllabus" className="bg-white">
        <InnerSection className="w-full">
          <h2 className="text-[28px] font-extrabold tracking-tight">Syllabus (Full)</h2>
          <p className="mt-1 text-sm text-slate-600">
            Duration: 2 months · 16 classes · 2 hours each
          </p>
          <div className="mt-4 grid gap-3">
            {syllabus.map((m, idx) => (
              <AccordionItem
                key={m.title}
                open={openModule === idx}
                onToggle={() => setOpenModule(openModule === idx ? null : idx)}
                title={m.title}
                tag={m.tag}
              >
                <ul className="grid gap-2 text-slate-600">
                  {m.bullets.map((b) => (
                    <li key={b} className="before:mr-2 before:text-amber-600 before:content-['•']">
                      {b}
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            ))}
          </div>
        </InnerSection>
      </OuterSection>

      {/* Instructor */}
      <OuterSection id="instructor" className="bg-white">
        <InnerSection className="w-full">
          <div className="grid gap-4 rounded-2xl bg-white p-5 shadow-around-sm ring-1 ring-slate-200 md:grid-cols-[120px,1fr]">
            <div className="h-[120px] w-[120px] rounded-xl bg-[linear-gradient(135deg,rgba(242,201,76,.25),rgba(88,118,255,.25))]" />
            <div>
              <h3 className="text-xl font-extrabold">J. R. Polok</h3>
              <p className="mt-1 text-sm text-slate-600">
                AI & Automation Specialist · 4+ yrs · Enterprise Integrations
              </p>
              <p className="mt-2 text-slate-600">
                Has helped organizations deploy practical AI—covering automation, content, and data
                workflows. Teaching is hands-on and outcome-driven.
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-600">
                <span>150+ learners</span>
                <span>99% satisfaction</span>
                <span>20+ projects mentored</span>
              </div>
              <div className="mt-3 flex gap-3">
                <a
                  href="#enroll"
                  className="inline-flex h-10 items-center rounded-lg bg-secondary px-4 font-extrabold text-amber-950 shadow-around-sm transition hover:brightness-105"
                >
                  Enroll Now
                </a>
                <a
                  href="#preview"
                  className="inline-flex h-10 items-center rounded-lg border border-slate-200 bg-white px-4 font-bold text-slate-800 shadow-around-sm transition hover:bg-slate-50"
                >
                  Watch Preview
                </a>
              </div>
            </div>
          </div>
        </InnerSection>
      </OuterSection>

      {/* Testimonials */}
      <OuterSection className="">
        <InnerSection className="z-1 mx-auto w-full">
          <h2 className="text-[28px] font-extrabold tracking-tight">What learners say</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Testimonial
              name="Shamim Ahmed"
              role="Working Professional"
              quote="This AI course made my office work incredibly faster. Now I prepare reports in just five minutes!"
            />
            <Testimonial
              name="Nusrat Jahan"
              role="Freelancer"
              quote="The Prompt Writing module was outstanding. I can now get AI to do exactly what I want."
            />
          </div>
        </InnerSection>
      </OuterSection>

      {/* Video */}
      <OuterSection className="bg-white">
        <InnerSection>
          <div className="rounded-2xl bg-white p-2 shadow-around-sm ring-1 ring-slate-200">
            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <iframe
                src="https://www.youtube-nocookie.com/embed/uWq4JU3GQkI?controls=0&modestbranding=1&rel=0&showinfo=0"
                title="AI for Personal and Official Uses"
                className="h-full w-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </InnerSection>
      </OuterSection>

      {/* Enroll */}
      <OuterSection id="enroll" className="bg-amber-50/60">
        <InnerSection className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-2xl bg-white p-6 shadow-around-sm ring-1 ring-slate-200">
            <h2 className="text-[28px] font-extrabold tracking-tight">
              Enroll Now (Offer Price: ৳ 4,000)
            </h2>
            <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full Name">
                  <input
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-800 outline-none placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                    placeholder="Your name"
                    required
                  />
                </Field>
                <Field label="Mobile Number">
                  <input
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-800 outline-none placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                    placeholder="+880..."
                    required
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-800 outline-none placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Profession">
                  <select className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-800 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                    <option>Student</option>
                    <option>Working Professional</option>
                    <option>Freelancer</option>
                    <option>Entrepreneur</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field label="Preferred Schedule">
                  <select className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-800 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                    <option>Weekend (Fri–Sat)</option>
                    <option>Weekday (Mon–Wed)</option>
                    <option>Evening (8–10 PM)</option>
                  </select>
                </Field>
                <Field label="Contact Time">
                  <select className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-800 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                    <option>Morning (9–12)</option>
                    <option>Afternoon (12–4)</option>
                    <option>Evening (4–8)</option>
                    <option>Night (After 8 PM)</option>
                    <option>Weekend Anytime (Flexible)</option>
                  </select>
                </Field>
                <Field label="AI Usage Frequency">
                  <select className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-800 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100">
                    <option>Never</option>
                    <option>Moderately</option>
                    <option>Frequently</option>
                    <option>Always</option>
                  </select>
                </Field>
                <div className="md:col-span-2">
                  <label className="grid gap-1 text-sm">
                    <span className="font-extrabold text-slate-600">Message</span>
                    <textarea
                      rows={4}
                      className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-800 outline-none placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                      placeholder="Anything we should know?"
                    />
                  </label>
                </div>
                <label className="md:col-span-2 flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" defaultChecked className="size-4 accent-secondary" />
                  <span>I agree to be contacted via phone/email.</span>
                </label>
              </div>
              <button
                className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-lg bg-secondary font-extrabold text-amber-950 shadow-around-sm transition hover:brightness-105"
                type="submit"
              >
                Submit Form
              </button>
              <p className="mt-2 text-xs text-slate-600">
                Data Security: Your info will only be used for course-related communication.
              </p>
            </form>
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl shadow-around-sm p-4 ring-slate-200 ring-1 bg-white">
              <h3 className="text-lg font-extrabold">Contact</h3>
              <p className="mt-2 text-sm text-black/50">
                <strong className="text-black">Address:</strong> Suite 5040, Lift 5, Shimanto
                Shambhar, BGB Gate, Road 02, Dhaka, Bangladesh
              </p>
              <p className="mt-1 text-sm text-black/50">
                <strong className="text-black">Phone:</strong> +880 1300 290492
              </p>
              <p className="mt-1 text-sm text-black/50">
                <strong className="text-black">Website:</strong>{' '}
                <a
                  className="text-secondary hover:underline"
                  href="https://www.primeacademy.org"
                  target="_blank"
                  rel="noreferrer"
                >
                  primeacademy.org
                </a>
              </p>
            </div>

            <div className="rounded-2xl shadow-around-sm p-4 ring-slate-200 ring-1 bg-white">
              <h4 className="font-extrabold">Included</h4>
              <ul className="mt-2 grid gap-2 text-sm text-black/50">
                <li className="before:mr-2 before:text-secondary before:content-['✔']">
                  Live classes + recordings
                </li>
                <li className="before:mr-2 before:text-secondary before:content-['✔']">
                  Hands-on projects & reviews
                </li>
                <li className="before:mr-2 before:text-secondary before:content-['✔']">
                  Certificate on completion
                </li>
              </ul>
            </div>

            <div className="rounded-2xl shadow-around-sm shadow-lg p-4 ring-slate-200 ring-1 bg-white">
              <h4 className="font-extrabold">Outcomes</h4>
              <ul className="mt-2 grid gap-2 text-sm text-black/50">
                <li className="before:mr-2 before:text-secondary before:content-['•']">
                  Automate office and study tasks
                </li>
                <li className="before:mr-2 before:text-secondary before:content-['•']">
                  Create reports, content, and presentations
                </li>
                <li className="before:mr-2 before:text-secondary before:content-['•']">
                  Offer AI-supported freelance services
                </li>
              </ul>
            </div>
          </div>
        </InnerSection>
      </OuterSection>

      {/* FAQ */}
      <OuterSection className="bg-white">
        <InnerSection className="w-full">
          <h2 className="text-[28px] font-extrabold tracking-tight">FAQ</h2>
          <div className="mt-4 grid gap-3">
            {faqs.map((f, idx) => (
              <AccordionItem
                key={f.q}
                open={openFaq === idx}
                onToggle={() => setOpenFaq(openFaq === idx ? null : idx)}
                title={f.q}
              >
                <p className="text-sm text-slate-600">{f.a}</p>
              </AccordionItem>
            ))}
          </div>
        </InnerSection>
      </OuterSection>
    </>
  );
}

/* ——— Reusable pieces ——— */

function Stat({ num, label }) {
  return (
    <div className="bg-black/20 backdrop-blur-lg border border-primary rounded-xl p-4 text-center shadow-around-sm ring-1 ring-slate-200">
      <div className="text-xl text-white">{num}</div>
      <div className="text-[12px] text-white/50">{label}</div>
    </div>
  );
}

function Countdown({ num, label }) {
  return (
    <div>
      <strong className="block text-xl text-amber-900">{num}</strong>
      <span className="text-[11px] text-amber-900/70">{label}</span>
    </div>
  );
}

function Card({ title, items }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-around-sm ring-1 ring-slate-200">
      <h3 className="text-lg font-extrabold">{title}</h3>
      <ul className="mt-2 grid gap-2 text-sm text-slate-600">
        {items.map((i) => (
          <li key={i} className="before:mr-2 before:text-amber-600 before:content-['•']">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function IconCard({ title, desc }) {
  return (
    <div className="grid grid-cols-[44px,1fr] items-start gap-3 rounded-2xl bg-white p-5 shadow-around-sm ring-1 ring-slate-200">
      <div className="grid h-11 w-11 place-items-center rounded-lg bg-amber-100 font-black text-amber-700 ring-1 ring-amber-200">
        ★
      </div>
      <div>
        <h3 className="text-lg font-extrabold">{title}</h3>
        <p className="text-sm text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

function Testimonial({ name, role, quote }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-around-sm ring-1 ring-slate-200">
      <blockquote className="font-semibold">“{quote}”</blockquote>
      <div className="mt-3 grid grid-cols-[40px,1fr] items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-[linear-gradient(135deg,rgba(242,201,76,.35),rgba(88,118,255,.25))]" />
        <div>
          <div className="font-bold">{name}</div>
          <div className="text-xs text-slate-600">{role}</div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-extrabold text-slate-600">{label}</span>
      {children}
    </label>
  );
}

function AccordionItem(props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-around-sm ring-1 ring-slate-200">
      <button
        type="button"
        onClick={props.onToggle}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="font-extrabold">{props.title}</span>
          {props.tag ? (
            <span className="inline-flex h-6 items-center rounded-full bg-amber-50 px-2 text-xs text-amber-900 ring-1 ring-amber-200">
              {props.tag}
            </span>
          ) : null}
        </div>
        <span className="grid h-7 w-7 place-items-center rounded-md bg-slate-50 font-black ring-1 ring-slate-200">
          {props.open ? '–' : '+'}
        </span>
      </button>
      <div className={props.open ? 'block px-4 pb-4' : 'hidden px-4 pb-4'}>{props.children}</div>
    </div>
  );
}
```

## File: src/pages/Root/LoginRole/LoginRole.jsx

```javascript
import { FaBook, FaGraduationCap, FaUsers } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContentCard from '@/components/Root/login/ContentCard';
import { RoleButton } from '@/components/Root/login/RoleButton';
import { loginUser } from '@/redux/auth/authAction';
import PrimaryButton from '@/components/common/PrimaryButton';
import { clearAuthError } from '@/redux/auth/authSlice';
import SwalUtils from '@/utils/sweetAlert';

export default function LoginRole() {
  const { error, isAuthenticated, loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) return SwalUtils.warning('Enter Your Email!');
    if (!password) return SwalUtils.warning('Enter Your Password');
    if (!role) return SwalUtils.warning('Select Your Role');

    // Dispatch login async
    dispatch(loginUser({ email, password, role }));
  };

  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearAuthError());
    }
  }, [error]);
  // Navigate when login is successful
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated]);

  return (
    <div className="container mx-auto md:p-6 p-2 flex flex-col md:flex-row gap-20 justify-center items-center min-h-screen">
      {/* Left side content cards */}
      <div className="flex-1 max-w-[550px] hidden lg:flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-3">
          <img src="/assets/prime-academy-logo-full-dark.png" width={180} alt="Prime Academy" />
          <h1 className="text-3xl font-bold mt-4">Prime Academy</h1>
          <p className="text-gray-600 w-100 text-center">
            Empowering education through innovative learning management
          </p>
        </div>
        <div className="flex gap-5">
          <ContentCard
            icon={<FaBook />}
            heading="Interactive Course"
            content="Engaging multimedia content"
          />
          <ContentCard
            icon={<FaUsers />}
            heading="Collaborative Learning"
            content="Learn together efficiently"
          />
        </div>
      </div>

      {/* Right side login form */}
      <div className="flex-1 max-w-[450px] shadow-around-sm bg-white p-6 rounded-lg flex flex-col items-start justify-center gap-3 md:w-1/3">
        <h1 className="text-black font-bold text-3xl text-center w-full">Welcome Back</h1>
        <p className="text-black/50 text-base w-full text-center">
          Sign in to access your learning dashboard
        </p>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-3 mt-3">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <PrimaryButton
            className="mt-xl"
            disabled={loading}
            type="submit"
            text={loading ? 'Signing in...' : 'Sign in'}
          />
        </form>

        <div className=" w-full flex justify-center items-center gap-3 mt-4 ">
          <hr className="flex-1 text-black/50" />
          <p className="text-black/50">Select Role</p>
          <hr className="flex-1 text-black/50" />
        </div>

        <div className="flex flex-wrap gap-3 w-full mt-4">
          {[
            { icon: <FaGraduationCap className="text-lg text-blue-500" />, role: 'Admin' },
            { icon: <FaBook className="text-lg text-green-500" />, role: 'Teacher' },
            { icon: <FaUsers className="text-lg text-orange-400" />, role: 'Account' },
            { icon: <FaUsers className="text-lg text-orange-400" />, role: 'Stuff' },
          ].map((item, index) => (
            <RoleButton
              key={index}
              role={item.role.toLowerCase()}
              text={item.role}
              icon={item.icon}
              setRole={setRole}
              activeRole={role}
            />
          ))}
        </div>

        <p className="text-black/50 text-base w-full text-center mt-2">
          You can't login without selecting you own role
        </p>
      </div>
    </div>
  );
}
```

## File: src/pages/Root/LoginStudent/LoginStudent.jsx

```javascript
import { FaBook, FaUsers } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContentCard from '@/components/Root/login/ContentCard';
import { loginUser } from '@/redux/auth/authAction';
import PrimaryButton from '@/components/common/PrimaryButton';
import { clearAuthError } from '@/redux/auth/authSlice';
import SwalUtils from '@/utils/sweetAlert';

export default function LoginStudent() {
  const { error, isAuthenticated, loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) return SwalUtils.warning('Enter Your Email!');
    if (!password) return SwalUtils.warning('Enter Your Password');

    // Dispatch login async
    dispatch(loginUser({ email, password, role: 'student' }));
  };

  useEffect(() => {
    if (error) {
      SwalUtils.error(error);
      dispatch(clearAuthError());
    }
  }, [error]);

  // Navigate when login is successful
  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated]);

  return (
    <div className="container mx-auto md:p-6 p-2 flex flex-col md:flex-row gap-20 justify-center items-center min-h-screen">
      {/* Left side content cards */}
      <div className="flex-1 max-w-[550px] hidden lg:flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-3">
          <img src="/assets/prime-academy-logo-full-dark.png" width={180} alt="Prime Academy" />
          <h1 className="text-3xl font-bold mt-4">Prime Academy</h1>
          <p className="text-gray-600 w-100 text-center">
            Empowering education through innovative learning management
          </p>
        </div>
        <div className="flex gap-5">
          <ContentCard
            icon={<FaBook />}
            heading="Interactive Course"
            content="Engaging multimedia content"
          />
          <ContentCard
            icon={<FaUsers />}
            heading="Collaborative Learning"
            content="Learn together efficiently"
          />
        </div>
      </div>

      {/* Right side login form */}
      <div className="flex-1 max-w-[450px] shadow-around-sm bg-white p-6 rounded-lg flex flex-col items-start justify-center gap-3 md:w-1/3">
        <h1 className="text-black font-bold text-3xl text-center w-full">Welcome Back</h1>
        <p className="text-black/50 text-base w-full text-center">
          Sign in to access your learning dashboard
        </p>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-3 mt-3">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <PrimaryButton
            className="mt-xl"
            disabled={loading}
            type="submit"
            text={loading ? 'Signing in...' : 'Sign in'}
          />
        </form>

        <p className="text-black/50 text-base w-full text-center mt-2">
          Don't have an account?{' '}
          <a className="text-primary hover:underline" href="/register">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
```

## File: src/pages/Root/Privacy Policy/PrivacyPolicy.jsx

```javascript
import { Helmet } from 'react-helmet';
import PrivacyContent from '../../../components/Root/privacypolicy/PrivacyContent';
import PrivacyPolicyHero from '../../../components/Root/privacypolicy/PrivacyPolicyHero';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Prime Academy</title>
        <meta
          name="description"
          content="Read Prime Academy's Privacy Policy to understand how we collect, use, and protect your personal information."
        />
      </Helmet>
      <PrivacyPolicyHero />
      <PrivacyContent />
    </>
  );
};

export default PrivacyPolicy;
```

## File: src/pages/Root/refund/RefundPolicy.jsx

```javascript
import RefundPolicyHero from '../../../components/Root/refundpolicy/RefundPolicyHero';
import RefundContent from '../../../components/Root/refundpolicy/RefundContent';
import { Helmet } from 'react-helmet';

const RefundPolicy = () => {
  return (
    <>
      {/* Helmet for SEO */}
      <Helmet>
        <title>Refund Policy | YourSiteName</title>
        <meta
          name="description"
          content="Read our refund policy to understand the terms and conditions regarding returns, cancellations, and refunds."
        />
      </Helmet>

      {/* Page Content */}
      <RefundPolicyHero />
      <RefundContent />
    </>
  );
};

export default RefundPolicy;
```

## File: src/pages/Root/singleCourse/SingleCourse.jsx

```javascript
// React Helmet for dynamic page title and meta tags
import { Helmet } from 'react-helmet';
// Importing the SingleCourseHero component (main hero section for the course page)
import SingleCourseHero from '@/components/Root/singleCourse/SingleCourseHero';
import SingleCourseTab from '../../../components/Root/singleCourse/SingleCourseTab';
import { useState } from 'react';
import LeftSideContent from '@/components/Root/singleCourse/LeftSideContent/LeftSideContent';
import RightSideContent from '@/components/Root/singleCourse/RightSideContent/RightSideContent';
// SingleCourse page component
const SingleCourse = () => {
  // tab handel state
  const [openTab, setOpenTab] = useState('left');

  return (
    <>
      {/* Helmet helps to manage the document head dynamically */}
      <Helmet>
        <title>Single Course | Learn with Rahad</title>
        <meta
          name="description"
          content="Explore detailed course content, modules, and learning outcomes in this single course page."
        />
      </Helmet>
      {/*  Hero section for single course page */}
      <SingleCourseHero />
      {/* Tab section click data change */}
      <SingleCourseTab openTab={openTab} setOpenTab={setOpenTab} />
      {openTab === 'left' && <LeftSideContent />}
      {openTab === 'right' && <RightSideContent />}
    </>
  );
};

// ✅ Exporting component as default
export default SingleCourse;
```

## File: src/redux/auth/authAction.js

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// 🔹 Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    let route;
    if (credentials.role == 'student') {
      route = '/api/students/login/';
    } else if (credentials.role == 'teacher') {
      route = '/api/teachers/login/';
    } else if (credentials.role == 'admin') {
      route = '/api/admin/login/';
    } else if (credentials.role == 'stuff') {
      route = '/api/staff/login/';
    }

    try {
      const res = await api.post(route, credentials);
      return res.data; // success
    } catch (err) {
      // capture API error message
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data); // pass backend error
      } else {
        return rejectWithValue(err.message); // fallback
      }
    }
  }
);

// 🔹 Refresh Token
export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (refreshToken) => {
    const res = await api.post('/api/token/refresh/', { refreshToken });
    return res.data;
  }
);
```

## File: src/redux/auth/authSlice.js

```javascript
import { createSlice } from '@reduxjs/toolkit';
import { loginUser, refreshAccessToken } from './authAction';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  authLoaded: false,
  loading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth');
    },
    setCredentials: (state, { payload }) => {
      const { user, accessToken, refreshToken } = payload;
      state.user = user;
      if (accessToken) state.accessToken = accessToken;
      if (refreshToken) state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      localStorage.setItem('auth', JSON.stringify({ user, accessToken, refreshToken }));
    },
    loadUserFromStorage: (state) => {
      const auth = JSON.parse(localStorage.getItem('auth'));
      if (auth?.accessToken) {
        state.user = auth.user;
        state.accessToken = auth.accessToken;
        state.refreshToken = auth.refreshToken;
        state.isAuthenticated = true;
      }
      state.authLoaded = true;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    clearAuthMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = payload.data.user;
        state.accessToken = payload.data.tokens.access;
        state.refreshToken = payload.data.tokens.refresh;
        state.message = 'Logged In SuccessFull!';
        localStorage.setItem(
          'auth',
          JSON.stringify({
            user: payload.data.user,
            accessToken: payload.data.tokens.access,
            refreshToken: payload.data.tokens.refresh,
          })
        );
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = payload.message;
      })
      .addCase(refreshAccessToken.fulfilled, (state, { payload }) => {
        state.accessToken = payload.access;
        state.refreshToken = payload.refresh;
        const auth = JSON.parse(localStorage.getItem('auth'));
        localStorage.setItem(
          'auth',
          JSON.stringify({ ...auth, accessToken: payload.access, refreshToken: payload.refresh })
        );
      });
  },
});

export const { logout, setCredentials, loadUserFromStorage, clearAuthError, clearAuthMessage } =
  authSlice.actions;
export default authSlice.reducer;
```

## File: src/redux/blogs/blogAction.js

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBlogCategories = createAsyncThunk(
  'blog/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog-categories/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async (
    { category = null, page = 1, page_size = 10, search = null, order = null },
    { rejectWithValue }
  ) => {
    try {
      const categoryParam = category ? `&category=${category}` : '';
      const searchParam = search ? `&search=${search}` : '';
      const orderParams = order ? `&ordering=${order}` : '';
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blogs/?page=${page}&page_size=${page_size}&status=published${categoryParam}${searchParam}${orderParams}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchLatestBlogs = createAsyncThunk(
  'blog/fetchLatestBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs/latest/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchSingleBlog = createAsyncThunk(
  'blog/fetchSingleBlog',
  async (blogIdOrSlug, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blogs/${blogIdOrSlug}/`
      );
      return response.data; // the blog data
    } catch (error) {
      // handle network or API errors
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
```

## File: src/redux/blogs/blogSlice.js

```javascript
import { createSlice } from '@reduxjs/toolkit';
import { fetchBlogCategories, fetchBlogs, fetchLatestBlogs, fetchSingleBlog } from './blogAction';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    categories: [],
    blogs: [],
    latestBlogs: [],
    blog: {},
    blogPagination: {},
    pageSize: 9,
    loadingBlogs: true,
    loadingBlog: true,
    loadingBlogCategory: true,
    loadingLatestBlogs: true,
    error: null,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Blog categories
    builder
      .addCase(fetchBlogCategories.pending, (state) => {
        state.loadingBlogCategory = true;
        state.error = null;
      })
      .addCase(fetchBlogCategories.fulfilled, (state, action) => {
        state.loadingBlogCategory = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchBlogCategories.rejected, (state, action) => {
        state.loadingBlogCategory = false;
        state.error = action.payload;
      });

    // Blogs
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loadingBlogs = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loadingBlogs = false;
        state.blogs = action.payload.data.results;
        state.blogPagination = {
          count: action.payload?.data?.count,
          next: action.payload?.data?.next,
          previous: action.payload?.data?.previous,
        };
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loadingBlogs = false;
        state.error = action.payload;
      });

    // Latest Blogs
    builder
      .addCase(fetchLatestBlogs.pending, (state) => {
        state.loadingLatestBlogs = true;
        state.error = null;
      })
      .addCase(fetchLatestBlogs.fulfilled, (state, action) => {
        state.loadingLatestBlogs = false;
        state.latestBlogs = action.payload.data.results;
      })
      .addCase(fetchLatestBlogs.rejected, (state, action) => {
        state.loadingLatestBlogs = false;
        state.error = action.payload;
      });

    //single blog
    builder
      .addCase(fetchSingleBlog.pending, (state) => {
        state.loadingBlog = true;
        state.error = null;
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.loadingBlog = false;
        state.blog = action.payload.data; // store single blog
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.loadingBlog = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveCategory } = blogSlice.actions;
export default blogSlice.reducer;
```

## File: src/redux/brands/brandsAction.js

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/brands/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);
```

## File: src/redux/brands/brandsSlice.js

```javascript
import { createSlice } from '@reduxjs/toolkit';
import { fetchBrands } from './brandsAction';

const brandSlice = createSlice({
  name: 'brands',
  initialState: {
    brands: [],
    loadingbrands: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // brands
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loadingbrands = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loadingbrands = false;
        state.brands = action.payload.data;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loadingbrands = false;
        state.error = action.payload;
      });
  },
});

export const {} = brandSlice.actions;
export default brandSlice.reducer;
```

## File: src/redux/courses/courseAction.js

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCourseCategories = createAsyncThunk(
  'course/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog-categories/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCourses = createAsyncThunk(
  'course/fetchCourses',
  async ({ category = null, page = 1, page_size = 10, search = null }, { rejectWithValue }) => {
    try {
      const categoryParam = category ? `&category=${category}` : '';
      const searchParam = search ? `&search=${search}` : '';
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blogs/?page=${page}&page_size=${page_size}${categoryParam}${searchParam}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchSingleCourse = createAsyncThunk(
  'course/fetchSingleCourse',
  async (courseIdOrSlug, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/courses/${courseIdOrSlug}/`
      );
      return response.data; // the course data
    } catch (error) {
      // handle network or API errors
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
```

## File: src/redux/courses/courseSlice.js

```javascript
import { createSlice } from '@reduxjs/toolkit';
import { fetchCourseCategories, fetchCourses, fetchSingleCourse } from './courseAction';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    categories: [],
    courses: [],
    course: {},
    coursePagination: {},
    pageSize: 9,
    loadingCourses: false,
    loadingCourse: false,
    loadingCourseCategory: false,
    error: null,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Course categories
    builder
      .addCase(fetchCourseCategories.pending, (state) => {
        state.loadingCourseCategory = true;
        state.error = null;
      })
      .addCase(fetchCourseCategories.fulfilled, (state, action) => {
        state.loadingCourseCategory = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchCourseCategories.rejected, (state, action) => {
        state.loadingCourseCategory = false;
        state.error = action.payload;
      });

    // Courses
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loadingCourses = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loadingCourses = false;
        state.courses = action.payload.data.results;
        state.coursePagination = {
          count: action.payload?.data?.count,
          next: action.payload?.data?.next,
          previous: action.payload?.data?.previous,
        };
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loadingCourses = false;
        state.error = action.payload;
      });

    //single course
    builder
      .addCase(fetchSingleCourse.pending, (state) => {
        state.loadingCourse = true;
        state.error = null;
      })
      .addCase(fetchSingleCourse.fulfilled, (state, action) => {
        state.loadingCourse = false;
        state.course = action.payload.data; // store single course
      })
      .addCase(fetchSingleCourse.rejected, (state, action) => {
        state.loadingCourse = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveCategory } = courseSlice.actions;
export default courseSlice.reducer;
```

## File: src/redux/hero/heroAction.js

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetcHeros = createAsyncThunk('heros/fetcHeros', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/hero/`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});
```

## File: src/redux/hero/heroSlice.js

```javascript
import { createSlice } from '@reduxjs/toolkit';
import { fetcHeros } from './heroAction';

const heroSlice = createSlice({
  name: 'hero',
  initialState: {
    heros: [],
    loadingHeros: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // heros
    builder
      .addCase(fetcHeros.pending, (state) => {
        state.loadingHeros = true;
        state.error = null;
      })
      .addCase(fetcHeros.fulfilled, (state, action) => {
        state.loadingHeros = false;
        state.heros = action.payload.data;
      })
      .addCase(fetcHeros.rejected, (state, action) => {
        state.loadingHeros = false;
        state.error = action.payload;
      });
  },
});

export const {} = heroSlice.actions;
export default heroSlice.reducer;
```

## File: src/redux/store.js

```javascript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import blogReducer from './blogs/blogSlice';
import courseReducer from './courses/courseSlice';
import heroReducer from './hero/heroSlice';
import brandReducer from './brands/brandsSlice';
import { setupAxiosInterceptors } from '@/api/setupAxiosInterceptors';

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    course: courseReducer,
    hero: heroReducer,
    brands: brandReducer,
  },
});

setupAxiosInterceptors(store);

export default store;
```

## File: src/routes/RoutesComponent.jsx

```javascript
/**
 * RoutesComponent
 * ----------------
 * - Centralized configuration of application routes
 * - Handles route-level rendering inside `PublicLayout`
 * - Includes global side effect: scroll-to-top on navigation
 * - Ensures unmatched paths render the `NotFound` page
 */

import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import PublicLayout from '../layouts/PublicLayout';
import NotFound from '../components/common/NotFound';

import HomePage from '../pages/Root/Home/Home';
import BlogPage from '../pages/Root/Blogs/Blogs';
import Blog from '../pages/Root/Blog/Blog';
import Contact from '../pages/Root/Contact/Contact';
import FAQs from '../pages/Root/FAQs/FAQs';
import About from '../pages/Root/About/About';
import PrivacyPolicy from '../pages/Root/Privacy Policy/PrivacyPolicy';
import RefundPolicy from '../pages/Root/refund/RefundPolicy';
import SingleCourse from '@/pages/Root/singleCourse/SingleCourse';
import CoursesPage from '@/pages/Root/Courses/Courses';
import AuthLayout from '@/layouts/AuthLayout';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import LoginRole from '@/pages/Root/LoginRole/LoginRole';
import Dashboard from '@/pages/Dashboard/Dashboard/Dashboard';
import LandingLayout from '@/layouts/LandingLayout';
import LandingPage from '@/pages/Root/Landing/Landing';
import LoginStudent from '@/pages/Root/LoginStudent/LoginStudent';

function RoutesComponent() {
  const { pathname } = useLocation(); // Detect route change

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      {/* Public layout wraps most routes for consistent UI */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="blogs" element={<BlogPage />} />
        <Route path="blogs/:id" element={<Blog />} /> {/* dynamic blog route */}
        <Route path="contact" element={<Contact />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="about" element={<About />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="refund-policy" element={<RefundPolicy />} />
        <Route path="courses/:id" element={<SingleCourse />} />
        <Route path="courses" element={<CoursesPage />} />
      </Route>

      {/* course landing page */}
      <Route element={<LandingLayout />}>
        <Route path="landing-page" element={<LandingPage />} />
      </Route>

      {/* 🔑 AUTH ROUTES GROUP */}
      <Route element={<AuthLayout />}>
        <Route path="/login/role" element={<LoginRole />} />
        <Route path="/login" element={<LoginStudent />} />
      </Route>

      {/* 🔐 PROTECTED ROUTES GROUP */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* 🚫 404 PAGE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesComponent;
```

## File: src/utils/getYouTubeID.js

```javascript
export const getYouTubeID = (url) => {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url?.match(regExp);
  return match ? match[1] : null;
};
```

## File: src/utils/sweetAlert.js

```javascript
// src/utils/SwalUtils.js
import Swal from 'sweetalert2';

const SwalUtils = {
  success: (message, title = 'Success!') => {
    Swal.fire({
      title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Okay',
      customClass: {
        confirmButton: 'bg-green-500 min-w-[180px] text-white px-6 py-2 rounded-lg font-bold',
      },
    });
  },

  error: (message, title = 'Error!') => {
    Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Okay',
      customClass: {
        confirmButton: 'bg-red-500 min-w-[180px] text-white px-6 py-2 rounded-lg font-bold',
      },
    });
  },

  info: (message, title = 'Info') => {
    Swal.fire({
      title,
      text: message,
      icon: 'info',
      confirmButtonText: 'Okay',
      customClass: {
        confirmButton: 'bg-blue-500 min-w-[180px] text-white px-6 py-2 rounded-lg font-bold',
      },
    });
  },

  warning: (message, title = 'Warning!') => {
    Swal.fire({
      title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Okay',
      customClass: {
        confirmButton: 'bg-yellow-400 min-w-[180px] text-black px-6 py-2 rounded-lg font-bold',
      },
    });
  },
};

export default SwalUtils;
```

## File: src/utils/timeFormat.js

```javascript
import { parseISO, format } from 'date-fns';

export function dateConvertionBlogsPageBlogCard(isoDate) {
  if (!isoDate) return '';
  const parsedDate = parseISO(isoDate); // convert ISO string to Date object
  return format(parsedDate, 'dd/MM/yyyy'); // format as 29/07/2025
}

export function dateConvertionHomePageBlogCard(isoDate) {
  if (!isoDate) return '';
  const parsedDate = parseISO(isoDate); // convert ISO string to Date object
  return format(parsedDate, 'MMMM d, yyyy'); // Example: March 5, 2024
}
```

## File: vercel.json

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

## File: vite.config.js

```javascript
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```
