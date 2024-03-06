// pages/admin/dashboard.js
import AdminSidebar from '@/components/admin/sidebar/sidebar';
import { Client } from '@vercel/postgres';

const Dashboard = () => {
  return (
    <div className="admin-page">
      <AdminSidebar />
      <div className="admin-content">
        <h1>Dashboard</h1>
        {/* Add your dashboard content here */}
      </div>
      <style jsx>{`
        .admin-page {
          display: flex;
          height: 100vh;
        }
        .admin-content {
          flex: 1;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
