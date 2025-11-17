import { Course } from "@/types/course";
import coursesData from "@/data/courses.json";

export async function getCourses(): Promise<Course[]> {
  // デモ版ではJSONファイルから読み込む
  // 将来的にはデータベースから取得するように変更
  return coursesData as Course[];
}

export async function getCourseById(id: string): Promise<Course | null> {
  const courses = await getCourses();
  return courses.find((course) => course.id === id) || null;
}

