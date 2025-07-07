export interface Author {
  id: string;
  email: string;
  slug?: string;
  display_name?: string;
  profile_image_url?: string;
  likes_count: number;
  intro_text?: string;
}

export interface AuthorTag {
  id: string;
  tag: string;
}
