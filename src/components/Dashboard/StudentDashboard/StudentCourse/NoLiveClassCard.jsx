import React from 'react';
import { Info } from 'lucide-react'; // Assuming lucide-react is still available from previous context

const NoLiveClassesCard = () => {
  return (
    <div className="rounded-xl w-full text-left">
      {/* Title with Info Icon */}
      <div className="flex items-center justify-start mb-4">
        <Info className="w-8 h-8 text-blue-700 mr-3" />
        <h2 className="text-2xl sm:text-3xl font-bold text-black">No live classes today</h2>
      </div>

      {/* Description */}
      <p className="text-base sm:text-lg text-black/50 leading-relaxed">
        Practice previous classes and assignments
        <br className="sm:hidden" /> during this time.
      </p>
    </div>
  );
};

export default NoLiveClassesCard;
