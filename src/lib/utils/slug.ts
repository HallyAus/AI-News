/** Generate a URL-friendly slug from a title. */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/['']/g, "") // remove apostrophes
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, "") // trim leading/trailing hyphens
    .slice(0, 120); // max length
}

/** Generate a unique slug by appending a short suffix if needed. */
export function generateUniqueSlug(title: string, id: string): string {
  const base = generateSlug(title);
  const suffix = id.slice(0, 8); // first 8 chars of UUID for uniqueness
  return `${base}-${suffix}`;
}
