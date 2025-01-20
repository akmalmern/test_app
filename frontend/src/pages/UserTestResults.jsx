import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

const UserTestResults = () => {
  const [results, setResults] = useState([]);
  console.log(results);
  const getResults = async () => {
    try {
      const { data } = await api.get("/results");
      setResults(data.results);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
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
            {results.map((result, index) => (
              <div className=" " key={index + 1}>
                <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-2 flex-col">
                  <div className="px-6">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0 mt-2">
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

                      <h2 className="text-2xl font-bold text-white">
                        {result.testTitle}
                      </h2>
                    </div>

                    <p className="text-lg text-white mb-4">
                      <span className="font-semibold">{result.category}</span>
                    </p>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="text-base text-white">Togri javoblar:</p>
                        <p className="text-xl font-bold text-white">
                          {result.correctAnswers} ta
                        </p>
                      </div>
                      <div>
                        <p className="text-base text-white">Foizda:</p>
                        <p className="text-xl font-bold text-white">
                          {result.score} %
                        </p>
                      </div>
                      <div>
                        <p className="text-base text-white">Savollar soni:</p>
                        <p className="text-xl font-bold text-white">
                          {result.totalQuestions} ta
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-white">
                        {result.completedAt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTestResults;
