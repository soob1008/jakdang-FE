"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { ResponsiveDialog } from "@/components/ui/ResponsiveDialog";

export function EditProfileDialog() {
  const [penName, setPenName] = useState("");
  const [bio, setBio] = useState("");

  const handleSave = () => {
    console.log("필명:", penName);
    console.log("소개글:", bio);
    // 저장 로직 실행
  };

  return (
    <ResponsiveDialog
      trigger={
        <Button variant="muted" size="sm">
          <Pencil className="w-4 h-4 mr-1" />
          Edit
        </Button>
      }
      title="프로필 수정"
      description="필명과 소개글을 자유롭게 작성해주세요."
      onSubmit={handleSave}
    >
      <div className="space-y-4">
        <Input
          placeholder="필명 입력"
          value={penName}
          onChange={(e) => setPenName(e.target.value)}
        />
        <Input
          placeholder="간단한 소개글"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
    </ResponsiveDialog>
  );
}
