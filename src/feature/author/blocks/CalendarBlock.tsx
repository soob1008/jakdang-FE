"use client";

import { useState } from "react";
import {
  Block,
  BlockDataCalendar,
  PageStyle,
} from "@/entities/page/model/types";
import { Card, CardContent } from "@/shared/ui/card";
import {
  format,
  isSameMonth,
  isSameYear,
  isThisMonth,
  addDays,
  startOfDay,
} from "date-fns";
import CustomCalendar from "@/shared/ui/calendar-custom";

interface CalendarBlockProps {
  block: Block;
  style: PageStyle;
}

export default function CalendarBlock({ block, style }: CalendarBlockProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  if (!block.is_active) return null;

  const { dates, layout } = block.data as BlockDataCalendar;

  // 일정 범위 전체 마킹 (start_date ~ end_date)
  const markedDates = dates.flatMap((d) => {
    const start = new Date(d.start_date);
    const end = new Date(d.end_date);
    const days = [];
    let cur = startOfDay(start);
    while (cur <= end) {
      days.push(new Date(cur));
      cur = addDays(cur, 1);
    }
    return days;
  });

  const isSameMonthDate = (d: string | Date) =>
    isSameMonth(new Date(d), currentMonth) &&
    isSameYear(new Date(d), currentMonth);

  const filteredDates =
    layout === "calendar"
      ? dates.filter((d) => isSameMonthDate(d.start_date))
      : dates.filter((d) => isThisMonth(new Date(d.start_date)));

  if (!dates || dates.length === 0) return null;

  return (
    <div className="space-y-2">
      {layout === "calendar" && (
        <CustomCalendar
          className={`w-full ${
            style?.button_style === "sharp" ? "rounded-none" : "rounded-lg"
          }`}
          markedDates={markedDates}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          disabled
        />
      )}

      <div className="space-y-2">
        {filteredDates.map((date, index) => (
          <Card
            key={index}
            className={`${
              style?.button_style === "sharp" ? "rounded-none" : "rounded-lg"
            }`}
          >
            <CardContent className="py-3 px-4 space-y-1">
              <h3 className="text-base font-semibold">{date.title}</h3>
              {date.description && (
                <p className="text-sm text-muted-foreground">
                  {date.description}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {format(new Date(date.start_date), "yyyy.MM.dd")} ~{" "}
                {format(new Date(date.end_date), "yyyy.MM.dd")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
