export const STATUS_CONFIG = {
  pending: { label: "정산 대기", badgeVariant: "warning" },
  completed: { label: "정산 완료", badgeVariant: "success" },
  cancelled: { label: "정산 취소", badgeVariant: "secondary" },
} as const;

export const SETTLEMENT_STATUS_OPTIONS = Object.entries(STATUS_CONFIG).map(
  ([key, value]) => ({
    value: key,
    label: value.label,
  })
);
