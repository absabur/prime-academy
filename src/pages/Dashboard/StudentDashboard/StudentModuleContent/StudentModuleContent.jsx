import { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ThreeColLayout from '../../../../components/Dashboard/StudentDashboard/StudentMyCourse/ThreeColLayout';
import ModuleContentMain from '../../../../components/Dashboard/StudentDashboard/StudentModuleContent/ModuleContentMain';
import ModuleContentSidebar from '../../../../components/Dashboard/StudentDashboard/StudentModuleContent/ModuleContentSidebar';

const StudentModuleContent = () => {
  const { courseSlug, moduleId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tab = searchParams.get('tab') || 'live-classes';
  const [refreshKey, setRefreshKey] = useState(0);

  const handleContentUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleBack = () => {
    navigate(`/student-dashboard/my-course/${courseSlug}?tab=Modules`);
  };

  return (
    <>
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Course</span>
        </button>
      </div>

      <ThreeColLayout
        leftComponent={
          <ModuleContentMain 
            moduleId={moduleId} 
            currentTab={tab} 
            onContentUpdate={handleContentUpdate}
          />
        }
        rightComponent={
          <ModuleContentSidebar 
            moduleId={moduleId} 
            key={refreshKey}
          />
        }
      />
    </>
  );
};

export default StudentModuleContent;
