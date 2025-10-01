export function decodeAuthorSlug(raw: string): string {
  const decoded = decodeURIComponent(raw);
  return decoded.startsWith("@") ? decoded.slice(1) : decoded;
}

