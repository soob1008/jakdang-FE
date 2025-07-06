"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { cn } from "@/app/lib/utils";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ 1. 스키마 정의 (type-safe)
const formSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  date: z.date({ required_error: "날짜를 선택해주세요" }),
  address: z.string().min(1, "장소를 입력해주세요"),
  needs: z.string().optional(),
  type: z.enum(["birthday", "house"], {
    required_error: "초대장 종류를 선택해주세요",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function WritePage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: undefined,
      address: "",
      needs: "",
      type: undefined,
    },
  });

  console.log(form.watch());

  const onSubmit = (values: FormValues) => {
    console.log("제출된 값:", values);
  };

  return (
    <main className="min-h-screen px-4 py-8 ">
      <section className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center text-[#1F2937] mb-6">
          초대장 만들기
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-sm text-[#1F2937]"
          >
            {/* 제목 */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input placeholder="예: 수빈이 생일파티 🎂" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* 날짜 */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>날짜</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? format(field.value, "yyyy-MM-dd")
                            : "날짜를 선택하세요"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            {/* 장소 */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>장소</FormLabel>
                  <FormControl>
                    <Input placeholder="예: 서울 마포구..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* 준비물 */}
            <FormField
              control={form.control}
              name="needs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>준비물</FormLabel>
                  <FormControl>
                    <Input placeholder="예: 케이크, 선물 등" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* 종류 */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>초대장 종류</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="종류를 선택하세요" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="birthday">🎂 생일파티</SelectItem>
                      <SelectItem value="house">🏠 집들이</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="xl"
              className="w-full text-white text-base font-semibold "
            >
              초대장 생성하기
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
}
