import ModuleTable from '../../common/ModuleTable';
import { studentResourceColumnData } from '../../../../utils/studentResourceColumnData';
import { studentResourceTableData } from '../../../../utils/studentResourceTableData';

const ResourceModule = () => {
  return (
    <div className="mt-lg">
      {/* --- Modules Section --- */}
      <ModuleTable modules={studentResourceTableData} tableColumns={studentResourceColumnData} />
    </div>
  );
};

export default ResourceModule;
