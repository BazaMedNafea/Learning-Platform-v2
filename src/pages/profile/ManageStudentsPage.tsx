// src/pages/profile/ManageStudentsPage.tsx
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import {
  getStudentsByParentId,
  addStudent,
  deleteStudent,
} from "../../services/student";
import { useParams } from "react-router-dom";

const ManageStudentsPage = () => {
  const { t } = useTranslation("profile");
  const { user } = useAuth();
  const { parentId } = useParams();
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    level: "",
    year: "",
    stream: "",
  });
  const [, setEditStudent] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    level: "",
    year: "",
    stream: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (parentId) {
      fetchStudents();
    }
  }, [parentId]);

  const fetchStudents = async () => {
    try {
      const students = await getStudentsByParentId(parentId as string);
      setStudents(students);
    } catch (err) {
      setError("Failed to fetch students. Please try again.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addStudent({
        firstName: newStudent.firstName,
        lastName: newStudent.lastName,
        level: newStudent.level,
        year: newStudent.year,
        stream: newStudent.stream,
        parentEmail: user?.email as string,
      });
      setNewStudent({
        firstName: "",
        lastName: "",
        level: "",
        year: "",
        stream: "",
      });
      await fetchStudents();
    } catch (err) {
      setError("Failed to add student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    setLoading(true);
    setError(null);

    try {
      await deleteStudent(studentId);
      await fetchStudents();
    } catch (err) {
      setError("Failed to delete student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {t("manageStudents")}
        </h1>
        <form onSubmit={handleAddStudent} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              {t("firstName")}
            </label>
            <input
              type="text"
              name="firstName"
              value={newStudent.firstName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              {t("lastName")}
            </label>
            <input
              type="text"
              name="lastName"
              value={newStudent.lastName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              {t("level")}
            </label>
            <input
              type="text"
              name="level"
              value={newStudent.level}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              {t("year")}
            </label>
            <input
              type="text"
              name="year"
              value={newStudent.year}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              {t("stream")}
            </label>
            <input
              type="text"
              name="stream"
              value={newStudent.stream}
              onChange={handleInputChange}
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 text-white">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
            ) : (
              t("addStudent")
            )}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t("studentList")}
          </h2>
          <ul className="space-y-4">
            {students.map((student: any) => (
              <li
                key={student.studentId}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold">{`${student.firstName} ${student.lastName}`}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {student.level} - {student.year}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditStudent(student);
                      }}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      {t("edit")}
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.studentId)}
                      className="text-red-500 hover:text-red-600"
                    >
                      {t("delete")}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageStudentsPage;
