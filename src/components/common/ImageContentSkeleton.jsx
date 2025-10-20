import React from 'react';

const ImageContentSkeleton = ({ ip }) => {
  return (
    <div className="flex gap-15 w-full flex-col md:flex-row">
      <div className={`flex-1 relative flex items-center ${ip === 'right' ? 'order-2' : ''}`}>
        {/* Image/Video Skeleton */}
        <div className="w-full relative animate-pulse">
          <div className="relative z-20 w-full h-80 bg-gray-300 rounded-lg"></div>

          {/* Play Button Skeleton */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gray-200 z-30"></div>
        </div>
      </div>

      {/* Text Section Skeleton */}
      <div className={`w-full relative flex-1 flex gap-lg flex-col`}>
        <div className={`flex-1 flex flex-col justify-start ${ip == 'right' && 'order-1'}`}>
          {/* Title Skeleton */}
          <div className="w-2/3 h-8 bg-gray-300 rounded mb-4 animate-pulse"></div>

          {/* Paragraph Skeleton */}
          <div className="w-full space-y-3">
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* Button Skeleton */}
          <div className="w-32 h-10 bg-gray-300 rounded-lg mt-6 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ImageContentSkeleton;
