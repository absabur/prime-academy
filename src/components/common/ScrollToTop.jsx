import { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null; // ✅ Conditional rendering

  return (
    <button
      onClick={scrollToTop}
      className="z-100 fixed bottom-6 right-6 bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-black cursor-pointer transition border-2 border-white outline-2 outline-primary"
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
