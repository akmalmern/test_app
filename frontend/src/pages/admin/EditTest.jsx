import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";

const EditTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const { data } = await api.get(`/one-test/${id}`);
        setTest(data.test);
        setQuestions(data.test.questions || []);
      } catch (error) {
        toast.error(error.response?.data?.error || "Xatolik yuz berdi");
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/category/categories");
        setCategories(data.categories || []);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };

    fetchTest();
    fetchCategories();
  }, [id]);

  const handleInputChange = (e) => {
    setTest({ ...test, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setTest({ ...test, categoryId: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const updateTest = async () => {
    try {
      const { data } = await api.put(`/edit/test/${id}`, {
        ...test,
        questions,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/admin/testlar");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Testni yangilashda xatolik");
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
        <h2 className="text-2xl font-semibold">Testni Taxrirlash</h2>
        {test && (
          <>
            <div className="mb-4">
              <label className="block">Test Nomi:</label>
              <input
                type="text"
                name="title"
                value={test.title}
                onChange={handleInputChange}
                className="border p-2 w-full"
              />
            </div>

            {/* Kategoriya tanlash */}
            <div className="mb-4">
              <label className="block">Kategoriya:</label>
              <select
                name="categoryId"
                value={test.categoryId || ""}
                onChange={handleCategoryChange}
                className="border p-2 w-full"
              >
                <option value="">Kategoriya tanlang</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block">Belgilangan vaqt (daqiqa):</label>
              <input
                type="number"
                name="duration"
                value={test.duration}
                onChange={handleInputChange}
                className="border p-2 w-full"
              />
            </div>

            <h3 className="text-xl font-semibold mt-4">
              Savollarni Taxrirlash
            </h3>
            {questions.map((q, index) => (
              <div key={index} className="border p-4 mb-4">
                <label className="block">Savol {index + 1}:</label>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(index, "question", e.target.value)
                  }
                  className="border p-2 w-full"
                />

                <label className="block mt-2">Javoblar:</label>
                {q.options.map((ans, ansIndex) => (
                  <input
                    key={ansIndex}
                    type="text"
                    value={ans}
                    onChange={(e) => {
                      const newAnswers = [...q.options];
                      newAnswers[ansIndex] = e.target.value;
                      handleQuestionChange(index, "options", newAnswers);
                    }}
                    className="border p-2 w-full mb-2"
                  />
                ))}

                <label className="block mt-2">To‘g‘ri javob:</label>
                <input
                  type="text"
                  value={q.correctAnswer || ""}
                  onChange={(e) =>
                    handleQuestionChange(index, "correctAnswer", e.target.value)
                  }
                  className="border p-2 w-full"
                />
              </div>
            ))}

            <button
              onClick={updateTest}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Yangilash
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditTest;
