import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ClassesSection = () => {
  const { t } = useTranslation("homepage/classessection");

  // Mock data for classes with real image URLs
  const classes = [
    {
      id: "1",
      title: t("class1Title"),
      description: t("class1Description"),
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80", // Photo by Chris Montgomery on Unsplash
    },
    {
      id: "2",
      title: t("class2Title"),
      description: t("class2Description"),
      image:
        "https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Photo by Julia M Cameron from Pexels
    },
    {
      id: "3",
      title: t("class3Title"),
      description: t("class3Description"),
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // Photo by Chris Ried on Unsplash
    },
    {
      id: "4",
      title: t("class4Title"),
      description: t("class4Description"),
      image:
        "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Photo by Christina Morillo from Pexels
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          {t("classesTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {classes.map((cls) => (
            <Link
              to={`/class/${cls.id}`}
              key={cls.id}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
            >
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {cls.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {cls.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassesSection;
