// components/CourseForm/CourseForm.tsx

import React, { useState, useEffect } from "react";
import { Course } from "../../../types/types";
import { getTeacherSubjects } from "../../../services/teacher";
import { useAuth } from "../../../contexts/AuthContext"; // Add this import

interface Subject {
  subjectId: string;
  name: string;
  level: "PRIMARY" | "MIDDLE" | "SECONDARY";
  stream: string | null;
  year: string;
}

interface CourseFormProps {
  initialData?: Course;
  onSubmit: (data: FormData) => void; // Update onSubmit to accept FormData
  onCancel: () => void;
}

export const CourseForm: React.FC<CourseFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { user } = useAuth(); // Get user info from AuthContext
  const [formData, setFormData] = useState<Omit<Course, "id">>({
    courseId: initialData?.courseId || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    isPublic: initialData?.isPublic || false,
    subjectId: initialData?.subjectId || "",
    image: initialData?.image || "",
  });

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedStream, setSelectedStream] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Get unique values for each filter
  const levels = Array.from(new Set(subjects.map((s) => s.level)));
  const years = Array.from(
    new Set(
      subjects
        .filter((s) => !selectedLevel || s.level === selectedLevel)
        .map((s) => s.year)
    )
  );
  const streams = Array.from(
    new Set(
      subjects
        .filter(
          (s) =>
            (!selectedLevel || s.level === selectedLevel) &&
            (!selectedYear || s.year === selectedYear)
        )
        .map((s) => s.stream)
        .filter(Boolean)
    )
  );

  // Filter subjects based on selections
  const filteredSubjects = subjects.filter(
    (subject) =>
      (!selectedLevel || subject.level === selectedLevel) &&
      (!selectedYear || subject.year === selectedYear) &&
      (!selectedStream || subject.stream === selectedStream)
  );

  useEffect(() => {
    console.log("Initial Data:", initialData);
  }, [initialData]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (user?.teacherId) {
        const fetchedSubjects = await getTeacherSubjects(user.teacherId);
        setSubjects(fetchedSubjects);
      }
    };
    fetchSubjects();
  }, [user?.teacherId]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        courseId: initialData.courseId || "",
        title: initialData.title || "",
        description: initialData.description || "",
        isPublic: initialData.isPublic || false,
        subjectId: initialData.subjectId || "",
        image: initialData.image || "",
      });

      // Set the initial level, year, and stream based on the subject
      const initialSubject = subjects.find(
        (s) => s.subjectId === initialData.subjectId
      );
      if (initialSubject) {
        setSelectedLevel(initialSubject.level);
        setSelectedYear(initialSubject.year);
        setSelectedStream(initialSubject.stream || "");
      }
    }
  }, [initialData, subjects]);

  // Reset dependent fields when a parent field changes
  useEffect(() => {
    setSelectedYear("");
    setSelectedStream("");
    setFormData((prev) => ({ ...prev, subjectId: "" }));
  }, [selectedLevel]);

  useEffect(() => {
    setSelectedStream("");
    setFormData((prev) => ({ ...prev, subjectId: "" }));
  }, [selectedYear]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, subjectId: "" }));
  }, [selectedStream]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a FormData object
    const formDataToSend = new FormData();

    // Append the form data to the FormData object
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description || "");
    formDataToSend.append("isPublic", formData.isPublic ? "true" : "false");
    formDataToSend.append("subjectId", formData.subjectId);

    // If there's a new image file, append it to the FormData object
    if (imageFile) {
      formDataToSend.append("image", imageFile);
    } else if (formData.image) {
      // If no new image, but existing image URL, append it as a string
      formDataToSend.append("image", formData.image);
    }

    // Call the onSubmit function with the FormData object
    onSubmit(formDataToSend);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-200">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-200">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          rows={3}
        />
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Education Level
          </label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">Select Level</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level.charAt(0) + level.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        {selectedLevel && (
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year.charAt(0) + year.slice(1).toLowerCase()} Year
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedLevel === "SECONDARY" && selectedYear && (
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Stream
            </label>
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="">Select Stream</option>
              {streams.map((stream) => (
                <option key={stream} value={stream || ""}>
                  {stream && stream.charAt(0) + stream.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
        )}

        {filteredSubjects.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Subject
            </label>
            <select
              value={formData.subjectId}
              onChange={(e) =>
                setFormData({ ...formData, subjectId: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            >
              <option value="">Select Subject</option>
              {filteredSubjects.map((subject) => (
                <option key={subject.subjectId} value={subject.subjectId}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-200">
          Course Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setImageFile(e.target.files[0]);
            }
          }}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.isPublic}
          onChange={(e) =>
            setFormData({ ...formData, isPublic: e.target.checked })
          }
          className="rounded dark:bg-gray-800 dark:border-gray-700"
        />
        <label className="text-sm font-medium dark:text-gray-200">
          Make Course Public
        </label>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-100 
                   dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 
                   dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          {initialData ? "Update Course" : "Create Course"}
        </button>
      </div>
    </form>
  );
};
