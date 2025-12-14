import { useEffect, useState } from 'react';

const LoadingDashboard = ({ loading }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timer;
    if (loading) {
      // Start showing loader
      setShouldRender(true);
      setIsVisible(true);
    } else {
      // Wait at least 1s before hiding
      timer = setTimeout(() => {
        setIsVisible(false);
        // Wait for fade-out animation before unmounting
        setTimeout(() => setShouldRender(false), 100); // match transition duration
      }, 200);
    }


    return () => clearTimeout(timer);
  }, [loading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`
        z-[1000] fixed top-0 left-0 w-[100vw] h-[100dvh]
        bg-black/20 backdrop-blur-sm
        flex items-center justify-center
        transition-opacity duration-300 ease-in-out
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <div className="flex flex-col items-center gap-4">
        <img src="/icons/icon-512x512.png" alt="Loading..." className="w-16 h-16 animate-spin" />
        <span className="text-white text-lg font-medium">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingDashboard;
