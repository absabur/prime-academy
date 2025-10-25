import DataTables from '@/components/Dashboard/common/DataTables';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import { FaPlus } from 'react-icons/fa';

const AdminPanelCourses = () => {
  return (
    <div>
      <DashBoardHeader buttonText={'Add Course'} title={'AdminPanelCourses'} prefixIcon={<FaPlus />} />
      <DataTables />
    </div>
  );
};

export default AdminPanelCourses;
