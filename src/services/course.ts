// src/services/course.ts
import api from "./api";

// Get all courses
export const getAllCourses = async () => {
  const response = await api.get("/course/all");
  return response.data;
};

// Get public courses
export const getPublicCourses = async () => {
  const response = await api.get("/course/public");
  return response.data;
};

// Get a course by ID
export const getCourseById = async (courseId: string) => {
  const response = await api.get(`/course/${courseId}`);
  return response.data;
};

// Create a new course (teacher only)
export const createCourse = async (data: FormData) => {
  const response = await api.post("/course/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update a course (teacher only)
export const updateCourse = async (courseId: string, data: FormData) => {
  const response = await api.put(`/course/${courseId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Delete a course (teacher only)
export const deleteCourse = async (courseId: string) => {
  const response = await api.delete(`/course/${courseId}`);
  return response.data;
};

// Add a topic to a course (teacher only)
export const addTopicToCourse = async (courseId: string, title: string) => {
  const response = await api.post(`/course/${courseId}/addTopic`, {
    courseId,
    title,
  });
  return response.data;
};

// Add content to a topic (teacher only)
export const addContentToTopic = async (
  topicId: string,
  type: string,
  data: string
) => {
  const response = await api.post(`/course/${topicId}/addContent`, {
    topicId,
    type,
    data,
  });
  return response.data;
};

// Get content of a topic (teacher only)
export const getTopicContent = async (topicId: string) => {
  try {
    const response = await api.get(`/course/${topicId}/content`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching topic content:", error);
    return []; // Return an empty array if there's an error
  }
};

// Delete content (teacher only)
export const deleteContent = async (contentId: string) => {
  const response = await api.delete(`/course/content/${contentId}`);
  return response.data;
};

// Delete a topic (teacher only)
export const deleteTopic = async (topicId: string) => {
  const response = await api.delete(`/course/topic/${topicId}`);
  return response.data;
};
