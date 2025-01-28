// import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/dashboard">Admin Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users">Users Management</NavLink>
          </li>
          <li>
            <NavLink to="/admin/settings">Settings</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
