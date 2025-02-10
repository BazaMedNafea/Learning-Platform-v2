import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Video, Download } from "lucide-react";

const CourseContentPage = () => {
  const { t } = useTranslation("coursecontent");
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Mock data for topics and their content
  const topics = [
    {
      id: "1",
      title: t("introduction"),
      content: [
        {
          type: "video",
          data: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Video first
        },
        {
          type: "text",
          data: t("introductionText1"), // Text second
        },
        {
          type: "file",
          data: {
            name: "Introduction Slides",
            url: "/files/intro-slides.pdf",
          }, // File third
        },
        {
          type: "text",
          data: t("introductionText2"), // Another text block
        },
      ],
    },
    {
      id: "2",
      title: t("settingUpEnvironment"),
      content: [
        {
          type: "text",
          data: t("settingUpEnvironmentText1"), // Text first
        },
        {
          type: "file",
          data: {
            name: "Environment Setup Guide",
            url: "/files/env-setup.pdf",
          }, // File second
        },
        {
          type: "video",
          data: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Video third
        },
      ],
    },
    {
      id: "3",
      title: t("basicConcepts"),
      content: [
        {
          type: "file",
          data: {
            name: "Basic Concepts PDF",
            url: "/files/basic-concepts.pdf",
          }, // File first
        },
        {
          type: "video",
          data: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Video second
        },
        {
          type: "text",
          data: t("basicConceptsText1"), // Text third
        },
      ],
    },
  ];

  const handleBackToClass = () => {
    navigate(`/class/${courseId}`);
  };

  // Render content based on type
  const renderContent = (content: any) => {
    switch (content.type) {
      case "text":
        return (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-900 dark:text-white">{content.data}</p>
          </div>
        );
      case "file":
        return (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <p className="text-gray-900 dark:text-white">
                {content.data.name}
              </p>
            </div>
            <a
              href={content.data.url}
              download
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              {t("download")}
            </a>
          </div>
        );
      case "video":
        return (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <p className="text-gray-900 dark:text-white">{t("video")}</p>
            </div>
            <iframe
              src={content.data}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-64 rounded-lg"
            ></iframe>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-blue-600 dark:bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <button
            onClick={handleBackToClass}
            className="text-white/80 hover:text-white flex items-center gap-2 mb-6 w-fit transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t("backToClass")}
          </button>
          <h1 className="text-4xl font-bold">{t("courseContent")}</h1>
        </div>
      </div>

      {/* Topics List */}
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {topic.title}
              </h2>
              <div className="space-y-4">
                {topic.content.map((content, index) => (
                  <div key={index}>{renderContent(content)}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseContentPage;
