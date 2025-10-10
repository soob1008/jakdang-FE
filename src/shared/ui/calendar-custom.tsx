"use client";

import {
  format,
  startOfWeek,
  startOfMonth,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  startOfDay,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomCalendarProps {
  markedDates?: Date[];
  disabled?: boolean;
  className?: string;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
}

// 항상 6주(=42일) 반환
function generateCalendarDays(currentDate: Date) {
  const start = startOfWeek(startOfMonth(currentDate));
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

export default function CustomCalendar({
  markedDates = [],
  disabled = false,
  className = "",
  currentMonth,
  setCurrentMonth,
}: CustomCalendarProps) {
  const days = generateCalendarDays(currentMonth);
  const today = startOfDay(new Date());

  return (
    <div
      className={`w-full p-4 border bg-white text-black dark:bg-muted dark:text-white ${className}`}
    >
      {/* Month navigation */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-semibold">
          {format(currentMonth, "yyyy년 MM월")}
        </h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Week header */}
      <div className="grid grid-cols-7 text-center text-xs font-medium text-muted-foreground mb-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs min-h-[14rem] sm:min-h-[16rem]">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isPast = day < today;
          const isMarked = markedDates.some((d) => isSameDay(d, day));

          return (
            <button
              key={day.toISOString()}
              disabled={disabled}
              className={`relative aspect-square md:w-14 md:h-15 md:m-auto rounded-md transition
    ${!isCurrentMonth ? "text-muted-foreground opacity-50" : ""}
    ${isPast ? "opacity-50" : ""}
  `}
            >
              <div className="relative flex items-center justify-center">
                {format(day, "d")}
                {isMarked && (
                  <span
                    className={`absolute top-[-6px] left-1/2 -translate-x-1/2 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${
                      isPast ? "bg-muted" : "bg-primary"
                    }`}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
