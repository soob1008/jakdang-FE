import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useFieldArray, useFormContext } from "react-hook-form";

const SNS_PLATFORMS = [
  { id: "instagram", label: "Instagram" }, // 이미지 기반 홍보
  { id: "brunch", label: "Brunch" }, // 글쓰기 플랫폼
  { id: "facebook", label: "Facebook" },
  { id: "velog", label: "Velog" }, // 기술/글 기반 블로그
  { id: "tistory", label: "Tistory" }, // 자유 블로그
  { id: "x", label: "X (Twitter)" }, // 짧은 글/홍보
  { id: "youtube", label: "YouTube" }, // 영상 콘텐츠
  { id: "naverBlog", label: "네이버 블로그" }, // 국내 대표 블로그
  { id: "tiktok", label: "TikTok" }, // 감각적인 홍보 영상
  { id: "personal", label: "개인 웹사이트" }, // 포트폴리오, 작가 페이지
  { id: "etc", label: "기타" },
];

export default function SNSBlock({ index }: { index: number }) {
  const namePrefix = `blocks_draft.${index}.data.sns_links`;
  const { control } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: namePrefix,
    keyName: "block_id",
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-semibold">SNS 링크</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ platform: "", url: "" })}
        >
          + SNS 추가
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sns-links">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-3"
            >
              {fields.map((field, i) => (
                <Draggable
                  key={field.block_id}
                  draggableId={field.block_id}
                  index={i}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center gap-4"
                    >
                      <div {...provided.dragHandleProps}>
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                      </div>

                      <FormField
                        name={`${namePrefix}.${i}.platform`}
                        render={({ field }) => (
                          <FormItem className="w-1/5">
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="선택" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {SNS_PLATFORMS.map((platform) => (
                                  <SelectItem
                                    key={platform.id}
                                    value={platform.id}
                                  >
                                    {platform.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name={`${namePrefix}.${i}.url`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => remove(i)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
