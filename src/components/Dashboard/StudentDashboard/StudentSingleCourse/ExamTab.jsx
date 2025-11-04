import { FileText, ChevronRight } from 'lucide-react';

const ExamTab = ({ data }) => {
  return (
    // Main card container
    <div className="mt-md w-full bg-white rounded-xl shadow-lg overflow-hidden font-inter">
      {/* Header Section */}
      <div className="bg-primary text-white p-5 rounded-t-xl">
        {/* Using a slightly different blue from the image to ensure good contrast and a modern feel */}
        <h2 className="text-2xl font-bold">{data.moduleTitle}</h2>
      </div>

      {/* Content Section */}
      <div className="px-lg py-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          {/* Left Side: Quiz Details */}
          <div className="flex-1 pr-4">
            <div className="flex items-center mb-2 flex-wrap">
              {/* Icon from lucide-react */}
              <FileText className="w-5 h-5 text-black/70 mr-2 flex-shrink-0" />
              <h3 className="text-xl font-semibold text-black/80">{data.quizTitle}</h3>
              {/* Date Badge */}
              <span className="ml-3 mt-1 sm:mt-0 inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-300">
                {data.dateRange}
              </span>
            </div>
            <p className="text-sm text-black/50 pl-7 sm:pl-0">
              {/* Corrected "Answersheet" typo from image */}
              {data.description}
            </p>
          </div>

          {/* Right Side: Mark and Result Button */}
          <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0 flex-shrink-0">
            {/* Mark Badge */}
            {data.mark && (
              <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full border border-green-300">
                Mark {data.mark}
              </span>
            )}

            {/* Result Button */}
            <button className="mt-3 ml-auto flex items-center justify-center bg-gradient-to-b from-yellow-400 to-yellow-500 text-black font-bold py-2 px-6 rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50">
              Result
              {/* Icon from lucide-react */}
              <ChevronRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamTab;
