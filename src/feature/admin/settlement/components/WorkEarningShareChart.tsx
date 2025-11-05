"use client";

import { useMemo } from "react";
import { Pie, PieChart, Cell, Tooltip, Legend } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/ui/card";
import { ChartContainer, ChartConfig } from "@/shared/ui/chart";
import { TrendingUp } from "lucide-react";

const rawData = [
  { title: "달빛 아래", total_earning: 1240000 },
  { title: "밤의 노래", total_earning: 830000 },
  { title: "하얀 섬", total_earning: 420000 },
];

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];

export default function WorkEarningShareChart() {
  const chartConfig: ChartConfig = useMemo(() => {
    return Object.fromEntries(
      rawData.map((item, i) => [
        item.title,
        { label: item.title, color: COLORS[i % COLORS.length] },
      ])
    );
  }, []);

  const chartData = useMemo(() => {
    const total = rawData.reduce((acc, cur) => acc + cur.total_earning, 0);
    return rawData.map((item) => ({
      name: item.title,
      value: item.total_earning,
      percent: ((item.total_earning / total) * 100).toFixed(1),
    }));
  }, [rawData]);

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>작품별 누적 수익 비중</CardTitle>
        <CardDescription>
          전체 수익 중 각 작품이 차지하는 비율입니다.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center">
        <ChartContainer
          className="h-[300px] w-full flex justify-center items-center"
          config={chartConfig}
        >
          <PieChart width={300} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              labelLine={false}
              label={({ name, percent }) => `${name} (${percent}%)`}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `₩${value.toLocaleString()}`}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          이번 달 ‘달빛 아래’ 수익이 52%를 차지했습니다.
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          작품별 수익 집중도를 한눈에 확인하세요.
        </div>
      </CardFooter>
    </Card>
  );
}
