export interface AuthorProfile extends Author {
  user_tags: AuthorTag[];
  sns: AuthorSNS[];
  user_links: AuthorLink[];
  user_works: AuthorWork[];
}

export interface Author {
  id: string;
  email: string;
  slug?: string;
  display_name?: string;
  profile_image_url?: string;
  like_count: number;
  tagline?: string;
  bio?: string;
}

export interface AuthorTag {
  id: string;
  tag: string;
}

export interface AuthorSNS {
  id: string;
  platform: SocialPlatform;
  url: string;
  is_active: boolean;
}

export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "threads"
  | "youtube"
  | "x"
  | "brunch"
  | "medium"
  | "linkedin"
  | "blog";

export interface AuthorLink {
  id: string;
  title: string;
  url: string;
  is_active: boolean;
}

export interface AuthorWork {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  url?: string;
  is_representative: boolean;
  is_active: boolean;
}
