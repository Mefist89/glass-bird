// Роли пользователей
export enum UserRole {
  ADMIN = 'admin',    // Учитель (только один)
  STUDENT = 'student' // Ученики
}

// Интерфейс пользователя
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  enrolledCourses: string[]; // ID курсов, на которые записан
  progress: UserProgress;
}

// Прогресс пользователя по курсам
export interface UserProgress {
  [courseId: string]: CourseProgress;
}

// Прогресс по конкретному курсу
export interface CourseProgress {
  completedLessons: string[]; // ID пройденных уроков
  lastAccessed: Date;          // Последнее обращение к курсу
  completedExercises: string[]; // ID выполненных заданий
  score: number;                // Общий балл
}

// Данные для регистрации
export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

// Данные для входа
export interface LoginData {
  email: string;
  password: string;
}