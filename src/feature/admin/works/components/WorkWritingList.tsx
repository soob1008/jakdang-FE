import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { Work } from "@/entities/work/model/type";
import { useRouter } from "next/navigation";

type WorkEpisodeListProps = {
  selectedWork: Work | null;
};

export default function WorkWritingList({
  selectedWork,
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
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">{selectedWork.title}</h3>
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
              <div className="flex items-start justify-between mb-1.5">
                <h4 className="font-medium text-sm leading-snug line-clamp-1">
                  {writing.title}
                </h4>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {writing.created_at}
                </span>
              </div>

              {/* 상태 + 버튼 */}
              <div className="flex items-center justify-between mt-2">
                <span
                  className={cn(
                    "text-xs font-medium",
                    writing.status === "공개"
                      ? "text-green-600"
                      : writing.status === "비공개"
                      ? "text-gray-500"
                      : "text-blue-600"
                  )}
                >
                  {writing.status}
                </span>

                <div className="flex items-center gap-1.5 ml-auto">
                  <Button size="xs" variant="secondary">
                    수정
                  </Button>
                  <Button variant="outline" size="xs">
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
