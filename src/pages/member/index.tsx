import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Member/Dashboard";
const DashboardMemberPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Welcome to Temutix Dashboard!"
      type="member"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardMemberPage;
