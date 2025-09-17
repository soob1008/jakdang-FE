export interface Author {
  id: string;
  email: string;
  slug?: string;
  display_name?: string;
  profile_image_url?: string;
  like_count?: number;
  tagline?: string;
  bio?: string;
  profile_draft?: Profile;
  profile_published?: Profile;
}

export interface Profile {
  is_active: boolean;
  avatar_url?: string;
  headline?: string;
  display_name?: string;
  text_color?: string;
}
