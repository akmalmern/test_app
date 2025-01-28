import { Outlet, NavLink } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/user/dashboard">User Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/user/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/user/tests">Tests</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default UserLayout;
