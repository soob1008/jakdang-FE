// app/auth/verify/page.tsx (Server Component)
import VerifyPageClient from "@/feature/auth/components/TokenVerifyClient";

export default function VerifyPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  return <VerifyPageClient token={searchParams.token} />;
}
