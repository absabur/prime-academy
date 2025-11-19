import React, { useState, useEffect } from 'react';

const HomeHeroBgLayouts = ({ image }) => {
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = image; // preloading, like data-src
    img.onload = () => {
      setImageSrc(image); // set actual src when loaded
      setLoaded(true);
    };
  }, [image]);

  return (
    <>
      {/* Hero Pattern Background */}
      <div
        className="
          absolute right-0 top-0 w-full h-[800px] bg-cover bg-center z-4
          bg-[url('/assets/hero-mobile.png')]    // mobile image
          md:bg-[url('/assets/banner-right.png')]  // tablet & desktop image
        "
        style={{
          backgroundPosition: 'center -15px center',
        }}
      ></div>

      {/* Main Image */}
      <img
        className={`absolute left-0 top-0 w-full h-[60%] md:w-[70%] md:h-[100%] object-cover object-[center_top] z-2 transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={imageSrc}
        alt=""
      />

      {/* White shapes */}
      <div className="absolute -left-20 -bottom-190 w-[120%] h-200 bg-white z-5 rotate-6"></div>
      <div className="absolute -right-40 md:-right-150 -bottom-190 w-[120%] h-200 bg-white z-5 -rotate-10"></div>

      {/* dark overlay */}
      <div className="absolute z-3 top-0 left-0 w-full h-full bg-black/30"></div>
    </>
  );
};

export default HomeHeroBgLayouts;
