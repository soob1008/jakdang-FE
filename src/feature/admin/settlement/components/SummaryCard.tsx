import { cn } from "@/shared/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string;
  subLabel?: string;
  subValue?: string;
  sub?: string;
  highlight?: boolean;
}

export default function SummaryCard({
  title,
  value,
  subLabel,
  subValue,
  sub,
  highlight,
}: SummaryCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 flex flex-col justify-between bg-white",
        highlight && "bg-indigo-50 border-indigo-200"
      )}
    >
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
      </div>

      {subLabel && subValue && (
        <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
          <span>{subLabel}</span>
          <span className="font-medium">{subValue}</span>
        </div>
      )}

      {sub && <p className="mt-2 text-sm text-gray-500">{sub}</p>}
    </div>
  );
}
