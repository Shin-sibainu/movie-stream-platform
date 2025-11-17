"use client";

import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  youtubeVideoId: string;
  onEnd?: () => void;
  onProgress?: (progress: number) => void; // 0-100の進捗
}

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function VideoPlayer({
  youtubeVideoId,
  onEnd,
  onProgress,
}: VideoPlayerProps) {
  const playerRef = useRef<YT.Player | null>(null);
  const iframeRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // YouTube IFrame APIの読み込み
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    // API準備完了時のコールバック
    const originalCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (originalCallback) originalCallback();

      if (!iframeRef.current) return;

      playerRef.current = new window.YT.Player(iframeRef.current, {
        videoId: youtubeVideoId,
        playerVars: {
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: (event: YT.OnStateChangeEvent) => {
            const player = event.target;

            // 動画が終了したらonEndを呼び出す
            if (event.data === window.YT.PlayerState.ENDED && onEnd) {
              onEnd();
            }

            // 進捗の追跡
            if (onProgress) {
              if (event.data === window.YT.PlayerState.PLAYING) {
                // 再生中は定期的に進捗を更新
                progressIntervalRef.current = setInterval(() => {
                  if (player && player.getCurrentTime && player.getDuration) {
                    const currentTime = player.getCurrentTime();
                    const duration = player.getDuration();
                    if (duration > 0) {
                      const progress = Math.round((currentTime / duration) * 100);
                      onProgress(progress);
                    }
                  }
                }, 1000);
              } else {
                // 一時停止や停止時は進捗更新を停止
                if (progressIntervalRef.current) {
                  clearInterval(progressIntervalRef.current);
                  progressIntervalRef.current = null;
                }
              }
            }
          },
          onReady: (event: YT.PlayerEvent) => {
            // プレイヤー準備完了
          },
        },
      });
    };

    // APIが既に読み込まれている場合
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }

    return () => {
      // クリーンアップ
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error("Failed to destroy player:", error);
        }
      }
    };
  }, [youtubeVideoId, onEnd, onProgress]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      <div ref={iframeRef} className="h-full w-full" />
    </div>
  );
}
