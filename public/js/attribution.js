/* Applicant source attribution.
 * Records first-touch and latest-touch (UTMs, click IDs, referrer, landing page)
 * so form submissions can be split into Google Ads / Meta / LinkedIn / organic / direct.
 * Storage failures (private mode, blocked site data) fall back to the current page only.
 */
(function () {
  var KEY_FIRST = 'psi_attr_first';
  var KEY_LAST = 'psi_attr_last';
  var PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'li_fat_id'];

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) { return null; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  function currentTouch() {
    var qs = new URLSearchParams(window.location.search);
    var touch = {};
    PARAMS.forEach(function (p) { var v = qs.get(p); if (v) touch[p] = v; });
    var ref = document.referrer || '';
    var refHost = '';
    try { refHost = ref ? new URL(ref).hostname : ''; } catch (e) {}
    if (refHost && refHost.indexOf(window.location.hostname.replace(/^www\./, '')) === -1) touch.referrer = ref;
    touch.landing_page = window.location.pathname;
    touch.ts = new Date().toISOString();
    return touch;
  }

  function isMarked(t) {
    if (!t) return false;
    return PARAMS.some(function (p) { return t[p]; }) || !!t.referrer;
  }

  function classify(t) {
    if (!t) return 'Direct';
    var src = (t.utm_source || '').toLowerCase();
    var med = (t.utm_medium || '').toLowerCase();
    var ref = (t.referrer || '').toLowerCase();
    if (t.gclid || t.gbraid || t.wbraid || (src === 'google' && /cpc|ppc|paid/.test(med))) return 'Google Ads';
    if (t.fbclid || /facebook|meta|instagram|^fb$|^ig$/.test(src)) return /cpc|paid|ads?/.test(med) ? 'Meta Ads' : 'Meta';
    if (t.li_fat_id || src.indexOf('linkedin') > -1 || ref.indexOf('linkedin.') > -1 || ref.indexOf('lnkd.in') > -1) return 'LinkedIn';
    if (/email|newsletter/.test(med) || /reply|instantly|smartlead/.test(src)) return 'Email';
    if (/sms|text/.test(med)) return 'SMS';
    if (src) return src;
    if (/google\.|bing\.|duckduckgo\.|yahoo\./.test(ref)) return 'Organic Search';
    if (/facebook\.|instagram\.|t\.co|twitter\.|x\.com/.test(ref)) return 'Social';
    if (ref) { try { return 'Referral: ' + new URL(ref).hostname.replace(/^www\./, ''); } catch (e) { return 'Referral'; } }
    return 'Direct';
  }

  var now = currentTouch();
  var first = read(KEY_FIRST);
  if (!first) { first = now; write(KEY_FIRST, first); }
  // Only replace the latest touch when this visit carries campaign info, so internal
  // navigation (home -> job-description) doesn't wipe the ad click.
  var last = read(KEY_LAST);
  if (isMarked(now) || !last) { last = now; write(KEY_LAST, last); }

  window.psiAttribution = function () {
    var basis = isMarked(last) ? last : first;
    var out = { Source: classify(basis), 'First Source': classify(first) };
    PARAMS.forEach(function (p) { if (basis[p]) out[p] = basis[p]; });
    if (basis.referrer) out.referrer = basis.referrer;
    out.landing_page = basis.landing_page || '';
    out.submit_page = window.location.pathname;
    return out;
  };
})();
