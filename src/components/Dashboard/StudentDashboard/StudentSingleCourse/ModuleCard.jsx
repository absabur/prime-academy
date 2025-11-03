import React from 'react';
import { Info, CheckCircle, FileText, FilePenLine } from 'lucide-react';
import PrimaryButton from '../../../common/PrimaryButton';

const ModuleCard = ({ module }) => (
  <div className="grid gap-6">
    <div
      key={module.id}
      className="bg-white p-4 md:p-6 rounded-2xl shadow-lg w-full border border-black/30"
    >
      {/* Top Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        {/* 1. Module Box */}
        <div className="bg-secondary text-white rounded-lg text-center w-[72px] h-[72px] flex flex-col justify-center flex-shrink-0">
          <span className="text-sm font-medium leading-tight">Modules</span>
          <span className="text-3xl font-bold leading-tight">{module.id}</span>
        </div>

        {/* 2. Middle Section (Progress & Date) */}
        <div className="flex-1 flex flex-col gap-sm min-w-[200px]">
          {/* Progress Bar + Stats */}
          <div className="flex items-center gap-2">
            {/* Progress Bar */}
            <div className="flex-1 h-2.5 rounded-full overflow-hidden flex">
              <div className="bg-primary" style={{ width: `${module.progress}%` }}></div>
              <div className="bg-secondary" style={{ width: `${100 - module.progress}%` }}></div>
            </div>
            {/* Stats */}
            <span className="text-sm font-medium text-black">{module.totalItems}</span>
            <Info className="h-4 w-4 text-black" />
          </div>

          {/* Date */}
          <div className="flex flex-wrap gap-md">
            <div className="border border-secondary rounded-full py-1 px-4 text-center">
              <span className="text-sm font-medium text-black">{module.dateRange}</span>
            </div>

            <div className="ml-auto border-2 border-black rounded-full py-1.5 px-4 flex items-center justify-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-black" />
              <span className="text-sm font-bold text-black">{module.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-5 border-black/30" />

      {/* Content Section */}
      <div>
        <h2 className="text-3xl font-bold text-black mb-4">{module.title}</h2>

        {/* Details */}
        <div className="flex flex-col flex-wrap sm:flex-row items-start sm:items-center gap-md mb-6">
          <div className="flex items-center gap-1.5">
            <span className="bg-pink-100 text-pink-700 text-xs font-bold px-2 py-0.5 rounded-md">
              LIVE
            </span>
            <span className="font-medium text-black">{module.liveClasses} Live Classes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-medium text-black">{module.assignments} Assignment</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FilePenLine className="h-5 w-5 text-orange-500" />
            <span className="font-medium text-black">{module.tests} Test</span>
          </div>
        </div>

        {/* Study Plan Button */}
        <PrimaryButton
          text={`Study Plan`}
          className="w-full opacity-75 text-black hover:text-white"
        />
      </div>
    </div>
  </div>
);

export default ModuleCard;
