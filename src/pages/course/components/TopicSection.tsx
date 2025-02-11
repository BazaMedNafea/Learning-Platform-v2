import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { Topic, Content } from "../../../types/types";
import { ContentForm } from "./ContentForm";

interface TopicSectionProps {
  topic: Topic;
  onDeleteTopic: (topicId: string) => void;
  onAddContent: (topicId: string, content: Content) => void;
}

export const TopicSection: React.FC<TopicSectionProps> = ({
  topic,
  onDeleteTopic,
  onAddContent,
}) => {
  const [isAddingContent, setIsAddingContent] = useState(false);

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-medium dark:text-white">{topic.title}</h4>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsAddingContent(!isAddingContent)}
            className="p-1 text-blue-600 hover:bg-blue-100 rounded dark:text-blue-400 dark:hover:bg-blue-900/50"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={() => onDeleteTopic(topic.topicId!)}
            className="p-1 text-red-600 hover:bg-red-100 rounded dark:text-red-400 dark:hover:bg-red-900/50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {isAddingContent && (
        <div className="mt-4">
          <ContentForm
            onSubmit={(content) => {
              onAddContent(topic.topicId!, content);
              setIsAddingContent(false);
            }}
            onCancel={() => setIsAddingContent(false)}
            topicId={topic.topicId!}
          />
        </div>
      )}

      <div className="mt-4 space-y-2">
        {topic.contents?.map((content) => (
          <div
            key={content.contentId}
            className="bg-white dark:bg-gray-800 rounded-lg p-3"
          >
            <p className="text-gray-700 dark:text-gray-300">{content.data}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
