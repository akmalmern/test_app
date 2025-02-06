// // // import { useEffect, useState } from "react";
// // // import api from "../../api";

// // // const CreateTest = () => {
// // //   const [title, setTitle] = useState("");
// // //   const [categoryId, setCategoryId] = useState("");
// // //   const [categories, setCategories] = useState([]);
// // //   const [duration, setDuration] = useState("");
// // //   const [questions, setQuestions] = useState([]);
// // //   const [savollarSoni, setSavollarSoni] = useState("");
// // //   const [error, setError] = useState(null);
// // //   const [success, setSuccess] = useState(null);

// // //   useEffect(() => {
// // //     const fetchCategories = async () => {
// // //       try {
// // //         const response = await api.get("/category/categories");
// // //         setCategories(response.data.categories);
// // //       } catch (err) {
// // //         console.error("Kategoriya yuklashda xatolik", err);
// // //       }
// // //     };
// // //     fetchCategories();
// // //   }, []);

// // //   // Savol qo'shish
// // //   const handleAddQuestion = () => {
// // //     setQuestions([
// // //       ...questions,
// // //       { question: "", options: ["", "", "", ""], correctAnswer: "" },
// // //     ]);
// // //   };

// // //   // Savolni o'zgartirish
// // //   const handleQuestionChange = (index, value) => {
// // //     const updatedQuestions = [...questions];
// // //     updatedQuestions[index].question = value;
// // //     setQuestions(updatedQuestions);
// // //   };

// // //   // Variantni o'zgartirish
// // //   const handleOptionChange = (qIndex, vIndex, value) => {
// // //     const updatedQuestions = [...questions];
// // //     updatedQuestions[qIndex].options[vIndex] = value;
// // //     setQuestions(updatedQuestions);
// // //   };

// // //   // To'g'ri variantni tanlash
// // //   const handleCorrectAnswerChange = (qIndex, value) => {
// // //     const updatedQuestions = [...questions];
// // //     updatedQuestions[qIndex].correctAnswer = value;
// // //     setQuestions(updatedQuestions);
// // //   };

// // //   // Testni yaratish
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setError(null);
// // //     setSuccess(null);

// // //     // variantlar va to'g'ri javoblarni tekshirib yuborish
// // //     try {
// // //       const response = await api.post("/create-test", {
// // //         title,
// // //         categoryId,
// // //         duration,
// // //         questions: questions.map((q) => ({
// // //           question: q.question,
// // //           options: q.options.filter((opt) => opt.trim() !== ""), // Faqat bo'sh bo'lmagan variantlar
// // //           correctAnswer: q.correctAnswer, // To'g'ri javobni variant matni sifatida yuborish
// // //         })),
// // //         savollar_soni: Number(savollarSoni),
// // //       });

