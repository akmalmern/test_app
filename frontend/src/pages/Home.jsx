import { toast } from "react-toastify";
import api from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import useAuth from "../auth/useAuth";
const Home = () => {
  const navigate = useNavigate();
  const [testlar, setTests] = useState([]);
  const [message, setMessage] = useState("");
  const [testlar_soni, setTestlarSoni] = useState(null);
  // const profile = useAuth();

  const allTests = async () => {
    try {
      const { data } = await api.get("/all-tests");
      if (data.success === true) {
        setTests(data.tests);
        setMessage(data.message);
        setTestlarSoni(data.testlar_soni);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    allTests();
  }, []);

  // testni boshlash tugmasi:
  const handleStartTest = async (testId) => {
    try {
      const { data } = await api.get(`/start-test/${testId}`);
      if (data) {
        toast.success(data.message);
        navigate(`/test/${testId}`);
        // Bu yerda kerak bo'lsa navigatsiya yoki boshqa ishlovlarni bajarishingiz mumkin
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Server bilan bog'lanishda xatolik yuz berdi"
      );
    }
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 ">
              <h1>{message}</h1>
              <h1>{testlar_soni}</h1>
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
          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
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
              555555555
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {testlar.map((test) => (
              <div className="p-4 " key={test._id}>
                <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 className="text-white dark:text-white text-lg font-medium">
                      {test.category}
                    </h2>
                  </div>
                  <div className="flex flex-col justify-between flex-grow">
                    <p className="leading-relaxed text-base text-white dark:text-gray-300">
                      {test.title}
                    </p>
                    <button
                      onClick={() => handleStartTest(test._id)}
                      className="mt-3 text-black dark:text-white hover:text-blue-600 inline-flex items-center"
                    >
                      Testni boshlash
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ********************* */}
    </>
  );
};

export default Home;
