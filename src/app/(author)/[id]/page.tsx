import { Metadata } from "next";
import { AuthorPageContent } from "@/feature/page/components/AuthorPageContent";
import { buildAuthorPageMetadata } from "@/feature/page/server/buildMetadata";
import { getAuthorPageData } from "@/feature/page/server/getAuthorPageData";

interface AuthorPageProps {
  params: Promise<{ id: string }>;
}

type MetadataProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { id } = await params;
  const { author, page } = await getAuthorPageData(id);

  return buildAuthorPageMetadata({ author, page });
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params;
  const { author, page } = await getAuthorPageData(id);

  return <AuthorPageContent author={author} page={page} />;
}