// // //       setSuccess("Test muvaffaqiyatli yaratildi");
// // //       console.log(response);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || "Xatolik yuz berdi");
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-4 sm:ml-64">
// // //       <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
// // //         <div className="flex justify-center items-center min-h-screen bg-gray-100">
// // //           <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
// // //             <h2 className="text-2xl font-semibold text-center mb-4">
// // //               Test yaratish
// // //             </h2>
// // //             {error && <p className="text-red-500 text-center">{error}</p>}
// // //             {success && <p className="text-green-500 text-center">{success}</p>}
// // //             <form onSubmit={handleSubmit} className="space-y-4">
// // //               <input
// // //                 type="text"
// // //                 placeholder="Sarlavha"
// // //                 value={title}
// // //                 onChange={(e) => setTitle(e.target.value)}
// // //                 required
// // //                 className="w-full p-2 border rounded"
// // //               />
// // //               <select
// // //                 value={categoryId}
// // //                 onChange={(e) => setCategoryId(e.target.value)}
// // //                 required
// // //                 className="w-full p-2 border rounded"
// // //               >
// // //                 <option value="">Kategoriya tanlang</option>
// // //                 {categories.map((category) => (
// // //                   <option key={category._id} value={category._id}>
// // //                     {category.name}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //               <input
// // //                 type="number"
// // //                 placeholder="Davomiylik (daqiqa)"
// // //                 value={duration}
// // //                 onChange={(e) => setDuration(e.target.value)}
// // //                 required
// // //                 className="w-full p-2 border rounded"
// // //               />
// // //               <input
// // //                 type="number"
// // //                 placeholder="Savollar soni"
// // //                 value={savollarSoni}
// // //                 onChange={(e) => setSavollarSoni(e.target.value)}
// // //                 required
// // //                 className="w-full p-2 border rounded"
// // //               />
// // //               <button
// // //                 type="button"
// // //                 onClick={handleAddQuestion}
// // //                 className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
// // //               >
// // //                 Savol qo‘shish
// // //               </button>
// // //               {questions.map((question, qIndex) => (
// // //                 <div key={qIndex} className="border p-4 rounded mt-2">
// // //                   <input
// // //                     type="text"
// // //                     placeholder={`Savol ${qIndex + 1}`}
// // //                     value={question.question}
// // //                     onChange={(e) =>
// // //                       handleQuestionChange(qIndex, e.target.value)
// // //                     }
// // //                     required
// // //                     className="w-full p-2 border rounded mb-2"
// // //                   />
// // //                   {question.options.map((option, vIndex) => (
// // //                     <div key={vIndex} className="flex items-center space-x-2">
// // //                       <input
// // //                         type="text"
// // //                         placeholder={`Variant ${vIndex + 1}`}
// // //                         value={option}
// // //                         onChange={(e) =>
// // //                           handleOptionChange(qIndex, vIndex, e.target.value)
// // //                         }
// // //                         required
// // //                         className="w-full p-2 border rounded"
// // //                       />
// // //                     </div>
// // //                   ))}
// // //                   <div>
// // //                     <label className="text-sm font-semibold">
// // //                       To'g'ri javob:
// // //                     </label>
// // //                     {question.options.map((option, vIndex) => (
// // //                       <div key={vIndex} className="flex items-center space-x-2">
// // //                         <input
// // //                           type="radio"
// // //                           name={`correct-${qIndex}`}
// // //                           checked={question.correctAnswer === option}
// // //                           onChange={() =>
// // //                             handleCorrectAnswerChange(qIndex, option)
// // //                           }
// // //                         />
// // //                         <label>{option}</label>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //               <button
// // //                 type="submit"
// // //                 className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
// // //               >
// // //                 Test yaratish
// // //               </button>
// // //             </form>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CreateTest;
// // import { useEffect, useState } from "react";
// // import api from "../../api";

// // const CreateTest = () => {
// //   const [title, setTitle] = useState("");
// //   const [categoryId, setCategoryId] = useState("");
// //   const [categories, setCategories] = useState([]);
// //   const [duration, setDuration] = useState("");
// //   const [questions, setQuestions] = useState([]);
// //   const [savollarSoni, setSavollarSoni] = useState("");
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(null);

// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         const response = await api.get("/category/categories");
// //         setCategories(response.data.categories);
// //       } catch (err) {
// //         console.error("Kategoriya yuklashda xatolik", err);
// //       }
// //     };
// //     fetchCategories();
// //   }, []);

// //   // Savol qo'shish
// //   const handleAddQuestion = () => {
// //     setQuestions([
// //       ...questions,
// //       { question: "", options: ["", "", "", ""], correctAnswer: null },
// //     ]);
// //   };

// //   // Savol matnini yangilash
// //   const handleQuestionChange = (index, value) => {
// //     const updatedQuestions = [...questions];
// //     updatedQuestions[index].question = value;
// //     setQuestions(updatedQuestions);
// //   };

// //   // Variant matnini yangilash
// //   const handleVariantChange = (qIndex, vIndex, value) => {
// //     const updatedQuestions = [...questions];
// //     updatedQuestions[qIndex].options[vIndex] = value;
// //     setQuestions(updatedQuestions);
// //   };

