import { useEffect, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // paginate qismi.
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categorySoni, setCategorySoni] = useState(0);
  const limit = 30;

  const Categorys = async (page) => {
    try {
      const { data } = await api.get(
        `/category/categories?page=${page}&limit=${limit}`
      );
      if (data.success) {
        setCategories(data.categories);
        setTotalPages(data.totalPages);
        setCategorySoni(data.categoriyalar_soni);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
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

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  useEffect(() => {
    Categorys(currentPage);
  }, [currentPage]);

  // categoriye qo'shish
  const [name, setName] = useState("");
  const [daraja, setDaraja] = useState("");
  const addCategory = async (e) => {
    e.preventDefault();
    if (!name || !daraja) {
      toast.error("Barcha maydonlarni to‘ldiring!");
      return;
    }
    try {
      const { data } = await api.post("/category/create-category", {
        name,
        daraja,
      });
      if (data.success) {
        Categorys();
        toast.success(data.message);
        setIsOpen(false); // Modalni yopish
        setName(""); // Forma inputlarini tozalash
        setDaraja("");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  // delete category
  const deleteCategory = async (id) => {
    try {
      const { data } = await api.delete(`/category/delete/${id}`);
      if (data.success) {
        Categorys();
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  // edit category modal
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: "",
    daraja: "",
  });

  const handleEdit = (cat) => {
    setSelectedCategory({
      id: cat._id,
      name: cat.name,
      daraja: cat.daraja,
    });
    setIsEditMode(true);
    setIsOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const { data } = await api.put(`/category/edit/${selectedCategory.id}`, {
        name: selectedCategory.name,
        daraja: selectedCategory.daraja,
      });
      if (data.success) {
        toast.success(data.message || "Muvaffaqiyatli o'zgartirildi");
        setIsOpen(false);
        setIsEditMode(false);
        navigate(`/admin/category`);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Xatolik yuz berdi");
    }
  };
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className=" text-gray-400 flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 ">
              <button
                onClick={() => setIsOpen(true)}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {` Kategoriya qo'shish`}
              </button>
              Categoriyalar Soni: {categorySoni} ta
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">s</p>
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

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {categories.map((cat) => (
              <div className="p-4" key={cat._id}>
                <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col relative">
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
                      {cat.name}
                    </h2>

                    <span className="flex items-center ml-2 text-white dark:text-white text-sm">
                      <span
                        className={`h-2.5 w-2.5 rounded-full mr-2 ${
                          cat.daraja === "qiyin"
                            ? "bg-red-500"
                            : cat.daraja === "o'rta"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></span>
                      {cat.daraja}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-3 h-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.845 18.868a4.5 4.5 0 0 1-2.121 1.185l-3.107.777a.75.75 0 0 1-.91-.91l.777-3.107a4.5 4.5 0 0 1 1.185-2.121L16.862 3.487z"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => deleteCategory(cat._id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-3 h-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex flex-col justify-between flex-grow">
                    <p className="leading-relaxed text-base text-white dark:text-gray-300">
                      {cat.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
          {/* modal */}

          <div>
            {/* Modalni ochish tugmasi */}

            {/* Modal */}
            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 shadow-lg">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {isEditMode
                        ? "Kategoriya o'zgartirish"
                        : "Yangi kategoriya qo'shish"}
                    </h3>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      ✖
                    </button>
                  </div>

                  <form
                    className="p-4 md:p-5"
                    onSubmit={isEditMode ? handleUpdate : addCategory}
                  >
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={isEditMode ? selectedCategory.name : name}
                          onChange={(e) =>
                            isEditMode
                              ? setSelectedCategory({
                                  ...selectedCategory,
                                  name: e.target.value,
                                })
                              : setName(e.target.value)
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type product name"
                          required
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Qiyinlik darajasi
                        </label>
                        <select
                          value={isEditMode ? selectedCategory.daraja : daraja}
                          onChange={(e) =>
                            isEditMode
                              ? setSelectedCategory({
                                  ...selectedCategory,
                                  daraja: e.target.value,
                                })
                              : setDaraja(e.target.value)
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option value="">Darajani tanlang</option>
                          <option value="oson">Oson</option>
                          <option value="o'rta">{`O'rta`}</option>
                          <option value="qiyin">Qiyin</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setIsOpen(false)}
                        type="button"
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                      >
                        Bekor qilish
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      >
                        {isEditMode ? "O'zgartirish" : "Qo‘shish"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategory;
