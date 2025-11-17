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
    <div className="min-h-screen bg-[#030712] text-slate-100">
      <header className="border-b border-white/10 bg-[#030712]/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href={`/courses/${id}`}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              ← コース詳細に戻る
            </Link>
            <h1 className="text-base font-semibold text-white">
              {course.title}
            </h1>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
              WATCH MODE
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <WatchClient course={course} initialVideoId={videoId} />
      </main>
    </div>
  );
}
