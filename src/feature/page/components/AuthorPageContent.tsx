import { Author } from "@/entities/author/model/types";
import { Page } from "@/entities/page/model/types";
import { buildPageBackgroundStyle } from "@/entities/page/model/background";
import AuthorHeader from "@/feature/author/AuthorHeader";
import { GuestCallToAction } from "@/feature/page/components/GuestCallToAction";
import { AuthorPageBlocks } from "@/feature/page/components/AuthorPageBlocks";

type AuthorPageContentProps = {
  author: Author;
  page: Page;
  sessionUser: Author | null;
};

export function AuthorPageContent({
  author,
  page,
  sessionUser,
}: AuthorPageContentProps) {
  const backgroundStyle = buildPageBackgroundStyle(page.style_published);

  return (
    <div className="relative min-h-screen px-4 pb-30">
      <div className="fixed inset-0" style={backgroundStyle} />
      {!sessionUser && <GuestCallToAction />}
      <div className="relative mx-auto w-full max-w-3xl pt-8">
        <AuthorHeader user={author} />
        <AuthorPageBlocks author={author} page={page} />
      </div>
    </div>
  );
}
