"use client";

import { useState, useMemo, useEffect } from "react";
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
import useWorksWeeklyEarning from "@/feature/admin/settlement/hooks/useWorkWeeklyEarning";
import useWorks from "@/feature/admin/works/hooks/useWorks";
import { Skeleton } from "@/shared/ui/skeleton";

interface WorkEarningChartProps {
  year: string;
  month: string;
}

export default function WorkEarningChart({
  year,
  month,
}: WorkEarningChartProps) {
  const { data: works = [] } = useWorks();

  const workOptions = useMemo(
    () =>
      works.map((w) => ({
        label: w.title,
        value: String(w.id),
      })),
    [works]
  );

  const [selected, setSelected] = useState<{
    label: string;
    value: string;
  }>();

  useEffect(() => {
    if (works.length > 0 && !selected) {
      setSelected({
        label: works[0].title,
        value: String(works[0].id),
      });
    }
  }, [works, selected]);

  const workId = selected?.value;
  const { data: weeklyEarning = [] } = useWorksWeeklyEarning({
    work_id: workId,
    year,
    month,
  });

  const chartConfig = useMemo(() => {
    return Object.fromEntries(
      works.map((work, i) => [
        work.title,
        { label: work.title, color: `var(--chart-${(i % 5) + 1})` },
      ])
    );
  }, [works]);

  const selectedColor =
    (selected && chartConfig[selected.label]?.color) || "var(--chart-1)";

  if (!selected) {
    return <Skeleton />;
  }

  return (
    <Card className="py-6">
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <CardTitle>작품별 주간 수익 추이</CardTitle>
          <CardDescription className="mt-1">
            작품을 선택해 주 단위 수익을 확인하세요.
          </CardDescription>
        </div>

        <Select
          value={selected.value}
          onValueChange={(v) => {
            const newSelected = workOptions.find((w) => w.value === v);
            if (newSelected) setSelected(newSelected);
          }}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="작품 선택" />
          </SelectTrigger>
          <SelectContent>
            {workOptions.map((work) => (
              <SelectItem key={work.value} value={work.value}>
                {work.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <ChartContainer className="mt-6 h-[300px] w-full" config={chartConfig}>
          <LineChart
            data={weeklyEarning}
            margin={{ top: 5, right: 4, left: 10, bottom: 0 }}
          >
            <CartesianGrid vertical strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              width={30}
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
          {selected.label}의 주 단위 수익입니다.{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
