import AllHeros from '@/components/Dashboard/AdminDashboard/AdminPanelHero/AllHeros';
import DashBoardHeader from '@/components/Dashboard/common/DashBoardHeader';

const AdminPanelHero = () => {
  return (
    <div>
      <DashBoardHeader title={'Heros'} searchBar={false} />
      <AllHeros />
    </div>
  );
};

export default AdminPanelHero;
