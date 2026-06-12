export function slugifyTag(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, "-");
}
