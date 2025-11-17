"use client";

import { Video, Section } from "@/types/course";

interface VideoListProps {
  sections: Section[];
  currentVideoId: string;
  onVideoSelect: (videoId: string) => void;
  watchedVideos?: Set<string>;
}

export default function VideoList({
  sections,
  currentVideoId,
  onVideoSelect,
  watchedVideos = new Set(),
}: VideoListProps) {
  return (
    <div className="space-y-4">
      {sections.map((section, sectionIndex) => {
        const sectionWatchedCount = section.videos.filter((v) =>
          watchedVideos.has(v.id),
        ).length;
        const sectionProgress =
          section.videos.length > 0
            ? Math.round((sectionWatchedCount / section.videos.length) * 100)
            : 0;
        const sectionLabel = String(sectionIndex + 1).padStart(2, "0");

        return (
          <div
            key={section.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">
                  Section {sectionLabel}
                </p>
                <h3 className="text-base font-semibold text-white">
                  {section.name}
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-300">
                {sectionWatchedCount}/{section.videos.length} 完了
              </span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-blue-400 transition-[width] duration-500"
                style={{ width: `${sectionProgress}%` }}
              />
            </div>
            <ul className="mt-4 space-y-2">
              {section.videos.map((video) => {
                const isWatched = watchedVideos.has(video.id);
                const isCurrent = currentVideoId === video.id;

                return (
                  <li key={video.id}>
                    <button
                      onClick={() => onVideoSelect(video.id)}
                      className={`group w-full rounded-xl border px-3 py-3 text-left text-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                        isCurrent
                          ? "border-blue-400/60 bg-blue-500/10 text-white"
                          : "border-white/5 bg-white/[0.02] text-slate-200 hover:border-white/15 hover:bg-white/5"
                      }`}
                      aria-label={`${video.title}を再生`}
                      aria-current={isCurrent ? "true" : "false"}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-1 h-2 w-2 rounded-full ${
                            isCurrent
                              ? "bg-blue-400"
                              : isWatched
                                ? "bg-emerald-400"
                                : "bg-white/30"
                          }`}
                          aria-hidden="true"
                        />
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              isCurrent ? "text-white" : "text-slate-100"
                            }`}
                          >
                            {video.title}
                          </p>
                          {isWatched && !isCurrent && (
                            <p className="text-xs text-emerald-300/80">
                              視聴済み
                            </p>
                          )}
                        </div>
                        <span
                          className={`text-xs font-semibold ${
                            isCurrent
                              ? "text-blue-200"
                              : isWatched
                                ? "text-emerald-300"
                                : "text-slate-400"
                          }`}
                        >
                          {isCurrent ? "再生中" : isWatched ? "完了" : "未視聴"}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
