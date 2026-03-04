// Email is split to prevent bot scraping from static HTML
const parts = ["hello", "joshuafrancis", "ca"];

export function getMailtoHref(subject?: string) {
  const email = `${parts[0]}@${parts[1]}.${parts[2]}`;
  const base = `mailto:${email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
