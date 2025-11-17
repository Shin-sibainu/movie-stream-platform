import Image from "next/image";
import Link from "next/link";
import { getCourses } from "@/lib/courses";
import CourseCard from "@/components/CourseCard";

export const metadata = {
  title: "コース一覧 | 動画配信プラットフォーム",
  description: "利用可能なコース一覧",
};

export default async function Home() {
  const courses = await getCourses();
  const totalSections = courses.reduce(
    (sum, course) => sum + course.sections.length,
    0,
  );
  const totalVideos = courses.reduce(
    (sum, course) =>
      sum +
      course.sections.reduce(
        (sectionSum, section) => sectionSum + section.videos.length,
        0,
      ),
    0,
  );
  const highlightCourse = courses[0];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] pb-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-white/5 blur-3xl"
        aria-hidden="true"
      />

      <header className="border-b border-white/10 bg-[#030712]/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
              MOVIE STREAM
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-white">
              動画配信プラットフォーム
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <span className="hidden sm:inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              レッスンは即時スタート可能
            </span>
            <Link
              href="#courses"
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/40"
            >
              Courses
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
              NEXT-GENERATION LEARNING
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
              実務で使える知識だけを、洗練された視聴体験で。
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
              現場のワークフローをそのまま再現したカリキュラムで、必要なスキルを最短距離で習得。
              グラデーションに頼らないタイポグラフィとレイアウトで、情報に集中できるビューイングを提供します。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {highlightCourse && (
                <Link
                  href={`/courses/${highlightCourse.id}/watch`}
                  className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-blue-600"
                >
                  今すぐ視聴する
                </Link>
              )}
              <Link
                href="#courses"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
              >
                すべてのコースを見る
              </Link>
            </div>
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  収録レッスン
                </dt>
                <dd className="mt-2 text-3xl font-semibold text-white">
                  {totalVideos}
                </dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  セクション数
                </dt>
                <dd className="mt-2 text-3xl font-semibold text-white">
                  {totalSections}
                </dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  学習満足度
                </dt>
                <dd className="mt-2 text-3xl font-semibold text-white">4.9</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(2,6,23,0.55)]">
            {highlightCourse ? (
              <>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                  FEATURED COURSE
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {highlightCourse.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {highlightCourse.description}
                </p>
                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={highlightCourse.thumbnailUrl}
                      alt={highlightCourse.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-6 text-sm text-slate-300">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                      セクション
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {highlightCourse.sections.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
                      動画数
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {highlightCourse.sections.reduce(
                        (sum, section) => sum + section.videos.length,
                        0,
                      )}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-sm text-slate-300">
                コースが追加されると、ここに注目コースが表示されます。
              </div>
            )}
          </div>
        </section>

        <section
          id="courses"
          className="mx-auto max-w-6xl px-6 pb-12"
          aria-label="コース一覧"
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                CURRICULUM
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                学びのラインナップ
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                現在 {courses.length} コースを公開中
              </p>
            </div>
            <span className="text-sm text-slate-400">
              プレミアムな視聴体験に最適化されたUI
            </span>
          </div>

          {courses.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-16 text-center text-slate-300">
              コースがありません
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="animate-fade-in"
                  style={{
                    animationDelay: `${index * 0.08}s`,
                    animationFillMode: "both",
                  }}
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
