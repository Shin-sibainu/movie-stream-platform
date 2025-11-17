"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY_PREFIX = "video_progress_";

export function useVideoProgress(courseId: string) {
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());

  // localStorageから視聴済み動画を読み込む
  useEffect(() => {
    const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${courseId}`);
    if (stored) {
      try {
        const videoIds = JSON.parse(stored) as string[];
        setWatchedVideos(new Set(videoIds));
      } catch (error) {
        console.error("Failed to load video progress:", error);
      }
    }
  }, [courseId]);

  // 動画を視聴済みとしてマーク
  const markAsWatched = useCallback(
    (videoId: string) => {
      setWatchedVideos((prev) => {
        const updated = new Set(prev);
        updated.add(videoId);
        // localStorageに保存
        localStorage.setItem(
          `${STORAGE_KEY_PREFIX}${courseId}`,
          JSON.stringify(Array.from(updated)),
        );
        return updated;
      });
    },
    [courseId],
  );

  // 動画が視聴済みかチェック
  const isWatched = useCallback(
    (videoId: string) => {
      return watchedVideos.has(videoId);
    },
    [watchedVideos],
  );

  // 進捗率を計算（0-100）
  const getProgress = useCallback(
    (totalVideos: number) => {
      if (totalVideos === 0) return 0;
      return Math.round((watchedVideos.size / totalVideos) * 100);
    },
    [watchedVideos],
  );

  return {
    watchedVideos,
    markAsWatched,
    isWatched,
    getProgress,
  };
}

