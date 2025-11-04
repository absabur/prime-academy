import { useParams, useSearchParams } from 'react-router-dom';
import { CertificateCard, NavigationTabs, ResetCourseCard } from './LeftSideTopContent';
import ModuleCard from './ModuleCard';
import { dashboardStudentCourseModule } from '../../../../utils/dashboardStudentCourseModule';
import ModuleTable from '../../common/ModuleTable';
import {
  studentDashboardAssignmentTabColumnData,
  studentDashboardAssignmentTabTableData,
} from '../../../../utils/studentDashboardAssignmentTab';
import { studentRecordingTableData } from '../../../../utils/studentRecordingTableData';
import { studentRecordingColumnData } from '../../../../utils/studentRecordingColumnData';
import {
  studentDashboardResourceTabColumnData,
  studentDashboardResourceTabTableData,
} from '../../../../utils/studentDashboardResourceTab';
import ExamTab from './ExamTab';

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
          noParent={true}
          modules={studentDashboardAssignmentTabTableData}
          tableColumns={studentDashboardAssignmentTabColumnData}
        />
      )}

      {/* Recording Tab Show */}
      {currentTab == 'Recording' && (
        <ModuleTable
          colEarly={true}
          modules={studentRecordingTableData}
          tableColumns={studentRecordingColumnData}
        />
      )}

      {/* Resource Tab Show */}
      {currentTab == 'Resource' && (
        <ModuleTable
          colEarly={true}
          noParent={true}
          modules={studentDashboardResourceTabTableData}
          tableColumns={studentDashboardResourceTabColumnData}
        />
      )}

      {/* Exam Tab Show */}
      {currentTab == 'Exam' && (
        <>
          {demoQuizData.map((item, index) => (
            <ExamTab data={item} key={index} />
          ))}
        </>
      )}

      {/* Certificate Tab Show */}
      {currentTab == 'Certificate' && (
        <div className="mt-md">
          <CertificateCard />
        </div>
      )}
    </div>
  );
};

export default LeftSideContent;

const demoQuizData = [
  {
    moduleTitle: 'Module 1',
    quizTitle: 'Module 1 Quiz',
    dateRange: '11 Apr - 17 Apr',
    description: 'Please check result for Answer sheet.',
    mark: '10/10',
  },
  {
    moduleTitle: 'Module 2',
    quizTitle: 'Module 2 Quiz',
    dateRange: '11 Apr - 17 Apr',
    description: 'Please check result for Answer sheet.',
    mark: '10/10',
  },
  {
    moduleTitle: 'Module 3',
    quizTitle: 'Module 3 Quiz',
    dateRange: '11 Apr - 17 Apr',
    description: 'Please check result for Answer sheet.',
    mark: '',
  },
];
