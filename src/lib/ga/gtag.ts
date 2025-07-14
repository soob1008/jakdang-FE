declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// page 이동 추적
export const pageView = (url: string) => {
  if (!GA_TRACKING_ID) return;

  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// 이벤트 추적
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (!GA_TRACKING_ID) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
