import React, { useState } from 'react';
import DashBoardHeader from '../../../../components/Dashboard/common/DashBoardHeader';
import TabButtons from '../../../../components/common/TabButtons';
import WorkshopDropdown from '../../../../components/Dashboard/StudentDashboard/StudentRecording/WorkshopDropdown';
import CourseModules from '../../../../components/Dashboard/StudentDashboard/StudentRecording/CourseModules';
import PrimaryButton from '../../../../components/common/PrimaryButton';
import { TriangleAlert } from 'lucide-react';

const tabs = [{ category: 'Workshop' }, { category: 'Demo Class' }];

const StudentRecording = () => {
  const [selectedTab, setSelectedTab] = useState('Workshop');
  return (
    <div>
      <DashBoardHeader title={`Recording`} searchBar={false} />
      <div className="p-md bg-white shadow-md border border-black/10 rounded-lg mb-lg">
        <TabButtons data={tabs} selected={selectedTab} setSelected={setSelectedTab} style={{marginBottom: 0}}/>
      </div>
      {selectedTab == 'Workshop' && (
        <div>
          <WorkshopDropdown />
          <CourseModules />
        </div>
      )}
      {selectedTab == 'Demo Class' && (
        <div className="p-xl flex gap-xl item-start justify-center flex-wrap rounded-lg border border-black/10 w-full bg-white shadow-md mb-xl">
          <img width={200} src="/assets/no-recording-image.png" alt="No Recording" />
          <div>
            <h2 className="text-3xl text-primary font-bold">You don't have any class recordings.</h2>
            <p className="text-base mt-sm max-w-150">
              Book your free live demo class now, and you'll find all the recordings of the
              interactive live classes here.
            </p>
          </div>
        </div>
      )}
      <div className="px-lg py-md rounded-lg bg-white shadow-sm ml-auto w-fit border border-black/10">
        <PrimaryButton prefixIcon={<TriangleAlert />} text={`Have Any Problem?`} />
      </div>
    </div>
  );
};

export default StudentRecording;
