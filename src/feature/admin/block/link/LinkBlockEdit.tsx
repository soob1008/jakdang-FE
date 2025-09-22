import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/shared/ui/form";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

export default function LinkBlockEdit({ index }: { index: number }) {
  const namePrefix = `blocks_draft.${index}.data.links`;
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">링크 설정</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ label: "", url: "" })}
        >
          <Plus className="w-4 h-4 mr-1" /> 링크 추가하기
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="links">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-4"
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
                      className="flex items-start gap-2"
                    >
                      <div {...provided.dragHandleProps}>
                        <GripVertical className="w-4 h-4 mt-3 text-muted-foreground cursor-move" />
                      </div>

                      <div className="w-full space-y-2">
                        <FormField
                          name={`${namePrefix}.${i}.label`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="링크 제목" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name={`${namePrefix}.${i}.url`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="https://example.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(i)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
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
