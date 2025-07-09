interface BioProps {
  bio?: string;
}

export default function Bio({ bio }: BioProps) {
  if (!bio) {
    return null;
  }
  return (
    <section>
      <h2 className="mb-3 text-lg font-bold">작가 소개</h2>
      <p className="text-gray-600 whitespace-pre-line">{bio}</p>
    </section>
  );
}
