/**
 * Referral Link Manager
 * Generates tracked referral links with UTM parameters
 */
import 'dotenv/config';
import axios from 'axios';
import { Platforms } from '../models/index.js';

const REF_CODES = {
  mercor:    process.env.MERCOR_REF_CODE || '',
  turing:    process.env.TURING_REF_CODE || '',
  toptal:    process.env.TOPTAL_REF_CODE || '',
  lemon:     process.env.LEMON_REF_CODE || '',
};

/**
 * Generate a referral URL for a platform
 */
export function buildRefUrl(platformId, applyUrl, channel = 'direct') {
  const code = REF_CODES[platformId] || '';
  const platform = Platforms.get(platformId);

  let refUrl = applyUrl;

  // If platform has a ref URL template and we have a code, use it
  if (platform?.ref_url_tpl && code) {
    refUrl = platform.ref_url_tpl.replace('{code}', code);
  } else if (code) {
    // Append ref code as query param
    const url = new URL(applyUrl);
    url.searchParams.set('ref', code);
    refUrl = url.toString();
  }

  // Add UTM parameters for tracking
  try {
    const url = new URL(refUrl);
    url.searchParams.set('utm_source', channel);
    url.searchParams.set('utm_medium', 'referral');
    url.searchParams.set('utm_campaign', 'talent_bridge');
    return url.toString();
  } catch {
    return refUrl;
  }
}

/**
 * Shorten URL via Bitly (optional)
 */
export async function shortenUrl(longUrl) {
  const token = process.env.BITLY_TOKEN;
  if (!token) return longUrl;

  try {
    const res = await axios.post('https://api-ssl.bitly.com/v4/shorten', {
      long_url: longUrl,
      domain: 'bit.ly'
    }, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    });
    return res.data.link;
  } catch (err) {
    console.warn(`Bitly shortening failed: ${err.message}`);
    return longUrl;
  }
}

/**
 * Generate all channel-specific referral links for a job
 */
export function buildAllRefUrls(platformId, applyUrl) {
  const channels = ['telegram', 'discord', 'twitter', 'linkedin', 'reddit', 'direct'];
  const urls = {};
  for (const ch of channels) {
    urls[ch] = buildRefUrl(platformId, applyUrl, ch);
  }
  return urls;
}

export default { buildRefUrl, shortenUrl, buildAllRefUrls };
