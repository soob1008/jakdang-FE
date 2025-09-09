interface EmptyTextProps {
  message?: string;
}

export default function EmptyText({ message }: EmptyTextProps) {
  return (
    <div className="mt-8 flex items-center justify-center h-full">
      <p className="text-gray-500 text-sm">
        {message || "아직 등록된 내용이 없습니다."}
      </p>
    </div>
  );
}
