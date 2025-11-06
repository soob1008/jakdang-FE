import { cn } from "@/shared/lib/utils";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden rounded-md bg-muted/40",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_2.5s_infinite_linear]",
        // 🔽 빗살무늬 패턴 핵심 부분
        "before:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0)_100%)] dark:before:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0)_100%)]",
        className
      )}
      {...props}
    />
  );
}
