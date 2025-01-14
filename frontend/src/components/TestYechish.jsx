import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

const TestYechish = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const { data } = await api.get(`/start-test/${testId}`);
        setTest(data.test);

        // Backenddan kelgan `endTime` asosida qolgan vaqtni hisoblash
        const endTime = new Date(data.test.endTime);
        const currentTime = new Date();
        const timeLeft = Math.max(0, endTime.getTime() - currentTime.getTime()); // Qolgan vaqt
        setRemainingTime(timeLeft);

        if (timeLeft <= 0) {
          handleSubmit(); // Vaqt tugagan bo'lsa, avtomatik yakunlash
        }
      } catch (error) {
        console.error("Test yuklashda xatolik:", error);
        toast.error(
          error.response?.data?.error || "Testni yuklashda xatolik yuz berdi"
        );
      }
    };

    fetchTest();
  }, [testId]);

  // Qolgan vaqtni kuzatish va taymerni boshqarish
  useEffect(() => {
    if (!remainingTime) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          handleSubmit(); // Vaqt tugaganda avtomatik yuborish
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  // Javoblarni saqlash
  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  // Javoblarni yuborish
  const handleSubmit = async () => {
    try {
      const { data } = await api.post(`/submit-test/${testId}`, { answers });
      setResult(data.result);
      toast.success(data.message);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error(
        error.response?.data?.error || "Javoblarni yuborishda xatolik yuz berdi"
      );
    }
  };

  // Taymerni formatlash
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!test) return <p>Test yuklanmoqda...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">{test.title}</h1>
      <p className="text-center text-red-500">
        Qolgan vaqt:{" "}
        {remainingTime !== null ? formatTime(remainingTime) : "Tugadi"}
      </p>
      <div className="space-y-6">
        {test.questions.map((q) => (
          <div key={q.questionId} className="p-4 border rounded-lg">
            <p className="font-medium">{q.question}</p>
            <div className="mt-2 space-y-2">
              {q.options.map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={q.questionId}
                    value={option}
                    checked={answers[q.questionId] === option}
                    onChange={() => handleAnswerChange(q.questionId, option)}
                    className="form-radio"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        onClick={handleSubmit}
        disabled={remainingTime === 0} // Tugashdan so'ng tugmani o'chirish
      >
        Javoblarni yuborish
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <h2 className="text-xl font-bold">Natija:</h2>
          <p>Togri javoblar soni: {result.correctAnswers}</p>
          <p>Umumiy savollar soni: {result.totalQuestions}</p>
        </div>
      )}
    </div>
  );
};

export default TestYechish;
