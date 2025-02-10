import { useTranslation } from "react-i18next";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Clock, User, Calendar, BookOpen, Award, Users } from "lucide-react";
import ClassHeader from "./ClassHeader";
import { ClassDetails } from "../../types/types";
import { useEffect } from "react";

const ClassPage = () => {
  const { t } = useTranslation("classpage");
  const navigate = useNavigate();
  const { classId } = useParams();

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data with real image URLs
  const classes: ClassDetails[] = [
    {
      id: "1",
      title: t("class1Title"),
      description: t("class1Description"),
      instructor: t("class1Instructor"),
      duration: t("class1Duration"),
      category: "Photography",
      startDate: "February 15, 2024",
      students: "124",
      level: "Intermediate",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80", // Photo by Chris Montgomery on Unsplash
    },
    {
      id: "2",
      title: t("class2Title"),
      description: t("class2Description"),
      instructor: t("class2Instructor"),
      duration: t("class2Duration"),
      category: "Design",
      startDate: "March 1, 2024",
      students: "98",
      level: "Beginner",
      image:
        "https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Photo by Julia M Cameron from Pexels
    },
    {
      id: "3",
      title: t("class3Title"),
      description: t("class3Description"),
      instructor: t("class3Instructor"),
      duration: t("class3Duration"),
      category: "Development",
      startDate: "March 15, 2024",
      students: "156",
      level: "Advanced",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // Photo by Chris Ried on Unsplash
    },
    {
      id: "4",
      title: t("class4Title"),
      description: t("class4Description"),
      instructor: t("class4Instructor"),
      duration: t("class4Duration"),
      category: "Marketing",
      startDate: "April 1, 2024",
      students: "112",
      level: "Intermediate",
      image:
        "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Photo by Christina Morillo from Pexels
    },
  ];

  const classDetails = classes.find((cls) => cls.id === classId);

  if (!classDetails) {
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
      value: classDetails.duration,
    },
    {
      icon: <User className="w-5 h-5" />,
      label: t("instructor"),
      value: classDetails.instructor,
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: t("startDate"),
      value: classDetails.startDate,
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: t("enrolled"),
      value: classDetails.students,
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: t("level"),
      value: classDetails.level,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ClassHeader
        title={classDetails.title}
        image={classDetails.image} // Pass the image URL to ClassHeader
        category={classDetails.category}
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
                {classDetails.description}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("whatYouWillLearn")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-blue-600 mt-1" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {t(`learningPoint${item}`)}
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
