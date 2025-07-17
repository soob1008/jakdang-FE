import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm"
      )}
    >
      <Spinner className="w-14 h-14 text-gray-500" />
    </div>
  );
}
