/**
 * Utility to optimize Cloudinary image delivery.
 * Automatically injects `f_auto,q_auto` to ensure modern lightweight formats (AVIF/WebP)
 * and optimal visual compression, reducing bandwidth consumption significantly.
 *
 * @param {string} url - Original image URL or path
 * @param {Object} [options] - Optional transformations
 * @param {number|string} [options.width] - Optional width constraint (e.g. 800 or '800')
 * @param {string} [options.quality='auto'] - Cloudinary quality setting (defaults to 'auto')
 * @param {string} [options.format='auto'] - Cloudinary format setting (defaults to 'auto')
 * @returns {string} Optimized URL if Cloudinary, otherwise original URL
 */
export function optimizeCloudinaryUrl(url, options = {}) {
  if (!url || typeof url !== 'string') return url;

  const uploadMarker = '/image/upload/';
  if (!url.includes('res.cloudinary.com') || !url.includes(uploadMarker)) {
    return url;
  }

  // Check existing flags
  const hasFormatAuto = url.includes('f_auto');
  const hasQualityAuto = url.includes('q_auto');

  if (hasFormatAuto && hasQualityAuto && !options.width) {
    return url;
  }

  const parts = [];
  if (!hasFormatAuto) {
    parts.push(`f_${options.format || 'auto'}`);
  }
  if (!hasQualityAuto) {
    parts.push(`q_${options.quality || 'auto'}`);
  }
  if (options.width && !url.includes(`w_${options.width}`)) {
    parts.push(`w_${options.width}`);
  }

  if (parts.length === 0) return url;

  const transformationStr = parts.join(',');
  return url.replace(uploadMarker, `${uploadMarker}${transformationStr}/`);
}

export default optimizeCloudinaryUrl;
