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

  const metrics = [
    { label: "セクション", value: course.sections.length, caption: "構造化モジュール" },
    { label: "動画数", value: totalVideos, caption: "集中レッスン" },
    { label: "推奨レベル", value: "中級以上", caption: "実務志向" },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100">
      <header className="border-b border-white/10 bg-[#030712]/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-slate-300 transition hover:text-white"
          >
            ← コース一覧に戻る
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <section>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
              COURSE DETAIL
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-white">
              {course.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              {course.description}
            </p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <dt className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    {metric.label}
                  </dt>
                  <dd className="mt-2 text-3xl font-semibold text-white">
                    {metric.value}
                  </dd>
                  <p className="text-xs text-slate-400">{metric.caption}</p>
                </div>
              ))}
            </dl>

            <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src={course.thumbnailUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>
            </div>

            <section className="mt-10 space-y-4">
              <h2 className="text-xl font-semibold text-white">コース内容</h2>
              {course.sections.map((section, index) => {
                const sectionLabel = String(index + 1).padStart(2, "0");
                return (
                  <div
                    key={section.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400">
                          Section {sectionLabel}
                        </p>
                        <h3 className="text-lg font-semibold text-white">
                          {section.name}
                        </h3>
                      </div>
                      <span className="text-sm text-slate-400">
                        {section.videos.length} 本の動画
                      </span>
                    </div>
                    <ol className="mt-4 space-y-2 text-sm text-slate-300">
                      {section.videos.map((video, videoIndex) => (
                        <li
                          key={video.id}
                          className="flex items-center gap-3 rounded-xl border border-white/5 px-3 py-2"
                        >
                          <span className="text-xs font-semibold text-slate-500">
                            {String(videoIndex + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1">{video.title}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              })}
            </section>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(2,6,23,0.45)]">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                START LEARNING
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                コースを今すぐ視聴
              </h3>
              <p className="mt-4 text-sm text-slate-300">
                品質に妥協しないUIと操作感で、長時間でも集中しやすい視聴体験を提供します。
              </p>
              <Link
                href={`/courses/${course.id}/watch`}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-blue-600"
              >
                コースを見る
              </Link>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h4 className="text-lg font-semibold text-white">コースの特徴</h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400" />
                  実務レベルのユースケースとコードベースで構成
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400" />
                  セクション毎に学習ゴールとアウトプットを整理
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400" />
                  グラデーションに頼らない視認性の高いUI
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

