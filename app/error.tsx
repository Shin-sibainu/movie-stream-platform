"use client";

import { useEffect } from "react";

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Home page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030712] px-6">
      <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center text-slate-100 shadow-[0_30px_70px_rgba(2,6,23,0.45)]">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
          ERROR
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          エラーが発生しました
        </h2>
        <p className="mt-4 text-sm text-slate-300">
          {error.message || "コース一覧の読み込みに失敗しました"}
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-blue-600"
        >
          再試行
        </button>
      </div>
    </div>
  );
}

