import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseById } from "@/lib/courses";
import WatchClient from "./WatchClient";
import type { Metadata } from "next";

interface WatchPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ video?: string }>;
}

export async function generateMetadata({
  params,
}: WatchPageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    return {
      title: "コースが見つかりません",
    };
  }

  return {
    title: `${course.title} - 動画視聴 | 動画配信プラットフォーム`,
    description: course.description,
  };
}

export default async function WatchPage({
  params,
  searchParams,
}: WatchPageProps) {
  const { id } = await params;
  const { video: videoId } = await searchParams;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/courses/${id}`}
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              ← コース詳細に戻る
            </Link>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {course.title}
            </h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <WatchClient course={course} initialVideoId={videoId} />
      </main>
    </div>
  );
}
