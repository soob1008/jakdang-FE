import RepresentativeWork from "@/feature/author/RepresentativeWork";

import { getAuthor } from "@/feature/user/api.server";

interface RepresentativeWorkContainerProps {
  slug: string;
}
export default async function RepresentativeWorkContainer({
  slug,
}: RepresentativeWorkContainerProps) {
  const { user } = await getAuthor(slug);

  return <RepresentativeWork user={user} />;
}
