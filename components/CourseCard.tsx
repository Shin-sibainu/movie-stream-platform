import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] dark:border-gray-800 dark:bg-gray-900"
      aria-label={`${course.title}の詳細を見る`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          {course.title}
        </h3>
        <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {course.description}
        </p>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
          {course.sections.length} セクション
        </div>
      </div>
    </Link>
  );
}

