import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Modal } from "./components/Modal";
import { CourseForm } from "./components/CourseForm";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  addTopicToCourse,
  deleteTopic,
  addContentToTopic,
  updateTopic,
  updateContent,
} from "../../services/course";
import { getCoursesByTeacherId } from "../../services/teacher";
import { Course, Content } from "../../types/types";
import { useAuth } from "../../contexts/AuthContext";
import { CourseAccordion } from "./components/CourseAccordion";

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    loadCourses();
  }, [user]);

  const loadCourses = async () => {
    try {
      if (user?.teacherId) {
        const data = await getCoursesByTeacherId(user.teacherId);
        setCourses(data);
      }
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  const handleCreateCourse = async (formData: { [key: string]: any }) => {
    try {
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) =>
        formDataObj.append(key, formData[key])
      );
      await createCourse(formDataObj);
      await loadCourses();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleUpdateCourse = async (formData: { [key: string]: any }) => {
    try {
      if (selectedCourse?.courseId) {
        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) =>
          formDataObj.append(key, formData[key])
        );
        await updateCourse(selectedCourse.courseId, formDataObj);
        await loadCourses();
        setIsEditModalOpen(false);
        setSelectedCourse(null);
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(courseId);
        await loadCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  const handleAddTopic = async (title: string, courseId: string) => {
    console.log(`Adding topic to course with courseId: ${courseId}`);
    console.log(`Topic title: ${title}`);
    try {
      await addTopicToCourse(courseId, title);
      await loadCourses();
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  const handleDeleteTopic = async (topicId: string) => {
    try {
      await deleteTopic(topicId);
      await loadCourses();
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const handleAddContent = async (topicId: string, content: Content) => {
    try {
      await addContentToTopic(topicId, content.type, content.data);
      await loadCourses();
    } catch (error) {
      console.error("Error adding content:", error);
    }
  };

  const handleUpdateTopic = async (topicId: string, newTitle: string) => {
    try {
      await updateTopic(topicId, newTitle);
      await loadCourses();
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  const handleUpdateContent = async (
    contentId: string,
    newType: string,
    newData: string
  ) => {
    try {
      await updateContent(contentId, newType, newData);
      await loadCourses();
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Course Management</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>Create Course</span>
        </button>
      </div>

      <div className="space-y-6">
        {courses.map((course) => (
          <CourseAccordion
            key={course.courseId}
            course={course}
            onEdit={() => {
              setSelectedCourse(course);
              setIsEditModalOpen(true);
            }}
            onDelete={handleDeleteCourse}
            onAddTopic={handleAddTopic}
            onDeleteTopic={handleDeleteTopic}
            onAddContent={handleAddContent}
            onUpdateTopic={handleUpdateTopic}
            onUpdateContent={handleUpdateContent}
          />
        ))}
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Course"
      >
        <CourseForm
          onSubmit={handleCreateCourse}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCourse(null);
        }}
        title="Edit Course"
      >
        <CourseForm
          initialData={selectedCourse || undefined}
          onSubmit={handleUpdateCourse}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedCourse(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default CourseManagement;
