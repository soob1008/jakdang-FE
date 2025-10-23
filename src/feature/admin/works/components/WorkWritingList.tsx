import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { Work } from "@/entities/work/model/type";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type WorkEpisodeListProps = {
  selectedWork: Work | null;
  onDeleteWriting: (workId: string, writingId: string, title: string) => void;
};

export default function WorkWritingList({
  selectedWork,
  onDeleteWriting,
}: WorkEpisodeListProps) {
  const router = useRouter();

  if (!selectedWork) {
    return (
      <aside className="w-1/3 bg-white border h-140 rounded-lg shadow-sm p-4 flex flex-col items-center justify-center text-gray-500">
        <p className="text-sm">작품을 선택해주세요.</p>
      </aside>
    );
  }

  const hasWritings = selectedWork.writings.length > 0;

  return (
    <aside className="w-1/3 bg-white border rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-6 ">
        <h3 className="font-semibold text-sm mr-2">{selectedWork.title}</h3>
        <Button
          size="sm"
          onClick={() => {
            router.push(`/admin/works/${selectedWork.id}/new`);
          }}
        >
          새 글 추가
        </Button>
      </div>
      {hasWritings ? (
        <ul className="overflow-auto max-h-[500px] flex flex-col gap-2">
          {selectedWork.writings.map((writing) => (
            <li
              key={writing.id}
              className="border rounded-md p-3 hover:bg-gray-50 transition-colors"
            >
              {/* 제목 + 날짜 */}
              <div className="flex items-start justify-between mb-1.5 gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 line-clamp-1">
                    {writing.title}
                  </p>
                  <span className="mt-1 inline-block text-xs text-gray-500">
                    {format(new Date(writing.created_at), "yyyy-MM-dd")}
                  </span>
                </div>
                <Link
                  href={`/@${selectedWork.slug}/works/${selectedWork.id}/writing/${writing.id}`}
                  className="flex items-center gap-1 shrink-0 text-xs"
                  target="_blank"
                >
                  글 보기
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* 상태 + 버튼 */}
              <div className="flex items-center justify-between mt-2">
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-sm",
                    writing.is_public
                      ? "text-green-600 bg-green-100"
                      : "text-gray-500 bg-gray-100"
                  )}
                >
                  {writing.is_public ? "공개" : "비공개"}
                </span>

                <div className="flex items-center gap-1.5 ml-auto">
                  <Button
                    size="xs"
                    variant="secondary"
                    onClick={() => {
                      router.push(
                        `/admin/works/${selectedWork.id}/edit/${writing.id}`
                      );
                    }}
                  >
                    수정
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => {
                      onDeleteWriting(
                        selectedWork.id,
                        writing.id,
                        writing.title
                      );
                    }}
                  >
                    삭제
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <p className="text-sm text-center">
            아직 등록된 콘텐츠가 없습니다.
            <br />
            새로운 글을 추가해보세요.
          </p>
        </div>
      )}
    </aside>
  );
}
