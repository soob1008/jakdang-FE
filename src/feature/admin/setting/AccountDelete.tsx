"use client";

import { Button } from "@/components/ui/button";

export default function AccountDelete() {
  return (
    <div className="space-y-6 p-4 m-auto lg:w-[900px] bg-white rounded-md shadow-sm">
      <h3 className="text-lg font-bold mb-4">계정 삭제</h3>
      <p className="text-sm text-gray-600">
        계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수
        없습니다.
      </p>
      <Button
        variant="destructive-outline"
        className="w-full mt-4"
        onClick={() => {
          // 여기에 계정 삭제 로직을 추가하세요
          alert("계정이 삭제되었습니다.");
        }}
      >
        계정 삭제
      </Button>
    </div>
  );
}
