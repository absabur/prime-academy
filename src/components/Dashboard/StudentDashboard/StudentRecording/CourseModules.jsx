import React from 'react';
import { ChevronRight } from 'lucide-react';
import ModuleTable from '../../common/ModuleTable';
import { studentRecordingColumnData } from '../../../../utils/studentRecordingColumnData';
import { studentRecordingTableData } from '../../../../utils/studentRecordingTableData';

const CourseModules = () => {
  return (
    <div className="mt-lg">
      {/* --- Pre Recorded Video Section --- */}
      {/* This card is now full-width on mobile and max-width on desktop */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-lg flex items-center justify-between border border-black/10 w-full lg:max-w-150">
        <div className="flex items-center gap-3">
          <img src="/assets/file-play.png" width={40} alt="" />
          <div>
            <h2 className="font-semibold text-black/80">Pre Recorded Video</h2>
            <p className="text-sm text-black/60">139 Videos</p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-black/5 transition-colors flex-shrink-0">
          <ChevronRight className="text-black/60 h-6 w-6" />
        </button>
      </div>

      {/* --- Modules Section --- */}
      <ModuleTable modules={studentRecordingTableData} tableColumns={studentRecordingColumnData} />
    </div>
  );
};

export default CourseModules;
