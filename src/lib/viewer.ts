const VIEWER_KEY = "viewer_id";

export function getOrCreateViewerId() {
  let id = localStorage.getItem(VIEWER_KEY);

  if (!id) {
    id = crypto?.randomUUID?.();
    localStorage.setItem(VIEWER_KEY, id);
  }

  return id;
}
