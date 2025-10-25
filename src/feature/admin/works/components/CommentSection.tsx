"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import type { Comment } from "@/entities/work/model/type";
import useComments from "../hooks/useComments";
import useCreateComment from "../hooks/useCreateComment";
import useUpdateComment from "../hooks/useUpdateComment";
import useDeleteComment from "../hooks/useDeleteComment";
import useUser from "@/feature/auth/hooks/useUser";

type CommentSectionProps = {
  writingId: string;
};

export default function CommentSection({ writingId }: CommentSectionProps) {
  const [newContent, setNewContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: user } = useUser();
  const { data: comments = [] } = useComments({ writingId });
  const { mutateAsync: createComment } = useCreateComment();
  const { mutateAsync: updateComment } = useUpdateComment();
  const { mutateAsync: deleteComment } = useDeleteComment();

  const handleCreate = async () => {
    if (!newContent.trim()) return;
    setIsSubmitting(true);
    try {
      await createComment({ content: newContent.trim(), writingId });
      setNewContent("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h3 className="text-base font-semibold text-gray-900">댓글</h3>
        <p className="text-sm text-gray-500">
          독자들의 반응을 살펴보고 필요한 피드백을 나눠보세요.
        </p>
      </header>

      {user ? (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm space-y-3">
          <textarea
            value={newContent}
            onChange={(event) => setNewContent(event.target.value)}
            placeholder="댓글 내용을 입력하세요"
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-400 focus:outline-none"
          />
          <div className="flex justify-end">
            <Button
              size="sm"
              onClick={handleCreate}
              disabled={!newContent.trim() || isSubmitting}
            >
              {isSubmitting ? "등록 중..." : "댓글 등록"}
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500 border border-dashed border-gray-200 bg-gray-50/60 rounded-lg p-4 text-center">
          댓글을 작성하려면 로그인해주세요.
        </p>
      )}

      <CommentThread
        comments={comments}
        depth={0}
        currentUserId={user?.id ?? null}
        onReply={async ({ content, parentId }) => {
          await createComment({ content, writingId, parentId });
        }}
        onUpdate={async (commentId, content) => {
          await updateComment({ commentId, content, writingId });
        }}
        onDelete={async (commentId) => {
          await deleteComment({ commentId, writingId });
        }}
      />
    </section>
  );
}

type CommentThreadProps = {
  comments: Comment[];
  depth: number;
  currentUserId: string | null;
  onReply?: (params: { content: string; parentId: string }) => Promise<void>;
  onUpdate?: (commentId: string, content: string) => Promise<void> | void;
  onDelete?: (commentId: string) => Promise<void> | void;
};

function CommentThread({
  comments,
  depth,
  currentUserId,
  onReply,
  onUpdate,
  onDelete,
}: CommentThreadProps) {
  if (!comments.length) {
    if (depth === 0) {
      return (
        <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/60 p-6 text-center text-sm text-gray-500">
          아직 등록된 댓글이 없습니다.
        </div>
      );
    }
    return null;
  }

  return (
    <ul className={cn("space-y-3", depth > 0 && "pl-5 border-gray-200")}>
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItemCard
            comment={comment}
            depth={depth}
            currentUserId={currentUserId}
            onReply={onReply}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}

type CommentItemCardProps = {
  comment: Comment;
  depth: number;
  currentUserId: string | null;
  onReply?: CommentThreadProps["onReply"];
  onUpdate?: CommentThreadProps["onUpdate"];
  onDelete?: CommentThreadProps["onDelete"];
};

function CommentItemCard({
  comment,
  depth,
  currentUserId,
  onReply,
  onUpdate,
  onDelete,
}: CommentItemCardProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const canReply = depth === 0 && Boolean(onReply) && currentUserId;
  const canEdit = Boolean(
    currentUserId &&
      comment.user_id &&
      currentUserId === comment.user_id &&
      onUpdate
  );
  const canRemove = Boolean(
    currentUserId &&
      comment.user_id &&
      currentUserId === comment.user_id &&
      onDelete
  );
  const createdLabel = useMemo(
    () => formatDateLabel(comment.created_at),
    [comment.created_at]
  );

  const submitReply = async () => {
    if (!onReply || !replyContent.trim()) return;
    await onReply({ content: replyContent.trim(), parentId: comment.id });
    setReplyContent("");
    setIsReplying(false);
  };

  const submitUpdate = async () => {
    if (!onUpdate) return;
    const trimmed = editContent.trim();
    if (!trimmed) {
      setEditContent(comment.content);
      setIsEditing(false);
      return;
    }
    try {
      await onUpdate(comment.id, trimmed);
      setIsEditing(false);
    } catch {
      // keep editing state so the user can retry
    }
  };

  return (
    <article
      className={cn(
        "rounded-lg border bg-white",
        depth === 0 ? "border-gray-200" : "border-gray-200/70 bg-gray-50",
        "p-4 space-y-3"
      )}
    >
      <header className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-xs font-semibold text-gray-900 py-0.5",
              comment.is_author ? "bg-primary text-white px-2 rounded" : ""
            )}
          >
            {comment.user_name || "-"}
          </span>
        </div>
        {createdLabel && (
          <span className="text-xs text-gray-500">{createdLabel}</span>
        )}
        <div className="ml-auto flex items-center gap-1.5">
          {canReply && (
            <Button
              size="xs"
              variant="outline"
              className="text-xs text-gray-500 hover:text-gray-900"
              onClick={() => setIsReplying((prev) => !prev)}
            >
              {isReplying ? "답글 취소" : "답글"}
            </Button>
          )}
          {canEdit && (
            <Button
              size="xs"
              variant="outline"
              className="text-xs text-gray-500 hover:text-gray-900"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? "수정 취소" : "수정"}
            </Button>
          )}
          {canRemove && (
            <Button
              size="xs"
              variant="outline"
              className="text-xs text-red-500 hover:text-red-600"
              onClick={async () => {
                if (!onDelete) return;
                try {
                  await onDelete(comment.id);
                } catch {
                  /* ignore */
                }
              }}
            >
              삭제
            </Button>
          )}
        </div>
      </header>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editContent}
            onChange={(event) => setEditContent(event.target.value)}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="xs"
              className="text-xs"
              onClick={() => {
                setIsEditing(false);
                setEditContent(comment.content);
              }}
            >
              취소
            </Button>
            <Button
              size="xs"
              className="text-xs"
              onClick={submitUpdate}
              disabled={!editContent.trim()}
            >
              수정 완료
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-800 whitespace-pre-line">
          {comment.content}
        </p>
      )}

      {isReplying && canReply && (
        <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50/80 p-3">
          <textarea
            value={replyContent}
            onChange={(event) => setReplyContent(event.target.value)}
            rows={2}
            placeholder="답글 내용을 입력하세요"
            className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-gray-400 focus:outline-none"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="xs"
              className="text-xs"
              onClick={() => {
                setIsReplying(false);
                setReplyContent("");
              }}
            >
              취소
            </Button>
            <Button
              size="xs"
              className="text-xs"
              onClick={submitReply}
              disabled={!replyContent.trim()}
            >
              답글 등록
            </Button>
          </div>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <CommentThread
          comments={comment.replies}
          depth={depth + 1}
          currentUserId={currentUserId}
          onReply={undefined}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}
    </article>
  );
}

function formatDateLabel(value?: string | Date | null) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return format(date, "yyyy.MM.dd HH:mm");
}
