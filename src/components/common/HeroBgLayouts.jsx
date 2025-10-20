import React, { useEffect, useState } from 'react';

const HeroBgLayouts = ({ image }) => {
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
      {/* bg shape image of left side */}
      <div
        className="absolute left-0 top-0 w-full bg-cover bg-center h-[100%] z-4"
        style={{ backgroundImage: `url(/assets/hero-pattern.png)` }}
      ></div>

      {/* bg image from backend right side */}
      <img
        className={`absolute right-0 top-0 w-full md:w-[70%] h-[100%] object-cover object-[center_top] z-2 transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={imageSrc}
        alt="Hero"
        loading="lazy"
      />

      {/* bottom angle shape right */}
      <div className="absolute -right-20 -bottom-190 w-[120%] h-200 bg-white z-5 -rotate-6"></div>

      {/* bottom angle shape left */}
      <div className="absolute -left-40 md:-left-150 -bottom-190 w-[120%] h-200 bg-white z-5 rotate-10"></div>

      {/* light black overlay */}
      {/* <div className="absolute z-3 top-0 left-0 w-full h-full bg-black/20"></div> */}
    </>
  );
};

export default HeroBgLayouts;
