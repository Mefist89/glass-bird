import { CoursePage } from "@/src/components/course/CoursePage";
import { sqlCoursePageData } from "@/src/data/mockData";

export default function SqlCoursePage() {
  return <CoursePage data={sqlCoursePageData} />;
}
