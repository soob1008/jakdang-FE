import BlockContainer from "@/feature/admin/block/BlockContainer";
import { Author } from "@/entities/author/model/types";
import { fetchAPI } from "@/shared/lib/api/api.server";

export default async function AdminBlockPage() {
  // const user = await fetchAPI<Author>("/users/me");
  return <BlockContainer />;
}
