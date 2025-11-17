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
      {sections.map((section) => {
        const sectionWatchedCount = section.videos.filter((v) =>
          watchedVideos.has(v.id),
        ).length;
        const sectionProgress =
          section.videos.length > 0
            ? Math.round((sectionWatchedCount / section.videos.length) * 100)
            : 0;

        return (
          <div
            key={section.id}
            className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
              <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                {section.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>
                  {sectionWatchedCount}/{section.videos.length} 完了
                </span>
                <div className="flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-1.5 bg-blue-600 transition-all dark:bg-blue-500"
                    style={{ width: `${sectionProgress}%` }}
                  />
                </div>
              </div>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-800">
              {section.videos.map((video) => {
                const isWatched = watchedVideos.has(video.id);
                const isCurrent = currentVideoId === video.id;

                return (
                  <li key={video.id}>
                    <button
                      onClick={() => onVideoSelect(video.id)}
                      className={`relative w-full px-4 py-3 text-left text-sm transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        isCurrent
                          ? "bg-blue-50 font-semibold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                      aria-label={`${video.title}を再生`}
                      aria-current={isCurrent ? "true" : "false"}
                    >
                      <div className="flex items-start gap-2">
                        {isWatched && (
                          <span className="mt-0.5 text-green-600 dark:text-green-400">
                            ✓
                          </span>
                        )}
                        <span className="flex-1">{video.title}</span>
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
