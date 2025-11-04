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

export default function SettlementFilter() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white/90 px-6 py-6 shadow-sm backdrop-blur-sm">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-gray-900">정산 필터</h2>
          {/* <p className="text-xs text-gray-500">
            원하는 조건을 선택해 정산 내역을 빠르게 찾아보세요.
          </p> */}
        </div>
      </header>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <FilterItem
          label="작품"
          description="정산 내역을 확인할 작품을 선택하세요."
        >
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="작품을 선택하세요." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 작품</SelectItem>
              <SelectItem value="series-1">연재 작품 1</SelectItem>
              <SelectItem value="single-2">단편 작품 2</SelectItem>
            </SelectContent>
          </Select>
        </FilterItem>

        <FilterItem
          label="정산 상태"
          description="현재 정산 진행 상황으로 필터링하세요."
        >
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="정산 상태를 선택하세요." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="waiting">정산 대기</SelectItem>
              <SelectItem value="progress">정산 진행 중</SelectItem>
              <SelectItem value="completed">정산 완료</SelectItem>
            </SelectContent>
          </Select>
        </FilterItem>

        <FilterItem
          label="정산 기간"
          description="정산이 진행된 기간을 선택하세요."
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start gap-2 text-left font-normal"
              >
                <CalendarIcon className="size-4 text-gray-500" />
                기간 선택
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                numberOfMonths={2}
                // selected={}
                // onSelect={}
                // locale={ko}
              />
            </PopoverContent>
          </Popover>
        </FilterItem>
      </div>

      <footer className="mt-6 flex flex-wrap items-center justify-end gap-2">
        <Button type="button" variant="ghost" size="sm">
          초기화
        </Button>
        <Button type="button" size="sm">
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
