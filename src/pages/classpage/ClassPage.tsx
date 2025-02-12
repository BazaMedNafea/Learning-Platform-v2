import { useTranslation } from "react-i18next";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Clock, User, Calendar, BookOpen, Award, Users } from "lucide-react";
import ClassHeader from "./ClassHeader";
import { useEffect, useState } from "react";
import { getCourseById } from "../../services/course"; // Adjust the path as needed

interface CourseResponse {
  courseId: string;
  title: string;
  description: string;
  teacherId: string;
  isPublic: boolean;
  subjectId: string;
  image: string;
  topics: { topicId: string; title: string; courseId: string }[];
  teacher: {
    teacherId: string;
    userId: string;
    bio: string;
    user: { firstName: string; lastName: string };
  };
  enrollments: [];
  subject: {
    subjectId: string;
    name: string;
    level: string;
    stream: null;
    year: string;
  };
  quizzes: [];
  exams: [];
}

const ClassPage = () => {
  const { t } = useTranslation("classpage");
  const navigate = useNavigate();
  const { classId } = useParams();
  const [courseDetails, setCourseDetails] = useState<CourseResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const data = await getCourseById(classId || "");
        setCourseDetails(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [classId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t("loadingCourse")}
          </h2>
        </div>
      </div>
    );
  }

  if (!courseDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t("classNotFound")}
          </h2>
          <Link
            to="/classes"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Browse all classes
          </Link>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: <Clock className="w-5 h-5" />,
      label: t("duration"),
      value: "TBD", // Placeholder value, adjust as needed
    },
    {
      icon: <User className="w-5 h-5" />,
      label: t("instructor"),
      value: `${courseDetails.teacher.user.firstName} ${courseDetails.teacher.user.lastName}`,
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: t("startDate"),
      value: "TBD", // Placeholder value, adjust as needed
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: t("enrolled"),
      value: "0", // Placeholder value, adjust as needed
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: t("level"),
      value: courseDetails.subject.level,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ClassHeader
        title={courseDetails.title}
        image={`data:image/png;base64,${courseDetails.image}`} // Convert Base64 to image
        category={courseDetails.subject.name}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("aboutCourse")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {courseDetails.description}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("whatYouWillLearn")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courseDetails.topics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-blue-600 mt-1" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {topic.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 sticky top-8">
              <div className="space-y-6 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {feature.label}
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {feature.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate(`/course/${classId}`)} // Redirect to the Course Content Page
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {t("enrollNow")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
