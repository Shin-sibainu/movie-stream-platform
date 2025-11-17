"use client";

import { useState, useCallback, useEffect } from "react";
import { Course, Video } from "@/types/course";
import VideoPlayer from "@/components/VideoPlayer";
import VideoList from "@/components/VideoList";
import ProgressBar from "@/components/ProgressBar";
import { useVideoProgress } from "@/hooks/useVideoProgress";

interface WatchClientProps {
  course: Course;
  initialVideoId?: string;
}

export default function WatchClient({
  course,
  initialVideoId,
}: WatchClientProps) {
  const { markAsWatched, getProgress, watchedVideos } =
    useVideoProgress(course.id);

  // 初期動画を設定
  const getInitialVideo = (): Video | null => {
    if (initialVideoId) {
      for (const section of course.sections) {
        const video = section.videos.find((v) => v.id === initialVideoId);
        if (video) return video;
      }
    }
    // 初期動画IDが指定されていない場合、最初の動画を設定
    if (course.sections.length > 0) {
      const firstSection = course.sections[0];
      if (firstSection.videos.length > 0) {
        return firstSection.videos[0];
      }
    }
    return null;
  };

  const [currentVideo, setCurrentVideo] = useState<Video | null>(
    getInitialVideo()
  );
  const [videoProgress, setVideoProgress] = useState(0);

  // 総動画数を計算
  const totalVideos = course.sections.reduce(
    (sum, section) => sum + section.videos.length,
    0
  );

  // コース全体の進捗率
  const courseProgress = getProgress(totalVideos);

  // 動画が終了したら視聴済みとしてマーク
  useEffect(() => {
    if (currentVideo && videoProgress >= 90) {
      // 90%以上視聴したら視聴済みとしてマーク
      markAsWatched(currentVideo.id);
    }
  }, [currentVideo, videoProgress, markAsWatched]);

  const handleVideoSelect = useCallback(
    (videoId: string) => {
      for (const section of course.sections) {
        const video = section.videos.find((v) => v.id === videoId);
        if (video) {
          setCurrentVideo(video);
          setVideoProgress(0);
          break;
        }
      }
    },
    [course]
  );

  const handleVideoEnd = useCallback(() => {
    if (!currentVideo) return;

    // 視聴済みとしてマーク
    markAsWatched(currentVideo.id);

    // 次の動画を見つける
    let foundCurrent = false;
    for (const section of course.sections) {
      for (let i = 0; i < section.videos.length; i++) {
        if (foundCurrent && i < section.videos.length) {
          setCurrentVideo(section.videos[i]);
          setVideoProgress(0);
          return;
        }
        if (section.videos[i].id === currentVideo.id) {
          foundCurrent = true;
          // 同じセクション内に次の動画があるか確認
          if (i + 1 < section.videos.length) {
            setCurrentVideo(section.videos[i + 1]);
            setVideoProgress(0);
            return;
          }
        }
      }
    }
    // 次の動画がない場合は何もしない（最後の動画）
  }, [course, currentVideo, markAsWatched]);

  const handleVideoProgress = useCallback((progress: number) => {
    setVideoProgress(progress);
  }, []);

  // 次の動画を取得
  const getNextVideo = useCallback((): Video | null => {
    if (!currentVideo) return null;

    let foundCurrent = false;
    for (const section of course.sections) {
      for (let i = 0; i < section.videos.length; i++) {
        if (foundCurrent && i < section.videos.length) {
          return section.videos[i];
        }
        if (section.videos[i].id === currentVideo.id) {
          foundCurrent = true;
          if (i + 1 < section.videos.length) {
            return section.videos[i + 1];
          }
        }
      }
    }
    return null;
  }, [course, currentVideo]);

  const nextVideo = getNextVideo();

  if (!currentVideo) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            動画が見つかりませんでした
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <section className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_70px_rgba(2,6,23,0.45)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                CURRENT LESSON
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                {currentVideo.title}
              </h2>
              {currentVideo.description && (
                <p className="mt-2 text-sm text-slate-300">
                  {currentVideo.description}
                </p>
              )}
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-3 text-right text-xs uppercase tracking-[0.35em] text-slate-500">
              PROGRESS
              <p className="mt-1 text-3xl font-semibold text-white">
                {courseProgress}%
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black">
            <VideoPlayer
              youtubeVideoId={currentVideo.youtubeVideoId}
              onEnd={handleVideoEnd}
              onProgress={handleVideoProgress}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:max-w-md">
              <ProgressBar
                progress={courseProgress}
                label="COURSE COMPLETION"
                showPercentage
              />
            </div>
            <span className="text-sm text-slate-400">
              {watchedVideos.size}/{totalVideos} レッスン完了
            </span>
          </div>

          {nextVideo && (
            <div className="mt-6">
              <button
                onClick={() => handleVideoSelect(nextVideo.id)}
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-blue-500/10 px-5 py-4 text-left text-sm font-semibold text-white transition hover:bg-blue-500/20"
              >
                <span className="uppercase tracking-[0.3em] text-xs text-slate-200">
                  Next Lesson
                </span>
                <span className="text-base">{nextVideo.title}</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <aside>
        <div className="sticky top-4 space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">
                コースマップ
              </h3>
              <span className="text-xs text-slate-400">
                {totalVideos} 本の動画
              </span>
            </div>
            <VideoList
              sections={course.sections}
              currentVideoId={currentVideo.id}
              onVideoSelect={handleVideoSelect}
              watchedVideos={watchedVideos}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
