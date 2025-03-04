import { nanoid } from "nanoid";

// Create a Map to store the URL mappings
const urlDatabase = new Map<string, string>();
const MAX_RETRIES = 5;

// Function to generate a short ID and store the mapping
export function generateShortUrl(originalUrl: string): string {
  let id: string;
  let retries = 0;

  do {
    id = nanoid(8);
    retries++;

    if (retries > MAX_RETRIES) {
      throw new Error('Failed to generate a unique ID after maximum retries');
    }
  } while (urlDatabase.has(id));

  urlDatabase.set(id, originalUrl);
  return id;
}

export function getOriginalUrl(id: string): string | undefined {
  return urlDatabase.get(id);
}