export default function OrdersLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="h-7 w-32 animate-pulse rounded-md bg-neutral-200" />
        <div className="h-9 w-28 animate-pulse rounded-md bg-neutral-200" />
      </div>

      {/* Order list skeletons */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-neutral-200 bg-white p-4 shadow-card"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="h-4 w-40 animate-pulse rounded bg-neutral-200" />
                <div className="mt-1.5 h-3 w-56 animate-pulse rounded bg-neutral-200" />
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <div className="h-6 w-20 animate-pulse rounded-full bg-neutral-200" />
                <div className="h-3 w-16 animate-pulse rounded bg-neutral-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
