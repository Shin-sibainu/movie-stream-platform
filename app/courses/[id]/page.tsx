import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCourseById } from "@/lib/courses";
import type { Metadata } from "next";

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    return {
      title: "コースが見つかりません",
    };
  }

  return {
    title: `${course.title} | 動画配信プラットフォーム`,
    description: course.description,
  };
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  const totalVideos = course.sections.reduce(
    (sum, section) => sum + section.videos.length,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            ← コース一覧に戻る
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="mb-6 overflow-hidden rounded-lg">
            <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-800">
              <Image
                src={course.thumbnailUrl}
                alt={course.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
            {course.title}
          </h1>

          <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
            {course.description}
          </p>

          <div className="mb-8 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{course.sections.length} セクション</span>
            <span>{totalVideos} 動画</span>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              コース内容
            </h2>
            <div className="space-y-4">
              {course.sections.map((section) => (
                <div
                  key={section.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
                >
                  <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                    {section.name}
                  </h3>
                  <ul className="ml-4 list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {section.videos.map((video) => (
                      <li key={video.id}>{video.title}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <Link
            href={`/courses/${course.id}/watch`}
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            コースを見る
          </Link>
        </div>
      </main>
    </div>
  );
}