// //   // To'g'ri variantni tanlash (Indeks bilan)
// //   const handleCorrectAnswerChange = (qIndex, vIndex) => {
// //     const updatedQuestions = [...questions];
// //     updatedQuestions[qIndex].correctAnswer = vIndex;
// //     setQuestions(updatedQuestions);
// //   };

// //   // Test yuborish
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError(null);
// //     setSuccess(null);

// //     try {
// //       const response = await api.post("/create-test", {
// //         title,
// //         categoryId,
// //         duration,
// //         questions: questions.map((q) => ({
// //           question: q.question,
// //           options: q.options.filter((opt) => opt.trim() !== ""), // Faqat bo'sh bo'lmagan variantlar
// //           correctAnswer: q.correctAnswer, // Indeks sifatida yuboramiz
// //         })),
// //         savollar_soni: Number(savollarSoni),
// //       });

// //       setSuccess("Test muvaffaqiyatli yaratildi");
// //       console.log(response);
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Xatolik yuz berdi");
// //     }
// //   };

// //   return (
// //     <div className="p-4 sm:ml-64">
// //       <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
// //         <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800 mt-5 pt-5">
// //           <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
// //             <h2 className="text-2xl font-semibold text-center mb-4">
// //               Test yaratish
// //             </h2>
// //             {error && <p className="text-red-500 text-center">{error}</p>}
// //             {success && <p className="text-green-500 text-center">{success}</p>}
// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               <input
// //                 type="text"
// //                 placeholder="Sarlavha"
// //                 value={title}
// //                 onChange={(e) => setTitle(e.target.value)}
// //                 required
// //                 className="w-full p-2 border rounded"
// //               />
// //               <select
// //                 value={categoryId}
// //                 onChange={(e) => setCategoryId(e.target.value)}
// //                 required
// //                 className="w-full p-2 border rounded"
// //               >
// //                 <option value="">Kategoriya tanlang</option>
// //                 {categories.map((category) => (
// //                   <option key={category._id} value={category._id}>
// //                     {category.name}
// //                   </option>
// //                 ))}
// //               </select>
// //               <input
// //                 type="number"
// //                 placeholder="Davomiylik (daqiqa)"
// //                 value={duration}
// //                 onChange={(e) => setDuration(e.target.value)}
// //                 required
// //                 className="w-full p-2 border rounded"
// //               />
// //               <input
// //                 type="number"
// //                 placeholder="Savollar soni"
// //                 value={savollarSoni}
// //                 onChange={(e) => setSavollarSoni(e.target.value)}
// //                 required
// //                 className="w-full p-2 border rounded"
// //               />
// //               <button
// //                 type="button"
// //                 onClick={handleAddQuestion}
// //                 className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
// //               >
// //                 Savol qo‘shish
// //               </button>
// //               {questions.map((question, qIndex) => (
// //                 <div key={qIndex} className="border p-4 rounded mt-2">
// //                   <input
// //                     type="text"
// //                     placeholder={`Savol ${qIndex + 1}`}
// //                     value={question.question}
// //                     onChange={(e) =>
// //                       handleQuestionChange(qIndex, e.target.value)
// //                     }
// //                     required
// //                     className="w-full p-2 border rounded mb-2"
// //                   />
// //                   {question.options.map((variant, vIndex) => (
// //                     <div key={vIndex} className="flex items-center space-x-2">
// //                       <input
// //                         type="text"
// //                         placeholder={`Variant ${vIndex + 1}`}
// //                         value={variant}
// //                         onChange={(e) =>
// //                           handleVariantChange(qIndex, vIndex, e.target.value)
// //                         }
// //                         required
// //                         className="w-full p-2 border rounded"
// //                       />
// //                       <input
// //                         type="radio"
// //                         name={`correct-${qIndex}`}
// //                         checked={question.correctAnswer === vIndex} // Indeksni solishtiramiz
// //                         onChange={() =>
// //                           handleCorrectAnswerChange(qIndex, vIndex)
// //                         } // Indeksni o'zgartiramiz
// //                       />
// //                     </div>
// //                   ))}
// //                 </div>
// //               ))}
// //               <button
// //                 type="submit"
// //                 className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
// //               >
// //                 Test yaratish
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateTest;
// import { useEffect, useState } from "react";
// import api from "../../api";

