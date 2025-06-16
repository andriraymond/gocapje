// components/AdminSidebar.js

import Link from 'next/link';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <ul>
        <li>
          <Link href="/admin/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/posts">
            <a>Posts</a>
          </Link>
        </li>
        {/* Add more menu items as needed */}
      </ul>
      <style jsx>{`
        .admin-sidebar {
          width: 200px;
          background-color: #f0f0f0;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          padding: 10px;
        }
        a {
          text-decoration: none;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default AdminSidebar;