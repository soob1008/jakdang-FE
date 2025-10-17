import WorkEditContainer from "@/feature/admin/works/components/WorkEditContainer";

export default async function AdminWorksEditPage({
  params,
}: {
  params: Promise<{ workId: string; writingId: string }>;
}) {
  const { workId, writingId } = await params;

  return <WorkEditContainer workId={workId} writingId={writingId} />;
}
