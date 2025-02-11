// pages/CourseManagement/CourseManagement.tsx
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Modal } from "./components/Modal";
import { CourseForm } from "./components/CourseForm";
import { CourseCard } from "./components/CourseCard";
import { TopicList } from "./components/TopicList";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  addTopicToCourse,
  deleteTopic,
} from "../../services/course";
import { getCoursesByTeacherId } from "../../services/teacher";

import { Course, Topic } from "../../types/types";
import { useAuth } from "../../contexts/AuthContext";

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTopicsModalOpen, setIsTopicsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const { user } = useAuth(); // Ensure you have access to the user's teacherId

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

  const handleCreateCourse = async (formData: FormData) => {
    try {
      await createCourse(formData);
      await loadCourses();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleUpdateCourse = async (formData: FormData) => {
    try {
      console.log("Updating course with data:", formData);
      if (selectedCourse) {
        if (selectedCourse?.courseId) {
          // Convert FormData to a plain object for logging
          const formDataObject: { [key: string]: any } = {};
          formData.forEach((value, key) => {
            formDataObject[key] = value;
          });
          console.log("Form Data Object:", formDataObject);

          const response = await updateCourse(
            selectedCourse.courseId,
            formData
          );
          console.log("Update response:", response);
        }
        await loadCourses(); // Reload courses to reflect changes
        setIsEditModalOpen(false); // Close the modal
        setSelectedCourse(null); // Clear the selected course
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
    try {
      await addTopicToCourse(courseId, title);
      // Reload the topics for the selected course
      if (selectedCourse && selectedCourse.courseId === courseId) {
        const updatedCourses = await getCoursesByTeacherId(user.teacherId);
        const updatedCourse = updatedCourses.find(
          (c: { courseId: string }) => c.courseId === courseId
        );
        if (updatedCourse) {
          setSelectedCourse(updatedCourse);
          setTopics(updatedCourse.topics || []);
        }
      }
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  const handleDeleteTopic = async (topicId: string) => {
    try {
      await deleteTopic(topicId);
      // Reload the topics for the selected course
      if (selectedCourse) {
        const updatedCourses = await getCoursesByTeacherId(user.teacherId);
        const updatedCourse = updatedCourses.find(
          (c: { courseId: string | undefined }) =>
            c.courseId === selectedCourse.courseId
        );
        if (updatedCourse) {
          setSelectedCourse(updatedCourse);
          setTopics(updatedCourse.topics || []);
        }
      }
    } catch (error) {
      console.error("Error deleting topic:", error);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.courseId} // Unique key for each course
            course={course}
            onEdit={(course) => {
              setSelectedCourse(course);
              setIsEditModalOpen(true);
            }}
            onDelete={handleDeleteCourse}
            onManageTopics={(course) => {
              setSelectedCourse(course);
              setTopics(course.topics || []); // Directly use the topics from the fetched course
              setIsTopicsModalOpen(true);
            }}
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

      <Modal
        isOpen={isTopicsModalOpen}
        onClose={() => {
          setIsTopicsModalOpen(false);
          setSelectedCourse(null);
          setTopics([]);
        }}
        title={`Manage Topics - ${selectedCourse?.title}`}
      >
        <TopicList
          courseId={selectedCourse?.courseId || ""}
          topics={topics}
          onTopicDelete={handleDeleteTopic}
          onAddTopic={(title) =>
            handleAddTopic(title, selectedCourse?.courseId!)
          }
        />
      </Modal>
    </div>
  );
};

export default CourseManagement;
