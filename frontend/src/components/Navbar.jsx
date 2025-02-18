import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const profile = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  // log out funksiyasi
  const logOut = async () => {
    try {
      const { data } = await api.get("/logout");

      localStorage.removeItem("token");

      if (data.success === true) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Nomalum xato yuz berdi!");
    }
  };
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Flowbite
                </span>
              </a>
            </div>
            <div className="flex items-center relative">
              <div>
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
                >
                  {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
              </div>
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded={isDropdownOpen}
                    onClick={toggleDropdown}
                  >
                    <span className="sr-only">Open user menu</span>
                    {profile && profile.image ? (
                      <img
                        className="w-8 h-8 rounded-full"
                        src={`${api.defaults.baseURL}/uploads/${profile.image}`}
                        alt="user photo"
                      />
                    ) : (
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                        alt="default photo"
                      />
                    )}
                  </button>
                </div>
                {isDropdownOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-48 z-50 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {profile.userName}
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                        {profile.email}
                      </p>
                    </div>
                    <ul className="py-1">
                      <li>
                        <button
                          onClick={logOut}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
                {isDropdownOpen && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={closeDropdown}
                    aria-hidden="true"
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {profile?.role === "admin" && (
              <>
                <li>
                  <Link
                    to="/admin"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0L2 4v8c0 5 3 7 8 7s8-2 8-7V4l-8-4z" />
                    </svg>
                    <span className="ms-3">Admin Panel</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/users"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM2 14s4-4 8-4 8 4 8 4v2H2v-2z" />
                    </svg>
                    <span className="ms-3">Barcha foydalanuvchilar</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/category"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM2 14s4-4 8-4 8 4 8 4v2H2v-2z" />
                    </svg>
                    <span className="ms-3">Test Categoriyalari</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/testlar"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM2 14s4-4 8-4 8 4 8 4v2H2v-2z" />
                    </svg>
                    <span className="ms-3">Testlar</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/settings"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 100 20 10 10 0 000-20zM2 10a8 8 0 0116 0H2z" />
                    </svg>
                    <span className="ms-3">Admin sozlamalari</span>
                  </Link>
                </li>
              </>
            )}

            {profile?.role === "user" && (
              <>
                <li>
                  <Link
                    to="/"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0L2 4v8c0 5 3 7 8 7s8-2 8-7V4l-8-4z" />
                    </svg>
                    <span className="ms-3">Bosh sahifa</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/results"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 100 20 10 10 0 000-20zM2 10a8 8 0 0116 0H2z" />
                    </svg>
                    <span className="ms-3">Mening natijalarim</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM2 14s4-4 8-4 8 4 8 4v2H2v-2z" />
                    </svg>
                    <span className="ms-3">Profilim</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
