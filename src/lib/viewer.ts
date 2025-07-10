const VIEWER_KEY = "viewer_id";

export function getOrCreateViewerId() {
  if (typeof window === "undefined") return "";

  let id = localStorage.getItem(VIEWER_KEY);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VIEWER_KEY, id);
  }

  return id;
}
