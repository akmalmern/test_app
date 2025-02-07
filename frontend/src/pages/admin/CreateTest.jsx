import { useEffect, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";

const CreateTest = () => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [duration, setDuration] = useState("");
  const [questions, setQuestions] = useState([]);
  const [savollarSoni, setSavollarSoni] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [invalidQuestions, setInvalidQuestions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/category/categories");
        setCategories(response.data.categories);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    };
    fetchCategories();
  }, []);

  const getSavolStatusMessage = () => {
    const qolganMiqdor = savollarSoni - questions.length;
    if (!savollarSoni || savollarSoni <= 0) return "";
    if (qolganMiqdor > 0)
      return `Siz yana ${qolganMiqdor} ta savol qo‘shishingiz kerak`;
    return (
      <span style={{ color: "green" }}>
        Siz ${savollarSoni} ta savol qo‘shib bo‘ldingiz!
      </span>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const invalidQIndexes = questions.reduce((acc, q, index) => {
      if (!q.question || q.options.includes("") || q.correctAnswer === null) {
        acc.push(index);
      }
      return acc;
    }, []);

    if (invalidQIndexes.length > 0) {
      setInvalidQuestions(invalidQIndexes);
      toast.error(
        "Barcha savollarni to'liq to'ldiring va to'g'ri variantni tanlang!"
      );
      setError(
        "Barcha savollarni to'liq to'ldiring va to'g'ri variantni tanlang!"
      );
      return;
    }

    try {
      const { data } = await api.post("/create-test", {
        title,
        categoryId,
        duration,
        questions: questions.map((q) => ({
          question: q.question,
          options: q.options.filter((opt) => opt.trim() !== ""),
          correctAnswer: q.correctAnswer,
        })),
        savollar_soni: Number(savollarSoni),
      });

      toast.success(data.message);
      setInvalidQuestions([]);

      setTitle("");
      setCategoryId("");
      setDuration("");
      setSavollarSoni("");
      setQuestions([]);
    } catch (err) {
      setError(err.response?.data?.message || "Xatolik yuz berdi");
    }
  };

  const handleAddQuestion = () => {
    if (savollarSoni && questions.length >= savollarSoni) return;
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: null },
    ]);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
              <h2 className="text-2xl font-semibold text-center mb-4">
                Test yaratish
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Sarlavha"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">Kategoriya tanlang</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}(qiyinlik darajasi=_{category.daraja})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Davomiylik (daqiqa)"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Savollar soni"
                  value={savollarSoni}
                  onChange={(e) => setSavollarSoni(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />

                {questions.map((question, qIndex) => (
                  <div
                    key={qIndex}
                    className={`border p-4 rounded mt-2 ${
                      invalidQuestions.includes(qIndex) ? "border-red-500" : ""
                    }`}
                  >
                    <input
                      type="text"
                      placeholder={`Savol ${qIndex + 1}`}
                      value={question.question}
                      onChange={(e) => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[qIndex].question = e.target.value;
                        setQuestions(updatedQuestions);
                      }}
                      required
                      className="w-full p-2 border rounded mb-2"
                    />
                    {question.options.map((option, vIndex) => (
                      <div key={vIndex} className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder={`Variant ${vIndex + 1}`}
                          value={option}
                          onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[qIndex].options[vIndex] =
                              e.target.value;
                            setQuestions(updatedQuestions);
                          }}
                          required
                          className="w-full p-2 border rounded"
                        />
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={question.correctAnswer === option}
                          onChange={() => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[qIndex].correctAnswer = option;
                            setQuestions(updatedQuestions);
                          }}
                        />
                      </div>
                    ))}

                    {/* 🗑 Savolni o‘chirish tugmasi */}
                    <span
                      onClick={() => handleDeleteQuestion(qIndex)}
                      style={{
                        color: "red",
                        cursor: "pointer",
                      }}
                    >
                      O‘chirish
                    </span>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddQuestion}
                  disabled={savollarSoni && questions.length >= savollarSoni}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4"
                >
                  Savol qo‘shish
                </button>

                <p className="text-center text-gray-700 font-semibold mt-2">
                  {getSavolStatusMessage()}
                </p>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mt-4"
                >
                  Test yaratish
                </button>
              </form>
              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && (
                <p className="text-green-500 text-center">{success}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTest;
