import { useState } from "react";
import api from "../../api";

const TestResultsModal = ({ test, onClose }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResults = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/test-users/${id}`);

      if (data.success) {
        setUsers(data.users);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    fetchResults();
  }, [test]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{test.title} natijalari</h2>
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          ✖
        </button>
        {loading ? (
          <p>Yuklanmoqda...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : users.length > 0 ? (
          <ul className="space-y-2">
            {users.map((user, index) => (
              <li key={index} className="p-2 bg-gray-100 rounded">
                <p className="font-semibold">{user.userName}</p>
                <p>Email: {user.email}</p>
                <p>Natija: {user.score}%</p>
                <p>Yakunlangan: {user.completedAt}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Bu testni hech kim yechmagan.</p>
        )}
      </div>
    </div>
  );
};

export default TestResultsModal;
