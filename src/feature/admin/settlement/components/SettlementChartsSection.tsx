"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/shared/ui/select";
import { Card } from "@/shared/ui/card";
import WorkEarningChart from "./WorkEarningChart";
import SettlementResultChart from "./SettlementResultChart";

const chartData = [
  {
    week: "1주차 (1~7일)",
    works: [
      { title: "달빛 아래", amount: 58000 },
      { title: "밤의 노래", amount: 41000 },
      { title: "하얀 섬", amount: 27000 },
    ],
  },
  {
    week: "2주차 (8~14일)",
    works: [
      { title: "달빛 아래", amount: 64000 },
      { title: "밤의 노래", amount: 39000 },
      { title: "하얀 섬", amount: 35000 },
    ],
  },
  {
    week: "3주차 (15~21일)",
    works: [
      { title: "달빛 아래", amount: 72000 },
      { title: "밤의 노래", amount: 46000 },
      { title: "하얀 섬", amount: 41000 },
    ],
  },
  {
    week: "4주차 (22~30일)",
    works: [
      { title: "달빛 아래", amount: 69000 },
      { title: "밤의 노래", amount: 52000 },
      { title: "하얀 섬", amount: 38000 },
    ],
  },
];

export default function SettlementChartsSection() {
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("11");

  return (
    <section className="space-y-6">
      {/* 헤더: 제목 + 월 선택 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="font-semibold">수익 트렌드 분석</h2>

        <div className="flex items-center gap-2">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[100px] bg-white">
              <SelectValue placeholder="연도" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>

          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-[90px] bg-white">
              <SelectValue placeholder="월" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                  {i + 1}월
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 차트 카드 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WorkEarningChart />

        <Card className="p-5">
          <h3 className="text-sm font-medium text-gray-600 mb-4">
            정산 성공/실패 건수
          </h3>
          <SettlementResultChart />
        </Card>
      </div>
    </section>
  );
}
