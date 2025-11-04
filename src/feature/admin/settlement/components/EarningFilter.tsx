import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui/select";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { CalendarIcon } from "lucide-react";
import { SETTLEMENT_STATUS_OPTIONS } from "@/entities/settlement/consts/status";
import useWorks from "@/feature/admin/works/hooks/useWorks";
import type { UseEarningsParams } from "../hooks/useEarnings";

export default function EarningFilter({
  value,
  onChange,
  onApply,
  disableApply = false,
}: {
  value: UseEarningsParams;
  onChange: (query: UseEarningsParams) => void;
  onApply: (query: UseEarningsParams) => void;
  disableApply?: boolean;
}) {
  const { data: works } = useWorks();
  const [draft, setDraft] = useState<UseEarningsParams>({ ...value });

  useEffect(() => {
    setDraft({ ...value });
  }, [value]);

  const updateField = (nextState: UseEarningsParams) => {
    setDraft(nextState);
    onChange(nextState);
  };

  const handleSelectChange = (
    field: keyof UseEarningsParams,
    rawValue: string
  ) => {
    const nextState = {
      ...draft,
      [field]: rawValue === "all" ? null : rawValue,
    };
    updateField(nextState);
  };

  const handleRangeChange = (range: { from?: Date; to?: Date } | undefined) => {
    const toDateString = (date?: Date) =>
      date ? date.toISOString().split("T")[0] : null;

    const nextState: UseEarningsParams = {
      ...draft,
      start_date: toDateString(range?.from),
      end_date: toDateString(range?.to),
    };
    updateField(nextState);
  };

  const handleReset = () => {
    const nextState: UseEarningsParams = {
      work: null,
      status: null,
      start_date: null,
      end_date: null,
    };
    setDraft(nextState);
    onChange(nextState);
    onApply(nextState);
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white/90 px-6 py-6 shadow-sm backdrop-blur-sm">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-gray-900">정산 필터</h2>
        </div>
      </header>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <FilterItem
          label="작품"
          description="정산 내역을 확인할 작품을 선택하세요."
        >
          <Select
            value={draft.work ?? "all"}
            onValueChange={(val) => handleSelectChange("work", val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="작품을 선택하세요." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 작품</SelectItem>
              {works?.map((work) => (
                <SelectItem key={work.id} value={work.id}>
                  {work.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterItem>

        <FilterItem
          label="정산 상태"
          description="현재 정산 진행 상황으로 필터링하세요."
        >
          <Select
            value={draft.status ?? "all"}
            onValueChange={(val) => handleSelectChange("status", val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="정산 상태를 선택하세요." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              {SETTLEMENT_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterItem>

        <FilterItem label="결제일" description="결제일을 선택하세요.">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start gap-2 text-left font-normal"
              >
                <CalendarIcon className="size-4 text-gray-500" />
                {draft.start_date || draft.end_date
                  ? `${draft.start_date ?? "시작일"} ~ ${
                      draft.end_date ?? "종료일"
                    }`
                  : "기간 선택"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                numberOfMonths={2}
                selected={
                  draft.start_date || draft.end_date
                    ? {
                        from: draft.start_date
                          ? new Date(draft.start_date)
                          : undefined,
                        to: draft.end_date
                          ? new Date(draft.end_date)
                          : undefined,
                      }
                    : undefined
                }
                onSelect={handleRangeChange}
              />
            </PopoverContent>
          </Popover>
        </FilterItem>
      </div>

      <footer className="mt-6 flex flex-wrap items-center justify-end gap-2">
        <Button type="button" variant="outline" size="sm" onClick={handleReset}>
          초기화
        </Button>
        <Button
          type="button"
          size="sm"
          disabled={disableApply}
          onClick={() => onApply(draft)}
        >
          적용하기
        </Button>
      </footer>
    </section>
  );
}

interface FilterItemProps {
  label: string;
  description?: string;
  children: ReactNode;
}

const FilterItem = ({ label, description, children }: FilterItemProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-100 bg-white/70 px-4 py-3 shadow-xs">
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
        <span>{label}</span>
        {description ? (
          <span className="font-normal text-gray-400">{description}</span>
        ) : null}
      </div>
      <div className="min-h-[38px]">{children}</div>
    </div>
  );
};
