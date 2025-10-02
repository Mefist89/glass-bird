// Категории курсов
export enum CourseCategory {
  PYTHON = 'python',
  NETWORKS = 'networks',
  DATABASE = 'database'
}

// Уровень сложности курса
export enum CourseLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

// Интерфейс курса
export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  icon: string;              // Emoji иконка
  color: string;             // Градиент для карточки (tailwind classes)
  duration: string;          // Например "6 недель"
  lessonsCount: number;      // Количество уроков
  lessons: Lesson[];         // Массив уроков
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;      // Опубликован ли курс
}

// Интерфейс урока
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;           // Markdown контент урока
  videoUrl?: string;         // Ссылка на видео (опционально)
  order: number;             // Порядковый номер урока
  duration: number;          // Длительность в минутах
  exercises: Exercise[];     // Задания к уроку
  isPublished: boolean;      // Опубликован ли урок
  createdAt: Date;
  updatedAt: Date;
}

// Типы заданий
export enum ExerciseType {
  CODE = 'code',             // Задание на код
  QUIZ = 'quiz',             // Тест с вариантами ответа
  TEXT = 'text',             // Текстовый ответ
  MULTIPLE_CHOICE = 'multiple_choice' // Множественный выбор
}

// Интерфейс задания
export interface Exercise {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  type: ExerciseType;
  order: number;             // Порядковый номер задания
  points: number;            // Баллы за выполнение
  
  // Для CODE заданий
  codeTemplate?: string;     // Шаблон кода
  solution?: string;         // Правильное решение (только для админа)
  
  // Для QUIZ и MULTIPLE_CHOICE
  question?: string;
  options?: string[];        // Варианты ответов
  correctAnswer?: number | number[]; // Индекс правильного ответа или массив индексов
  
  // Для TEXT заданий
  expectedAnswer?: string;   // Ожидаемый ответ
  
  hints?: string[];          // Подсказки
}

// Данные для создания/редактирования курса
export interface CreateCourseData {
  title: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  icon: string;
  color: string;
  duration: string;
}

// Данные для создания/редактирования урока
export interface CreateLessonData {
  courseId: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: number;
}