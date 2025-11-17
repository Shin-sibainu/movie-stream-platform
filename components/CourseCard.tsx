import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const totalVideos = course.sections.reduce(
    (sum, section) => sum + section.videos.length,
    0,
  );

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-100 shadow-[0_25px_70px_rgba(2,6,23,0.45)] transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/60 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      aria-label={`${course.title}の詳細を見る`}
    >
      <div className="relative mb-6 overflow-hidden rounded-xl">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0 border border-white/10"
          aria-hidden="true"
        />
      </div>

      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
        CURRICULUM
      </p>
      <h3 className="mt-2 text-2xl font-semibold leading-snug text-white">
        {course.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-300">
        {course.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-white/10 pt-4 text-sm text-slate-300">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            セクション
          </p>
          <p className="mt-1 text-lg font-semibold text-white">
            {course.sections.length}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            動画数
          </p>
          <p className="mt-1 text-lg font-semibold text-white">{totalVideos}</p>
        </div>
        <div className="ml-auto inline-flex items-center gap-2 text-xs font-semibold text-blue-300">
          <span className="h-2 w-2 rounded-full bg-blue-400" />
          もっと見る
        </div>
      </div>
    </Link>
  );
}

