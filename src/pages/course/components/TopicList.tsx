// components/TopicList.tsx
import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { Topic, Content } from "../../../types/types";
import { Modal } from "./Modal";
import { ContentForm } from "./ContentForm";
import { addContentToTopic } from "../../../services/course";

interface TopicListProps {
  courseId: string;
  topics: Topic[];
  onTopicDelete: (topicId: string) => void;
  onAddTopic: (title: string, courseId: string) => void;
}

export const TopicList: React.FC<TopicListProps> = ({
  courseId,
  topics,
  onTopicDelete,
  onAddTopic,
}) => {
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const handleAddTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTopicTitle.trim()) {
      await onAddTopic(newTopicTitle, courseId);
      setNewTopicTitle("");
    }
  };

  const handleAddContent = async (content: Content) => {
    if (selectedTopic) {
      try {
        console.log("Adding content with payload:", content);
        await addContentToTopic(
          selectedTopic.topicId!,
          content.type,
          content.data
        );
        const updatedTopics = topics.map((topic) =>
          topic.topicId === selectedTopic.topicId
            ? {
                ...topic,
                contents: [...topic.contents, content],
              }
            : topic
        );
        onTopicContentUpdate(updatedTopics);
        setIsContentModalOpen(false);
      } catch (error) {
        console.error("Error adding content:", error);
      }
    }
  };

  const onTopicContentUpdate = (updatedTopics: Topic[]) => {
    console.log("Updated Topics:", updatedTopics);
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
        {topics.length > 0 ? (
          topics.map((topic) => (
            <div
              key={topic.topicId || ""}
              className="flex items-center justify-between p-2 border rounded
                         dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex-1">
                <span className="dark:text-white">{topic.title}</span>
                {topic.contents.map((content) => (
                  <div key={content.contentId}>
                    <p className="text-gray-700 dark:text-gray-300">
                      {content.data}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedContent(null);
                    setSelectedTopic(topic);
                    setIsContentModalOpen(true);
                  }}
                  className="p-1 text-blue-600 hover:bg-blue-100 rounded
                             dark:text-blue-400 dark:hover:bg-blue-900/50"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() =>
                    topic.topicId && onTopicDelete(String(topic.topicId))
                  }
                  className="p-1 text-red-600 hover:bg-red-100 rounded
                             dark:text-red-400 dark:hover:bg-red-900/50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No topics yet. Add a new topic above.
          </p>
        )}
      </div>
      <Modal
        isOpen={isContentModalOpen}
        onClose={() => setIsContentModalOpen(false)}
        title={selectedContent ? "Edit Content" : "Add Content"}
      >
        <ContentForm
          initialContent={selectedContent}
          onSubmit={(content) => {
            handleAddContent(content);
          }}
          onCancel={() => setIsContentModalOpen(false)}
          topicId={selectedTopic?.topicId || ""} // Pass topicId as a prop
        />
      </Modal>
    </div>
  );
};
