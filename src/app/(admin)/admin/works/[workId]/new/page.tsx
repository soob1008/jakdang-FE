import WorkNewContainer from "@/feature/admin/works/components/WorkNewContainer";

export default async function AdminWorksNewPage({
  params,
}: {
  params: Promise<{ workId: string }>;
}) {
  const param = await params;

  return <WorkNewContainer workId={param.workId} />;
}
