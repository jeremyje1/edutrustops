// Utility to ingest a public sitemap and extract up to N unique URLs.
// Based on implementation notes in project playbook.
export async function getSitemapUrls(baseUrl: string, cap = 2000): Promise<string[]> {
  try {
  // Cast to any to allow Next.js specific fetch option `next.revalidate` without TS complaint
  const resp = await fetch(new URL('/sitemap.xml', baseUrl).toString(), { next: { revalidate: 3600 } } as any);
    if (!resp.ok) return [];
    const xml = await resp.text();
    const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1].trim());
    return [...new Set(urls)].slice(0, cap);
  } catch {
    return [];
  }
}
