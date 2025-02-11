import React, { useState } from "react";
import { ChevronDown, ChevronUp, Trash2, Edit } from "lucide-react";
import { Course, Content } from "../../../types/types";
import { TopicSection } from "./TopicSection";

interface CourseAccordionProps {
  course: Course;
  onEdit: () => void;
  onDelete: (courseId: string) => void;
  onAddTopic: (title: string, courseId: string) => void;
  onDeleteTopic: (topicId: string) => void;
  onAddContent: (topicId: string, content: Content) => void;
  onUpdateTopic: (topicId: string, newTitle: string) => void;
  onUpdateContent: (
    contentId: string,
    newType: string,
    newData: string
  ) => void;
}

export const CourseAccordion: React.FC<CourseAccordionProps> = ({
  course,
  onEdit,
  onDelete,
  onAddTopic,
  onDeleteTopic,
  onAddContent,
  onUpdateTopic,
  onUpdateContent,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");

  const handleAddTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTopicTitle.trim() && course.courseId) {
      await onAddTopic(newTopicTitle, course.courseId);
      setNewTopicTitle("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold dark:text-white">
            {course.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {course.description}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => course.courseId && onDelete(course.courseId)}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <form onSubmit={handleAddTopic} className="flex space-x-2">
            <input
              type="text"
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
              placeholder="New topic title"
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
            >
              Add Topic
            </button>
          </form>

          {course.topics?.map((topic) => (
            <TopicSection
              key={topic.topicId}
              topic={topic}
              onDeleteTopic={onDeleteTopic}
              onAddContent={onAddContent}
              onUpdateTopic={onUpdateTopic}
              onUpdateContent={onUpdateContent}
            />
          ))}
        </div>
      )}
    </div>
  );
};
