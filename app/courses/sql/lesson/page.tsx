import { LessonPage } from "@/src/components/lesson/LessonPage";
import { sqlLessonPageData } from "@/src/data/mockData";

export default function SqlLessonPage() {
  return <LessonPage data={sqlLessonPageData} />;
}
