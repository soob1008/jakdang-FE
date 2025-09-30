"use client";

import { type ReactNode, useEffect, useState } from "react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/shared/ui/alert-dialog";
import { Settings } from "lucide-react";
import { Author } from "@/entities/author/model/types";
import useUpdateUser from "@/feature/auth/hooks/useUpdateUser";

type EditableFieldProps = {
  label: string;
  ariaLabel: string;
  value: string;
  placeholder: string;
  renderDisplay: (value: string) => ReactNode;
  emptyDisplay: ReactNode;
  onSave: (nextValue: string) => Promise<unknown> | void;
};

function EditableField({
  label,
  ariaLabel,
  value,
  placeholder,
  renderDisplay,
  emptyDisplay,
  onSave,
}: EditableFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setDraft(value);
    }
  }, [value, isOpen]);

  const handleOpenChange = (nextOpen: boolean) => {
    setIsOpen(nextOpen);
    if (nextOpen) {
      setDraft(value);
    } else {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    if (isSaving) return;

    if (draft === value) {
      setIsOpen(false);
      return;
    }

    setIsSaving(true);

    try {
      await onSave(draft);
    } finally {
      setIsSaving(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm text-gray-500">{label}</h4>

        <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-label={ariaLabel}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{label} 설정</AlertDialogTitle>
            </AlertDialogHeader>

            <div className="py-2">
              <Input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={placeholder}
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction
                onClick={(event) => {
                  event.preventDefault();
                  void handleSave();
                }}
                disabled={isSaving}
              >
                저장
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="mt-2">{value ? renderDisplay(value) : emptyDisplay}</div>
    </div>
  );
}

type MyInformationProps = {
  user: Author;
};

export default function MyInformation({ user: initialUser }: MyInformationProps) {
  const [user, setUser] = useState(initialUser);
  const { mutateAsync: updateUser } = useUpdateUser();

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const handleUpdateDisplayName = async (nextName: string) => {
    const updatedUser = await updateUser({ display_name: nextName });
    setUser(updatedUser);
  };

  const handleUpdateSlug = async (nextSlug: string) => {
    const updatedUser = await updateUser({ slug: nextSlug });
    setUser(updatedUser);
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-md shadow-sm">
      <h3 className="text-lg font-bold mb-4">내 정보</h3>
      <div>
        <h4 className="text-sm text-gray-500">이메일</h4>
        <p className="mt-2 font-semibold">{user.email}</p>
      </div>
      <EditableField
        label="필명"
        ariaLabel="필명 설정"
        value={user.display_name ?? ""}
        placeholder="필명을 작성해주세요."
        renderDisplay={(value) => (
          <span className="font-semibold">{value}</span>
        )}
        emptyDisplay={
          <span className="text-sm text-gray-500">
            아직 필명이 없어요. 지금 설정해보세요!
          </span>
        }
        onSave={handleUpdateDisplayName}
      />
      <EditableField
        label="주소"
        ariaLabel="주소 설정"
        value={user.slug ?? ""}
        placeholder="https://example.com"
        renderDisplay={(value) => (
          <p className="font-semibold">{`https://jakdang.site/@${value}`}</p>
        )}
        emptyDisplay={
          <span className="text-sm text-gray-500">사용자 주소가 없습니다.</span>
        }
        onSave={handleUpdateSlug}
      />
    </div>
  );
}
