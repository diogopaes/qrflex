import { cn } from "@/lib/utils";

export default function StatCard({
    icon,
    value,
    label,
    hint,
    locked = false,
    onUpgrade,
    accent = "text-primary",
  }: {
    icon: React.ReactNode;
    value: React.ReactNode;
    label: string;
    hint?: string;
    locked?: boolean;
    onUpgrade?: () => void;
    accent?: string;
  }) {
    return (
      <div className="relative bg-white rounded-2xl p-4 md:py-5 px-8 border border-gray-100 hover:border-gray-200 transition-all group flex flex-col justify-center">
        <div className="absolute -top-4 -left-4 md:w-12 md:h-10 w-10 h-10 bg-primary/5 rounded-2xl grid place-items-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
  
        {/* valor grande primeiro */}
        <div className={`md:text-3xl text-2xl font-bold ${locked ? "text-gray-300" : accent}`}>
          {locked ? "•••" : value}
        </div>
  
        {/* rótulo curto */}
        <h3 className="mt-1 text-sm md:text-base font-semibold text-gray-900">{label}</h3>
  
        {/* legenda */}
        <p className="text-gray-400 text-xs mt-1">
          {locked ? (
            <>
              Disponível no plano Completo{" "}
              {onUpgrade && (
                <button
                  onClick={onUpgrade}
                  className="ml-1 text-[10px] cursor-pointer bg-yellow-200 text-yellow-700 px-2 py-0.5 rounded-full hover:scale-105"
                >
                  Atualizar
                </button>
              )}
            </>
          ) : (
            hint
          )}
        </p>
      </div>
    );
  }
  