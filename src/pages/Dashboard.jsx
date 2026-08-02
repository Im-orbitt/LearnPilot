import WelcomeBanner from "../features/dashboard/WelcomeBanner/WelcomeBanner";
import ContinueLearning from "../features/dashboard/ContinueLearning/ContinueLearning";
import QuickActions from "../features/dashboard/QuickActions/QuickActions";
import RecentActivity from "../features/dashboard/RecentActivity/RecentActivity";

function Dashboard() {
  return (
    <>
      <WelcomeBanner />
      <ContinueLearning />
      <QuickActions />
      <RecentActivity />
    </>
  );
}

export default Dashboard;
