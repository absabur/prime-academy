import AllHeros from '@/components/Dashboard/AdminDashboard/AdminPanelHero/AllHeros';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';
import LoadingDashboard from '../../../../components/Dashboard/common/LoadingDashboard';
import { useSelector } from 'react-redux';

const AdminPanelHero = () => {
  const { loadingHeros, loadingActionHeros } = useSelector((state) => state.hero);
  return (
    <div>
      <LoadingDashboard loading={loadingHeros || loadingActionHeros} />
      <DashBoardHeader title={'Heros'} searchBar={false} />
      <AllHeros />
    </div>
  );
};

export default AdminPanelHero;
