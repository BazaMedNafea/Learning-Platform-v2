export interface ClassDetails {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  image: string;
  category: string;
  startDate: string;
  students: string;
  level: string;
}

export interface Course {
  courseId?: string;
  title: string;
  description?: string;
  isPublic: boolean;
  subjectId: string;
  image?: string;
}

export interface CourseFormData {
  courseId?: string;
  title: string;
  description?: string;
  isPublic: boolean;
  subjectId: string;
  image?: string;
}

export interface Topic {
  id: string;
  title: string;
}
