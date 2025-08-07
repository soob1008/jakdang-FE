export default function Title({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-myungjo font-medium">{title}</h2>
      {description && (
        <p className="text-gray-600 text-sm mt-2">{description}</p>
      )}
    </div>
  );
}
