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
import { GripVertical, X } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useFieldArray, useFormContext } from "react-hook-form";

const SNS_PLATFORMS = [
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook" },
  { id: "brunch", label: "Brunch" },
  { id: "medium", label: "Medium" },
  { id: "x", label: "X (Twitter)" },
  { id: "threads", label: "Threads" },
  { id: "youtube", label: "YouTube" },
  { id: "blog", label: "블로그" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "email", label: "Email" },
];

export default function SNSBlockEdit({ index }: { index: number }) {
  const namePrefix = `blocks_draft.${index}.data.sns_links`;
  const { control, watch } = useFormContext();
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
          onClick={() => append({ platform: "", url: "", label: "" })}
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

                      {/* URL 필드 */}
                      <FormField
                        name={`${namePrefix}.${i}.url`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder={`${
                                  watch(`${namePrefix}.${i}.platform`) ===
                                  "email"
                                    ? "이메일 입력"
                                    : "https://..."
                                }`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* 삭제 버튼 */}
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => remove(i)}
                      >
                        <X className="w-4 h-4" />
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
