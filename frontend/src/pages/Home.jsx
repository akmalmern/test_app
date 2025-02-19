import { toast } from "react-toastify";
import api from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [testlar, setTests] = useState([]);
  const [message, setMessage] = useState("");
  const [testlar_soni, setTestlarSoni] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const allTests = async () => {
    try {
      const { data } = await api.get("/all-tests");
      if (data.success) {
        setTests(data.tests);
        setMessage(data.message);
        setTestlarSoni(data.testlar_soni);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Server bilan bog‘lanishda xatolik"
      );
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/category/categories");
      setCategories(data.categories);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Server bilan bog‘lanishda xatolik"
      );
    }
  };

  useEffect(() => {
    allTests();
    fetchCategories();
  }, []);

  const handleStartTest = async (testId) => {
    try {
      const { data } = await api.get(`/start-test/${testId}`);
      toast.success(data.message);
      navigate(`/test/${testId}`);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Server bilan bog‘lanishda xatolik"
      );
    }
  };

  const uniqueCategories = categories.filter(
    (category, index, self) =>
      index === self.findIndex((c) => c.name === category.name)
  );

  const filteredTests =
    selectedCategory === "all"
      ? testlar
      : testlar.filter((test) => test.categoryId?.name === selectedCategory);

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex text-white items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <h1>{message}</h1>
              <h1 className="ml-3">{testlar_soni}</h1> ta
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Kategoriyalar</h2>
            <ul className="flex space-x-2">
              <li
                className={`cursor-pointer px-4 py-2 rounded ${
                  selectedCategory === "all"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                Barchasi
              </li>
              {uniqueCategories.map((category) => (
                <li
                  key={category._id}
                  className={`cursor-pointer px-4 py-2 rounded ${
                    selectedCategory === category.name
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {filteredTests.length > 0 ? (
              filteredTests.map((test) => (
                <div className="p-4" key={test._id}>
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
                        {test.categoryId?.title}
                      </h2>
                      <span
                        className={`ml-2 text-xs font-medium ${
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
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-2">
                Bu kategoriya uchun testlar yo‘q.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
