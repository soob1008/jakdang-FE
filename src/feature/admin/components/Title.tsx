interface TitleProps {
  title: string;
  description?: string;
  rightContent?: React.ReactNode;
}
export default function Title({
  title,
  description,
  rightContent,
}: TitleProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div className="space-y-1">
        <h2 className="font-semibold text-lg text-gray-900">{title}</h2>
        {description && (
          <p className="text-gray-500 text-sm break-keep">{description}</p>
        )}
      </div>
      {rightContent}
    </div>
  );
}
