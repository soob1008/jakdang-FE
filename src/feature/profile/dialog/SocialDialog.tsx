"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "@/components/ui/ResponsiveDialog";
import { Dispatch, SetStateAction } from "react";

const schema = z.object({
  platform: z.enum(["twitter", "instagram", "brunch", "x", "medium"]),
  url: z.string().url("올바른 링크를 입력해주세요"),
});

type SocialFormValues = z.infer<typeof schema>;

export default function SocialDialog({
  mode = "create",
  open = false,
  setIsOpen,
}: {
  mode?: "create" | "edit";
  open?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<SocialFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      platform: "twitter",
      url: "",
    },
  });

  const onSubmit = (data: SocialFormValues) => {
    console.log("SNS 등록 정보:", data);
    // 저장 또는 수정 처리
  };

  const platformLabelMap: Record<SocialFormValues["platform"], string> = {
    twitter: "Twitter",
    instagram: "Instagram",
    brunch: "Brunch",
    x: "X (구 Twitter)",
    medium: "Medium",
  };

  return (
    <ResponsiveDialog
      trigger={
        <Button variant="muted" size="sm">
          <Plus className="w-4 h-4 mr-1" /> Create
        </Button>
      }
      open={open}
      onOpenChange={setIsOpen}
      title={mode === "create" ? "SNS 링크 추가" : "SNS 링크 수정"}
      description="등록할 SNS 종류를 선택하고, 연결할 링크를 입력해주세요."
      submitText="추가하기"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <div className="space-y-6">
          {/* SNS 종류 선택 */}
          <FormItem>
            <FormLabel>플랫폼</FormLabel>
            <FormControl>
              <Select
                onValueChange={(val) =>
                  form.setValue("platform", val as SocialFormValues["platform"])
                }
                defaultValue={form.getValues("platform")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="SNS 선택" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(platformLabelMap).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>

          {/* 링크 입력 */}
          <FormItem>
            <FormLabel>링크</FormLabel>
            <FormControl>
              <Input
                placeholder="https://example.com/your-profile"
                {...form.register("url")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
      </Form>
    </ResponsiveDialog>
  );
}
