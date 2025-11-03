import { useParams, useSearchParams } from 'react-router-dom';
import { CertificateCard, NavigationTabs, ResetCourseCard } from './LeftSideTopContent';
import ModuleCard from './ModuleCard';
import { dashboardStudentCourseModule } from '../../../../utils/dashboardStudentCourseModule';
import ModuleTable from '../../common/ModuleTable';
import {
  studentDashboardAssignmentTabColumnData,
  studentDashboardAssignmentTabTableData,
} from '../../../../utils/studentDashboardAssignmentTab';

const LeftSideContent = () => {
  const { courseSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab');

  return (
    <div>
      <div className="space-y-md">
        <ResetCourseCard />
        <CertificateCard />
        <NavigationTabs />
      </div>

      {/* Modules tab show */}
      {currentTab == 'Modules' && (
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-md mt-lg">
          {dashboardStudentCourseModule.map((item, index) => (
            <ModuleCard key={index} module={item} />
          ))}
        </div>
      )}

      {/* Assignment Tab Show */}
      {currentTab == 'Assignment' && (
        <ModuleTable
          colEarly={true}
          modules={studentDashboardAssignmentTabTableData}
          tableColumns={studentDashboardAssignmentTabColumnData}
        />
      )}
    </div>
  );
};

export default LeftSideContent;
