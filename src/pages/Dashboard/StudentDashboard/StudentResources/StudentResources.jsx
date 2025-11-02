import DashBoardHeader from '../../../../components/Dashboard/common/DashBoardHeader';
import WorkshopDropdown from '../../../../components/Dashboard/StudentDashboard/StudentResources/WorkshopDropdown.jsx';
import PrimaryButton from '../../../../components/common/PrimaryButton';
import { TriangleAlert } from 'lucide-react';
import ResourceModule from '../../../../components/Dashboard/StudentDashboard/StudentResources/ResourceModules.jsx';

const StudentResources = () => {
  return (
    <div>
      <DashBoardHeader title={`Resources`} searchBar={false} />
      <div>
        <WorkshopDropdown />
        <ResourceModule />
      </div>
      <div className="px-lg py-md rounded-lg bg-white shadow-sm ml-auto w-fit border border-black/10">
        <PrimaryButton prefixIcon={<TriangleAlert />} text={`Have Any Problem?`} />
      </div>
    </div>
  );
};

export default StudentResources;
