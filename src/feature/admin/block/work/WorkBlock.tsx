import React from "react";
import WorkList from "@/feature/admin/components/WorkList";

export default function WorkBlock() {
  return (
    <div className="space-y-4">
      {/* 이곳에 등록된 작품 리스트가 렌더링됩니다 */}
      <WorkList
        userId="111"
        works={[
          {
            id: "1",
            title: "예시 작품 1",
            description: "작품 설명",
            is_representative: true,
            is_active: true,
          },
          {
            id: "2",
            title: "예시 작품 2",
            description: "작품 설명",
            is_representative: false,
            is_active: true,
          },
        ]}
      />
    </div>
  );
}
