import { getCourses } from "@/lib/courses";
import CourseCard from "@/components/CourseCard";

export const metadata = {
  title: "コース一覧 | 動画配信プラットフォーム",
  description: "利用可能なコース一覧",
};

export default async function Home() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            動画配信プラットフォーム
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
          コース一覧
        </h2>
        {courses.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
            <p className="text-gray-600 dark:text-gray-400">
              コースがありません
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="animate-fade-in"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
