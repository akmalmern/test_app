import { useEffect, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [userLength, setUserLength] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // paginate qismi.
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 30;
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const getUsers = async (page, query = "") => {
    try {
      const { data } = await api.get(`/users`, {
        params: {
          page,
          limit,
          userName: query, // Foydalanuvchi nomi bo‘yicha qidiruv
        },
      });
      if (data.success) {
        setUserLength(data.userlar);
        setUsers(data.users);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  // delete user
  const deleteUser = async (id) => {
    try {
      const { data } = await api.delete(`/user/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        getUsers();
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  // user test results
  const [selectedUser, setSelectedUser] = useState(null);
  const [userResults, setUserResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserResults = async (id) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/user/user-results/${id}`);
      setUserResults(data.results);
      setSelectedUser(id);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center text-white justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 ">
              <h1>Barcha foydalanuvchilar</h1>/<h1> {userLength} ta</h1>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
              <div>
                <button
                  id="dropdownActionButton"
                  data-dropdown-toggle="dropdownAction"
                  className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                >
                  <span className="sr-only">Action button</span>
                  {`Top O'quvchilar`}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownAction"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownActionButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Eng kop test yechgan top 10 talik
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Eng kop test yechgan top 20 talik
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Eng kop test yechgan top 30 talik
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <input type="date" />
              </div>
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    getUsers(1, e.target.value); // Qidiruvga mos ma’lumotlarni olish
                  }}
                  htmlFor="table-search-users"
                  className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for users"
                />
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Natijalar
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {`O'chirish`}
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.image ? (
                        <img
                          className="w-8 h-8 rounded-full"
                          src={`${api.defaults.baseURL}/uploads/${user.image}`}
                          alt="user photo"
                        />
                      ) : (
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                          alt="default photo"
                        />
                      )}

                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {user.userName}
                        </div>
                        <div className="font-normal text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </th>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => getUserResults(user._id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Natijalar
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        {`  O'chirish`}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination - ixchamlashtirilgan */}
            <div className="flex flex-col items-center">
              {/* Help text */}
              <span className="text-sm text-gray-700 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-black">
                  {(currentPage - 1) * limit + 1}
                </span>{" "}
                dan{" "}
                <span className="font-semibold text-gray-900 dark:text-black">
                  {Math.min(currentPage * limit)}
                </span>{" "}
                gacha{" "}
                <span className="font-semibold text-gray-900 dark:text-black">
                  {} {/* Total count */}
                </span>{" "}
              </span>

              {/* Buttons */}
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Prev
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          {selectedUser && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Foydalanuvchi test natijalari
                </h2>
                {loading ? (
                  <p>Yuklanmoqda...</p>
                ) : (
                  <ul className="mt-4">
                    {userResults.length > 0 ? (
                      userResults.map((result, index) => (
                        <li
                          key={index}
                          className="py-2 border-b border-gray-200 dark:border-gray-700"
                        >
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Test:</strong> {result.testTitle} (
                            {result.categoryTitle})
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Ball:</strong> {result.score}%
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Tugatilgan:</strong> {result.completedAt}
                          </p>
                        </li>
                      ))
                    ) : (
                      <p>Test natijalari topilmadi</p>
                    )}
                  </ul>
                )}
                <button
                  onClick={() => setSelectedUser(null)}
                  className="mt-4 text-white bg-red-500 px-4 py-2 rounded"
                >
                  Yopish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
