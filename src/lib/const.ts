export const IMAGE_BUCKET_NAME = "jakdang-images";
export const BASIC_IMAGE_URL = `basic_image/jpg`;
export const BASIC_PROFILE_IMAGE = `/basic/profile1.png`;

export const SOCIAL_PLATFORMS_OPTIONS = [
  { label: "인스타그램", value: "instagram" },
  { label: "트위터", value: "twitter" },
  { label: "X (구 트위터)", value: "x" },
  { label: "페이스북", value: "facebook" },
  { label: "쓰레드", value: "threads" },
  { label: "유튜브", value: "youtube" },
  { label: "링크드인", value: "linkedin" },
  { label: "브런치", value: "brunch" },
  { label: "미디엄", value: "medium" },
  { label: "블로그", value: "blog" },
];

export const SOCIAL_PLATFORM_KEYS = SOCIAL_PLATFORMS_OPTIONS.map(
  (item) => item.value
);
