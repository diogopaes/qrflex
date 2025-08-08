import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 mt-12 gap-6">
        {/* Card 1 - QR Codes */}
        <div className="relative bg-white rounded-2xl p-4 md:p-8 border border-gray-100">
          <div className="absolute -top-4 -left-4 md:w-12 md:h-12 w-10 h-10">
            <Skeleton className="h-full w-full rounded-2xl" />
          </div>
          <div className="">
            <Skeleton className="h-5 w-24 mb-4" />
            <Skeleton className="h-12 w-16 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Card 2 - Acessos */}
        <div className="relative bg-white rounded-2xl p-4 md:p-8 border border-gray-100">
          <div className="absolute -top-4 -left-4 md:w-12 md:h-12 w-10 h-10">
            <Skeleton className="h-full w-full rounded-2xl" />
          </div>
          <div className="">
            <Skeleton className="h-5 w-24 mb-4" />
            <Skeleton className="h-12 w-16 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Card 3 - Taxa de Acessos */}
        <div className="relative bg-white rounded-2xl p-4 md:p-8 border border-gray-100">
          <div className="absolute -top-4 -left-4 md:w-12 md:h-12 w-10 h-10">
            <Skeleton className="h-full w-full rounded-2xl" />
          </div>
          <div className="">
            <Skeleton className="h-5 w-32 mb-4" />
            <Skeleton className="h-12 w-16 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Card 4 - Plano Atual */}
        <div className="relative bg-white rounded-2xl p-4 md:p-8 border border-gray-100">
          <div className="absolute -top-4 -left-4 md:w-12 md:h-12 w-10 h-10">
            <Skeleton className="h-full w-full rounded-2xl" />
          </div>
          <div className="">
            <Skeleton className="h-5 w-24 mb-4" />
            <Skeleton className="h-12 w-24 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      {/* QR Codes List */}
      <div className="mt-12">
        <div className="bg-white relative rounded-2xl p-8 border border-gray-100">
          <div className="absolute -top-4 -left-4 md:w-12 md:h-12 w-10 h-10">
            <Skeleton className="h-full w-full rounded-2xl" />
          </div>
          <Skeleton className="h-8 w-48 mb-8" />
          
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-50/50 border border-gray-100 rounded-xl p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <Skeleton className="h-4 w-16 mb-1" />
                      <Skeleton className="h-8 w-12" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-10 w-24 rounded-full" />
                      <Skeleton className="h-10 w-24 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Skeleton className="h-12 w-48 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
