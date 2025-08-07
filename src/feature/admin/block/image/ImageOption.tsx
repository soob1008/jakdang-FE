import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { useFormContext, useWatch } from "react-hook-form";
import { Columns2, LayoutGrid, Images, Maximize, Minimize } from "lucide-react";

interface ImageOptionProps {
  index: number;
}

export default function ImageOption({ index }: ImageOptionProps) {
  const namePrefix = `blocks_draft.${index}.data`;
  const { control, setValue } = useFormContext();

  const style: string = useWatch({ name: `${namePrefix}.style`, control });

  return (
    <div className="space-y-6">
      {/* 스타일 선택 */}
      <FormField
        name={`${namePrefix}.style`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>스타일</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val);
                  setValue(`${namePrefix}.columns`, undefined); // reset columns
                }}
                className="flex flex-wrap gap-4"
              >
                <ImageStyleButton
                  value="single"
                  label="한 장"
                  icon={<Images className="w-5 h-5" />}
                  selected={field.value === "single"}
                  onClick={() => field.onChange("single")}
                />
                <ImageStyleButton
                  value="grid"
                  label="그리드"
                  icon={<LayoutGrid className="w-5 h-5" />}
                  selected={field.value === "grid"}
                  onClick={() => field.onChange("grid")}
                />
                <ImageStyleButton
                  value="carousel"
                  label="슬라이드"
                  icon={<Columns2 className="w-5 h-5" />}
                  selected={field.value === "carousel"}
                  onClick={() => field.onChange("carousel")}
                />
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* grid일 때만 열 수 선택 */}
      {style === "grid" && (
        <FormField
          name={`${namePrefix}.columns`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>열 수</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-4"
                >
                  {[1, 2, 3].map((col) => (
                    <ImageStyleButton
                      key={col}
                      value={String(col)}
                      label={`${col}열`}
                      icon={<Columns2 className="w-5 h-5" />}
                      selected={field.value === String(col)}
                      onClick={() => field.onChange(String(col))}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* 공통 표시 방식 */}
      <FormField
        name={`${namePrefix}.display`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>표시 방식</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex gap-4"
              >
                <ImageStyleButton
                  value="fill"
                  label="이미지 채우기 (100%)"
                  icon={<Maximize className="w-5 h-5" />}
                  selected={field.value === "fill"}
                  onClick={() => field.onChange("fill")}
                />
                <ImageStyleButton
                  value="fit"
                  label="비율 유지 맞춤"
                  icon={<Minimize className="w-5 h-5" />}
                  selected={field.value === "fit"}
                  onClick={() => field.onChange("fit")}
                />
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

interface ImageStyleButtonProps {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

function ImageStyleButton({
  label,
  icon,
  selected,
  onClick,
}: ImageStyleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-24 h-20 border rounded-md flex flex-col items-center justify-center gap-1 text-xs ${
        selected ? "border-ring bg-muted" : "border-border"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
