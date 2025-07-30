import BlockContainer from "@/feature/admin/block/BlockContainer";
import { fetchServer } from "@/lib/api/api.server";
import { Page } from "@/feature/admin/types";

export default async function AdminBlockPage() {
  const data: { page: Page } = await fetchServer(`/api/pages`, {
    method: "GET",
    next: { tags: ["admin-block-page"] },
  });

  console.log("AdminBlockPage result:", data?.page);
  return <BlockContainer page={data?.page} />;
}
