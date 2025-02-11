// components/CourseCard/CourseCard.tsx
import React from "react";
import { Edit, Trash2, Book } from "lucide-react";
import { Course } from "../../../types/types";

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (courseId: string) => void;
  onManageTopics: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEdit,
  onDelete,
  onManageTopics,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold dark:text-white">
            {course.title}
          </h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(course)}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => course.courseId && onDelete(course.courseId)}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
      <div className="flex justify-between items-center">
        <span
          className={`px-2 py-1 rounded text-sm ${
            course.isPublic
              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {course.isPublic ? "Public" : "Private"}
        </span>
        <button
          onClick={() => onManageTopics(course)}
          className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <Book size={16} />
          <span>Manage Topics</span>
        </button>
      </div>
      {/* Image Section */}
      {course.image && (
        <div className="relative w-full h-24 overflow-hidden rounded-lg mt-4">
          <img
            src={`data:image/png;base64,${course.image}`}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};
