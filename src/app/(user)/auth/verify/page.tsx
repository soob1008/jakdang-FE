import VerifyPageClient from "@/feature/auth/components/TokenVerifyClient";
import { SearchParams } from "@/shared/type/route";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const token = (await searchParams)?.token as string | undefined;
  return <VerifyPageClient token={token} />;
}
