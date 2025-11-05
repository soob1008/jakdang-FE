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
import useWorkCumulativeEarning from "../hooks/useWorkCumulativeEarning";
import { Skeleton } from "@/shared/ui/skeleton";

interface WorkCumulativeEarningChartProps {
  year: string;
  month: string;
}

export default function WorkCumulativeEarningChart({
  year,
  month,
}: WorkCumulativeEarningChartProps) {
  const { data: cumulativeEarnings = [], isLoading } = useWorkCumulativeEarning(
    {
      year,
      month,
    }
  );

  const chartConfig: ChartConfig = useMemo(() => {
    return Object.fromEntries(
      cumulativeEarnings.map((work, i) => [
        work.title,
        { label: work.title, color: `var(--chart-${(i % 6) + 1})` },
      ])
    );
  }, [cumulativeEarnings]);

  if (isLoading) return <Skeleton />;

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>작품별 누적 수익 비중</CardTitle>
        <CardDescription>
          전체 수익 중 각 작품이 차지하는 비율입니다.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center">
        {cumulativeEarnings.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">
            수익이 없습니다.
          </div>
        ) : (
          <ChartContainer
            className="h-[300px] w-full flex justify-center items-center"
            config={chartConfig}
          >
            <PieChart width={300} height={300}>
              <Pie
                data={cumulativeEarnings}
                dataKey="total_earning"
                nameKey="title"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={0}
                labelLine={false}
                label={({ name, percent }) => `${name} (${percent}%)`}
              >
                {cumulativeEarnings.map((_, index) => (
                  <Cell key={index} fill={`var(--chart-${(index % 6) + 1})`} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `₩${value.toLocaleString()}`}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          작품별 수익 집중도를 한눈에 확인하세요.
          {/* ‘달빛 아래’ 수익이 52%를 차지했습니다.
          <TrendingUp className="h-4 w-4" /> */}
        </div>
      </CardFooter>
    </Card>
  );
}
