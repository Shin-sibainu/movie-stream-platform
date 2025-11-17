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
  const { markAsWatched, isWatched, getProgress, watchedVideos } =
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {/* コース全体の進捗バー */}
        <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <ProgressBar
            progress={courseProgress}
            label="コース全体の進捗"
            showPercentage={true}
          />
        </div>

        <div className="mb-4">
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            {currentVideo.title}
          </h2>
          {currentVideo.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentVideo.description}
            </p>
          )}
        </div>

        <VideoPlayer
          youtubeVideoId={currentVideo.youtubeVideoId}
          onEnd={handleVideoEnd}
          onProgress={handleVideoProgress}
        />

        {/* 次の動画ボタン */}
        {nextVideo && (
          <div className="mt-4">
            <button
              onClick={() => handleVideoSelect(nextVideo.id)}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              次の動画: {nextVideo.title}
            </button>
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-4">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            コース内容
          </h3>
          <VideoList
            sections={course.sections}
            currentVideoId={currentVideo.id}
            onVideoSelect={handleVideoSelect}
            watchedVideos={watchedVideos}
          />
        </div>
      </div>
    </div>
  );
}
