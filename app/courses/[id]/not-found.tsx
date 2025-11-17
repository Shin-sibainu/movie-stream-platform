import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030712] px-6">
      <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center text-slate-100 shadow-[0_30px_70px_rgba(2,6,23,0.45)]">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
          STATUS
        </p>
        <h1 className="mt-2 text-5xl font-bold text-white">404</h1>
        <p className="mt-4 text-sm text-slate-300">
          コースが見つかりませんでした
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-blue-600"
        >
          コース一覧に戻る
        </Link>
      </div>
    </div>
  );
}

