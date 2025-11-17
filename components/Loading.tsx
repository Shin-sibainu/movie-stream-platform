"use client";

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = "読み込み中..." }: LoadingProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030712] px-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 px-10 py-12 text-center shadow-[0_25px_60px_rgba(2,6,23,0.45)]">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-blue-400" />
        </div>
        <p className="text-sm font-medium text-slate-300">{message}</p>
      </div>
    </div>
  );
}

