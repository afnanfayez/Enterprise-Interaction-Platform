export default function AdminLoading() {
  return (
    <div className="space-y-8">
      {/* Heading skeleton */}
      <div className="h-7 w-48 animate-pulse rounded-md bg-neutral-200" />

      {/* Stats grid — 6 cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-neutral-200 bg-white p-4 shadow-card"
          >
            <div className="h-3 w-16 animate-pulse rounded bg-neutral-200" />
            <div className="mt-2 h-7 w-10 animate-pulse rounded bg-neutral-200" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="rounded-lg border border-neutral-200 bg-white shadow-card">
        {/* Table header */}
        <div className="flex gap-4 border-b border-neutral-200 px-4 py-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-4 flex-1 animate-pulse rounded bg-neutral-200"
            />
          ))}
        </div>
        {/* Table rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 border-b border-neutral-100 px-4 py-3 last:border-b-0"
          >
            {Array.from({ length: 5 }).map((_, j) => (
              <div
                key={j}
                className="h-4 flex-1 animate-pulse rounded bg-neutral-200"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
