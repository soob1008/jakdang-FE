export const STATUS_CONFIG = {
  pending: { label: "대기", badgeVariant: "warning" },
  completed: { label: "완료", badgeVariant: "success" },
  cancelled: { label: "환불", badgeVariant: "light" },
  failed: { label: "실패", badgeVariant: "danger" },
} as const;

export const SETTLEMENT_STATUS_OPTIONS = Object.entries(STATUS_CONFIG).map(
  ([key, value]) => ({
    value: key,
    label: value.label,
  })
);
