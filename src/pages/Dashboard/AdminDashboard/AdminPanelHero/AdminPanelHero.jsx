import AllHeros from '@/components/Dashboard/AdminDashboard/AdminPanelHero/AllHeros';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import LoadingDashboard from '../../../../components/Dashboard/common/LoadingDashboard';
import { useSelector } from 'react-redux';

const AdminPanelHero = () => {
  const { loadingHeros } = useSelector((state) => state.hero);
  return (
    <div>
      {loadingHeros && <LoadingDashboard />}
      <DashBoardHeader title={'Heros'} searchBar={false} />
      <AllHeros />
    </div>
  );
};

export default AdminPanelHero;
