declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// page 이동 추적
export const pageView = (url: string) => {
  if (!GA_TRACKING_ID) return;

  window.gtag("event", "page_view", {
    page_path: url,
    page_location: window.location.href,
    page_referrer: document.referrer,
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

export const trackEvent = (
  action: string,
  params: Record<string, string> = {}
) => {
  if (!GA_TRACKING_ID) return;
  window.gtag("event", action, params);
};

export const setUserProperties = (properties: Record<string, string>) => {
  if (!GA_TRACKING_ID) return;
  window.gtag("set", "user_properties", properties);
};
