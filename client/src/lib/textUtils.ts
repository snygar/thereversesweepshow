/**
 * Utility functions for text formatting and cleaning
 */

/**
 * Clean and format episode descriptions from Spotify API
 * Removes HTML tags, fixes encoding issues, and improves readability
 */
export function formatEpisodeDescription(description: string): string {
  if (!description) return '';
  
  let formatted = description;
  
  // Remove HTML tags
  formatted = formatted.replace(/<[^>]*>/g, '');
  
  // Decode common HTML entities
  const htmlEntities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&mdash;': '—',
    '&ndash;': '–',
    '&hellip;': '…',
    '&lsquo;': '\u2018',
    '&rsquo;': '\u2019',
    '&ldquo;': '\u201C',
    '&rdquo;': '\u201D',
  };
  
  // Replace HTML entities
  Object.entries(htmlEntities).forEach(([entity, replacement]) => {
    formatted = formatted.replace(new RegExp(entity, 'g'), replacement);
  });
  
  // Fix line breaks and spacing
  formatted = formatted
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n') // Limit consecutive line breaks to 2
    .replace(/[ \t]+/g, ' ') // Normalize whitespace
    .trim();
  
  return formatted;
}

/**
 * Truncate text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Create a readable excerpt from description for cards
 */
export function createExcerpt(description: string, maxLength: number = 150): string {
  const cleaned = formatEpisodeDescription(description);
  return truncateText(cleaned, maxLength);
}