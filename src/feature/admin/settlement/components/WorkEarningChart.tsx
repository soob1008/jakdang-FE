"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/shared/ui/select";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

// 더미 데이터
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

export default function WorkEarningChart() {
  const titles = useMemo(
    () => chartData[0]?.works.map((w) => w.title) ?? [],
    [chartData]
  );
  const [selected, setSelected] = useState(titles[0]);

  const chartConfig = useMemo(() => {
    if (!chartData.length) return {};
    return Object.fromEntries(
      chartData[0].works.map((w, i) => [
        w.title,
        { label: w.title, color: `var(--chart-${(i % 6) + 1})` },
      ])
    );
  }, [chartData]);

  const data = chartData.map((d) => ({
    week: d.week,
    amount: d.works.find((w) => w.title === selected)?.amount ?? 0,
  }));

  const selectedColor = chartConfig[selected]?.color ?? "var(--chart-1)";

  return (
    <Card className="py-6">
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <CardTitle>작품별 주간 수익 추이</CardTitle>
          <CardDescription className="mt-1">
            작품을 선택해 주 단위 수익을 확인하세요.
          </CardDescription>
        </div>

        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="작품 선택" />
          </SelectTrigger>
          <SelectContent>
            {titles.map((title) => (
              <SelectItem key={title} value={title}>
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <ChartContainer className="h-[300px] w-full" config={chartConfig}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 4, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              width={45}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="amount"
              stroke={selectedColor}
              strokeWidth={2}
              dot={{ r: 3 }}
              type="monotone"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-1 text-sm mt-3">
        <div className="flex gap-2 font-medium leading-none">
          {selected}의 주 단위 수익입니다. <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
