import { UTM_KEYS } from "./lead";

/** localStorage key that keeps the popup away for a while after it was closed or an enquiry was sent. */
export const POPUP_KEY = "jec_popup_until";

/** Campaign tags (utm_*, gclid, fbclid) are remembered for the visit, so a lead
 *  still shows which ad brought the visitor even after they browse other pages. */
export function readAttribution(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    Object.assign(out, JSON.parse(sessionStorage.getItem("jec_utm") ?? "{}") as Record<string, string>);
  } catch {}
  const q = new URLSearchParams(window.location.search);
  for (const k of UTM_KEYS) {
    const v = q.get(k);
    if (v) out[k] = v.slice(0, 100);
  }
  return out;
}

/** Stop the automatic popup for `ms` milliseconds (used after an enquiry is sent). */
export function snoozePopup(ms: number) {
  try {
    localStorage.setItem(POPUP_KEY, String(Date.now() + ms));
  } catch {}
}
