export default function Loading() {
          return (<main className="min-h-screen bg-[#f0f5f1] px-4 py-6 sm:px-6 lg:px-8"> <div className="mx-auto w-full max-w-6xl space-y-6 animate-pulse">

                    
                    {/* Category Header Skeleton */}
                    <section className="flex items-center gap-4 rounded-2xl border border-[#dce5dd] bg-white p-5 sm:p-6">
                              <div className="h-14 w-14 shrink-0 rounded-2xl bg-gray-200" />

                              <div className="flex-1 space-y-3">
                                        <div className="h-6 w-40 rounded-md bg-gray-200" />
                                        <div className="h-4 w-64 max-w-full rounded-md bg-gray-100" />
                              </div>
                    </section>

                    {/* Loading Text */}
                    <div className="flex items-center justify-center gap-3 py-3">
                              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-green-600" />
                              <p className="text-sm font-medium text-gray-600">
                                        পণ্যের দাম লোড হচ্ছে...
                              </p>
                    </div>

                    {/* Product Cards Skeleton */}
                    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                              {Array.from({ length: 8 }).map((_, index) => (
                                        <div
                                                  key={index}
                                                  className="overflow-hidden rounded-xl border border-[#dce5dd] bg-white p-3 sm:p-4"
                                        >
                                                  <div className="mb-4 aspect-square w-full rounded-lg bg-gray-200" />

                                                  <div className="mb-3 h-4 w-3/4 rounded bg-gray-200" />

                                                  <div className="mb-4 h-3 w-1/2 rounded bg-gray-100" />

                                                  <div className="mb-3 h-6 w-2/3 rounded bg-gray-200" />

                                                  <div className="h-9 w-full rounded-lg bg-gray-100" />
                                        </div>
                              ))}
                    </section>

          </div>
          </main>
 

);
}
