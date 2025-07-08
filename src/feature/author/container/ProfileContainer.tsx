import React from "react";
import Profile from "@/feature/author/Profile";
import { getAuthor } from "@/feature/user/api.server";

interface ProfileContainerProps {
  slug: string;
}
export default async function ProfileContainer({
  slug,
}: ProfileContainerProps) {
  const { user } = await getAuthor(slug);

  return <Profile user={user} />;
}
