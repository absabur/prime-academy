import ModuleTable from '../../common/ModuleTable';
import { studentRecordingColumnData } from '../../../../utils/studentRecordingColumnData';
import { studentRecordingTableData } from '../../../../utils/studentRecordingTableData';

const CourseModules = () => {
  return (
    <div className="mt-lg">
      {/* --- Modules Section --- */}
      <ModuleTable modules={studentRecordingTableData} tableColumns={studentRecordingColumnData} />
    </div>
  );
};

export default CourseModules;
