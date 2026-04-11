export default function DashboardLoading() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header skeleton */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="h-7 w-48 animate-pulse rounded-md bg-neutral-200" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-neutral-200" />
        </div>
        <div className="h-10 w-32 animate-pulse rounded-md bg-neutral-200" />
      </div>

      {/* 5 stat card skeletons */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-neutral-200 bg-white p-4 shadow-card"
          >
            <div className="h-4 w-20 animate-pulse rounded bg-neutral-200" />
            <div className="mt-2 h-7 w-12 animate-pulse rounded bg-neutral-200" />
          </div>
        ))}
      </div>

      {/* Recent orders heading */}
      <div className="mb-4 flex items-center justify-between">
        <div className="h-6 w-40 animate-pulse rounded bg-neutral-200" />
        <div className="h-8 w-24 animate-pulse rounded bg-neutral-200" />
      </div>

      {/* List skeletons */}
      <div className="rounded-lg border border-neutral-200 bg-white shadow-card">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-neutral-100 px-4 py-3 last:border-b-0"
          >
            <div className="min-w-0 flex-1">
              <div className="h-4 w-32 animate-pulse rounded bg-neutral-200" />
              <div className="mt-1.5 h-3 w-24 animate-pulse rounded bg-neutral-200" />
            </div>
            <div className="h-6 w-20 animate-pulse rounded-full bg-neutral-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
