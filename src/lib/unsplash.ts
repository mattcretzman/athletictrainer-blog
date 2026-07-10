interface UnsplashImage {
  url: string;
  alt: string;
  credit: string;
  downloadUrl: string;
  photoId: string;
}

const UNSPLASH_API = "https://api.unsplash.com";

// Curated search queries mapped to PSI blog categories
// These produce consistently professional, on-brand results
const CATEGORY_QUERIES: Record<string, string> = {
  "H2F Program": "military fitness training facility",
  "SMIP Program": "sports medicine military healthcare",
  "Career Guides": "athletic trainer professional healthcare",
  "Locations": "military base united states",
  "Salary & Benefits": "professional career growth success",
  "Military Life": "military service members training",
};

export async function fetchUnsplashImage(
  primaryKeyword: string,
  category: string,
  tags: string[],
  usedPhotoIds: Set<string> = new Set()
): Promise<UnsplashImage | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    console.warn("⚠️  UNSPLASH_ACCESS_KEY not set, skipping image fetch");
    return null;
  }

  // Strategy: Try category-mapped query first (most reliable for brand fit),
  // then fall back to primaryKeyword, then first two tags
  const queries = [
    CATEGORY_QUERIES[category],
    primaryKeyword,
    tags.slice(0, 2).join(" "),
  ].filter(Boolean);

  for (const query of queries) {
    try {
      const res = await fetch(
        `${UNSPLASH_API}/search/photos?query=${encodeURIComponent(
          query
        )}&orientation=landscape&per_page=30&content_filter=high`,
        {
          headers: { Authorization: `Client-ID ${accessKey}` },
        }
      );

      if (!res.ok) {
        console.log(`Unsplash query failed for "${query}": ${res.status}`);
        continue;
      }

      const data = await res.json();
      if (data.results && data.results.length > 0) {
        // Filter out already-used photos
        const available = data.results.filter(
          (p: any) => !usedPhotoIds.has(p.id)
        );

        if (available.length === 0) {
          console.log(`⚠️  All results for "${query}" already used, trying next query`);
          continue;
        }

        const photo = available[0];
        console.log(`✅ Found Unsplash image for "${query}" (photo ${photo.id}, ${available.length} available)`);

        return {
          url: `${photo.urls.regular}&w=1200&h=675&fit=crop`,
          alt: photo.alt_description || photo.description || `${category} - ${primaryKeyword}`,
          credit: `Photo by ${photo.user.name} on Unsplash`,
          downloadUrl: photo.links.download_location,
          photoId: photo.id,
        };
      }
    } catch (err) {
      console.error(`Unsplash query error for "${query}":`, err);
    }
  }

  console.log(`⚠️  No Unsplash images found for any query`);
  return null;
}

// Trigger download endpoint per Unsplash API guidelines
export async function trackUnsplashDownload(downloadUrl: string): Promise<void> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  
  if (!accessKey || !downloadUrl) return;

  try {
    await fetch(`${downloadUrl}?client_id=${accessKey}`);
    console.log("✅ Tracked Unsplash download");
  } catch (err) {
    // Non-blocking — tracking is best-effort
    console.log("⚠️  Unsplash download tracking failed (non-blocking)");
  }
}
