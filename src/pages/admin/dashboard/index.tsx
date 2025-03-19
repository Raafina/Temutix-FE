import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";
const AdminDashboardPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Welcome to Temutix Dashboard!"
      type="admin"
    >
      <Dashboard />
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
