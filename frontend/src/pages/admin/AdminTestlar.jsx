import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import { Link } from "react-router-dom";

const AdminTestlar = () => {
  const [testlar, setTestlar] = useState([]);
  const Testlar = async () => {
    try {
      const { data } = await api.get("/all-tests");
      setTestlar(data.tests);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    Testlar();
  }, []);
  // Testni O'chirish
  const deleteTest = async (id) => {
    try {
      const { data } = await api.delete(`/delete/test/${id}`);
      if (data.success) {
        toast.success(data.message);
        Testlar();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 ">
              {/* <h1>{message}</h1>
              <h1>{testlar_soni}</h1> */}
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
                sssssssssssssss
              </p>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900 pt-2">
              <div className="">
                <button
                  id="dropdownActionButton"
                  data-dropdown-toggle="dropdownAction"
                  className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                >
                  <span className="sr-only">Action button</span>
                  Action
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
                        Reward
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Promote
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Activate account
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete User
                    </a>
                  </div>
                </div>
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
                    Test Nomi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Kategoriya
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Belginlangan vaqt
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Savollar soni
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {`Test ishlagan o'quvchilar`}
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Taxrirlash
                  </th>
                  <th scope="col" className="px-6 py-3">
                    {` O'chirish`}
                  </th>
                </tr>
              </thead>
              <tbody>
                {testlar.map((test) => (
                  <tr
                    key={test._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="">
                        <div className="text-base font-semibold ">
                          {test.title}
                        </div>
                        <div className="font-normal text-gray-500">
                          {test.description}
                        </div>
                      </div>
                    </th>

                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">
                            {test.categoryId?.name}
                          </span>
                          <span
                            className={`text-xs font-medium ${
                              test.categoryId?.daraja === "qiyin"
                                ? "text-red-500"
                                : test.categoryId?.daraja === "o'rta"
                                ? "text-yellow-500"
                                : test.categoryId?.daraja === "oson"
                                ? "text-green-500"
                                : "text-gray-500"
                            }`}
                          >
                            {test.categoryId?.daraja || "Noma’lum"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{test.duration} daqiqa</td>
                    <td className="px-6 py-4">{test.savollar_soni} ta</td>
                    <td className="px-6 py-4">
                      <button className="btn">Test ishlaganlar</button>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/edit-test/${test._id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit user
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => deleteTest(test._id)}
                      >
                        {` O'chirish`}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTestlar;
