export interface Author {
  id: string;
  email: string;
  slug?: string;
  display_name?: string;
  profile_image?: string;
  likes_count: number;
  intro_text?: string;
}
