import { useState, useEffect } from 'react';

const LoadingDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`
        z-1000 fixed top-0 left-0 w-[100vw] h-[100dvh] 
        bg-black/20 backdrop-blur-sm
        flex items-center justify-center
        transition-opacity duration-300 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <div className="flex flex-col items-center gap-4">
        <img
          src="/icons/icon-512x512.png"
          alt="Loading..."
          className="w-16 h-16 animate-spin"
        />
        <span className="text-white text-lg font-medium">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingDashboard;