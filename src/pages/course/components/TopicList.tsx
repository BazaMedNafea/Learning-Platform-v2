// components/TopicList/TopicList.tsx
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Topic } from "../../../types/types";

interface TopicListProps {
  courseId: string;
  topics: Topic[];
  onTopicDelete: (topicId: string) => void;
  onAddTopic: (title: string) => void;
}

export const TopicList: React.FC<TopicListProps> = ({
  topics,
  onTopicDelete,
  onAddTopic,
}) => {
  const [newTopicTitle, setNewTopicTitle] = useState("");

  const handleAddTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTopicTitle.trim()) {
      await onAddTopic(newTopicTitle);
      setNewTopicTitle("");
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddTopic} className="flex space-x-2">
        <input
          type="text"
          value={newTopicTitle}
          onChange={(e) => setNewTopicTitle(e.target.value)}
          placeholder="New topic title"
          className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700
                     dark:bg-green-700 dark:hover:bg-green-600"
        >
          Add Topic
        </button>
      </form>
      <div className="space-y-2">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center justify-between p-2 border rounded
                       dark:border-gray-700 dark:bg-gray-800"
          >
            <span className="dark:text-white">{topic.title}</span>
            <button
              onClick={() => onTopicDelete(topic.id)}
              className="p-1 text-red-600 hover:bg-red-100 rounded
                         dark:text-red-400 dark:hover:bg-red-900/50"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