// const CreateTest = () => {
//   const [title, setTitle] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [duration, setDuration] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const [savollarSoni, setSavollarSoni] = useState("");
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await api.get("/category/categories");
//         setCategories(response.data.categories);
//       } catch (err) {
//         console.error("Kategoriya yuklashda xatolik", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Savol qo'shish
//   const handleAddQuestion = () => {
//     setQuestions([
//       ...questions,
//       { question: "", options: ["", "", "", ""], correctAnswer: null },
//     ]);
//   };

//   // Savol matnini yangilash
//   const handleQuestionChange = (index, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index].question = value;
//     setQuestions(updatedQuestions);
//   };

//   // Variant matnini yangilash
//   const handleVariantChange = (qIndex, vIndex, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].options[vIndex] = value;
//     setQuestions(updatedQuestions);
//   };

//   // To'g'ri variantni tanlash (Indeks bilan)
//   const handleCorrectAnswerChange = (qIndex, vIndex) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].correctAnswer = vIndex;
//     setQuestions(updatedQuestions);
//   };

//   // Savolni o'chirish
//   const handleDeleteQuestion = (index) => {
//     const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
//     setQuestions(updatedQuestions);
//   };

//   // Test yuborish
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await api.post("/create-test", {
//         title,
//         categoryId,
//         duration,
//         questions: questions.map((q) => ({
//           question: q.question,
//           options: q.options.filter((opt) => opt.trim() !== ""), // Faqat bo'sh bo'lmagan variantlar
//           correctAnswer: q.correctAnswer, // Indeks sifatida yuboramiz
//         })),
//         savollar_soni: Number(savollarSoni),
//       });

//       setSuccess("Test muvaffaqiyatli yaratildi");
//       console.log(response);
//     } catch (err) {
//       console.log(err);
//       setError(err.response?.data?.message || "Xatolik yuz berdi");
//     }
//   };

//   return (
//     <div className="p-4 sm:ml-64">
//       <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
//         <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800 mt-5 pt-5">
//           <div
//             className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
//             style={{ marginTop: "200px" }}
//           >
//             <h2 className="text-2xl font-semibold text-center mb-4">
//               Test yaratish
//             </h2>
//             {error && <p className="text-red-500 text-center">{error}</p>}
//             {success && <p className="text-green-500 text-center">{success}</p>}
//             <form
//               onSubmit={handleSubmit}
//               className="space-y-4 overflow-y-auto max-h-[400px]"
//             >
//               <input
//                 type="text"
//                 placeholder="Sarlavha"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//               <select
//                 value={categoryId}
//                 onChange={(e) => setCategoryId(e.target.value)}
//                 required
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="">Kategoriya tanlang</option>
//                 {categories.map((category) => (
//                   <option key={category._id} value={category._id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 type="number"
//                 placeholder="Davomiylik (daqiqa)"
//                 value={duration}
//                 onChange={(e) => setDuration(e.target.value)}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="number"
//                 placeholder="Savollar soni"
//                 value={savollarSoni}
//                 onChange={(e) => setSavollarSoni(e.target.value)}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//               <button
//                 type="button"
//                 onClick={handleAddQuestion}
//                 className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//               >
//                 Savol qo‘shish
//               </button>
//               {questions.map((question, qIndex) => (
//                 <div key={qIndex} className="border p-4 rounded mt-2">
//                   <input
//                     type="text"
//                     placeholder={`Savol ${qIndex + 1}`}
//                     value={question.question}
//                     onChange={(e) =>
//                       handleQuestionChange(qIndex, e.target.value)
//                     }
//                     required
//                     className="w-full p-2 border rounded mb-2"
//                   />
//                   {question.options.map((variant, vIndex) => (
//                     <div key={vIndex} className="flex items-center space-x-2">
//                       <input
//                         type="text"
//                         placeholder={`Variant ${vIndex + 1}`}
//                         value={variant}
//                         onChange={(e) =>
//                           handleVariantChange(qIndex, vIndex, e.target.value)
//                         }
//                         required
//                         className="w-full p-2 border rounded"
//                       />
//                       <input
//                         type="radio"
//                         name={`correct-${qIndex}`}
//                         checked={question.correctAnswer === vIndex} // Indeksni solishtiramiz
//                         onChange={() =>
//                           handleCorrectAnswerChange(qIndex, vIndex)
//                         } // Indeksni o'zgartiramiz
//                       />
//                     </div>
//                   ))}
//                   {/* Savolni o'chirish tugmasi */}
//                   <button
//                     type="button"
//                     onClick={() => handleDeleteQuestion(qIndex)}
//                     className="text-red-500 mt-2 hover:text-red-700"
//                   >
//                     Savolni o'chirish
//                   </button>
//                 </div>
//               ))}
//               <button
//                 type="submit"
//                 className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
//               >
//                 Test yaratish
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateTest;
import { useEffect, useState } from "react";
import api from "../../api";

const CreateTest = () => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [duration, setDuration] = useState("");
  const [questions, setQuestions] = useState([]);
  const [savollarSoni, setSavollarSoni] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/category/categories");
        setCategories(response.data.categories);
      } catch (err) {
        console.error("Kategoriya yuklashda xatolik", err);
      }
    };
    fetchCategories();
  }, []);

  // Savol qo'shish
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: null },
    ]);
  };

  // Savol matnini yangilash
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  // Variant matnini yangilash
  const handleVariantChange = (qIndex, vIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[vIndex] = value;
    setQuestions(updatedQuestions);
  };

  // To'g'ri variantni tanlash (Indeks bilan)
  const handleCorrectAnswerChange = (qIndex, vIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = vIndex;
    setQuestions(updatedQuestions);
  };

  // Savolni o'chirish
  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updatedQuestions);
  };

  // Test yuborish
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Savollarni tekshirish
    const incompleteQuestions = questions.filter(
      (q) => !q.correctAnswer || !q.question || q.options.includes("")
    );

    if (incompleteQuestions.length > 0) {
      setError(
        "Barcha savollarni to'liq to'ldiring va to'g'ri variantni tanlang!"
      );
      return;
    }

    try {
      const response = await api.post("/create-test", {
        title,
        categoryId,
        duration,
        questions: questions.map((q) => ({
          question: q.question,
          options: q.options.filter((opt) => opt.trim() !== ""), // Faqat bo'sh bo'lmagan variantlar
          correctAnswer: q.correctAnswer, // Indeks sifatida yuboramiz
        })),
        savollar_soni: Number(savollarSoni),
      });

      setSuccess("Test muvaffaqiyatli yaratildi");
      console.log(response);
    } catch (err) {
      setError(err.response?.data?.message || "Xatolik yuz berdi");
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800 mt-5 pt-5">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Test yaratish
            </h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 overflow-y-auto max-h-[400px] mb-12"
            >
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
                    {category.name}
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
                    !question.correctAnswer
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="text"
                    placeholder={`Savol ${qIndex + 1}`}
                    value={question.question}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, e.target.value)
                    }
                    required
                    className="w-full p-2 border rounded mb-2"
                  />
                  {question.options.map((variant, vIndex) => (
                    <div key={vIndex} className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder={`Variant ${vIndex + 1}`}
                        value={variant}
                        onChange={(e) =>
                          handleVariantChange(qIndex, vIndex, e.target.value)
                        }
                        required
                        className="w-full p-2 border rounded"
                      />
                      <input
                        type="radio"
                        name={`correct-${qIndex}`}
                        checked={question.correctAnswer === vIndex} // Indeksni solishtiramiz
                        onChange={() =>
                          handleCorrectAnswerChange(qIndex, vIndex)
                        } // Indeksni o'zgartiramiz
                      />
                    </div>
                  ))}
                  {/* Savolni o'chirish tugmasi */}
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(qIndex)}
                    className="text-red-500 mt-2 hover:text-red-700"
                  >
                    Savolni o'chirish
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddQuestion}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Savol qo‘shish
              </button>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Test yaratish
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;
