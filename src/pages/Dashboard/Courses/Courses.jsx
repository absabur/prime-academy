import DataTables from '@/components/Dashboard/common/DataTables';
import DashBoardHeader from '@/components/Dashboard/Student/DashBoardHeader';
import { FaPlus } from 'react-icons/fa';

const Courses = () => {
  return (
    <div>
      <DashBoardHeader buttonText={'Add Course'} title={'Courses'} prefixIcon={<FaPlus />} />
      <DataTables />
    </div>
  );
};

export default Courses;
