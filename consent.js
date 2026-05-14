/* -------------------------------------------------------------
   SLEEK — cookie consent + analytics loader
   Shows a cookie banner on first visit. Loads GA4 only if
   the visitor accepts. Respects choice via localStorage.

   TO WIRE ANALYTICS BEFORE LAUNCH:
     Replace the GA_MEASUREMENT_ID constant below with your
     real GA4 measurement ID (looks like "G-XXXXXXXXXX").
     If you'd rather use a privacy-friendly analytics tool
     (e.g. Plausible, Fathom), swap loadAnalytics() with its
     loader — cookie banner can be removed entirely in that
     case since those tools don't set cookies.
   ------------------------------------------------------------- */
(function () {
  'use strict';

  // === CONFIG ================================================
  var GA_MEASUREMENT_ID = ''; // e.g. 'G-ABC123DEF4' — leave empty to disable
  var STORAGE_KEY = 'sleek:consent';
  // ===========================================================

  function readConsent() {
    try { return localStorage.getItem(STORAGE_KEY); }
    catch (e) { return null; }
  }
  function writeConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
  }

  function loadAnalytics() {
    if (!GA_MEASUREMENT_ID) return;
    if (window.__sleekAnalyticsLoaded) return;
    window.__sleekAnalyticsLoaded = true;

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  }

  function showBanner() {
    var banner = document.getElementById('cookie-banner');
    if (!banner) return;
    // show after a short delay so it eases in after the page settles
    setTimeout(function () { banner.classList.add('is-visible'); }, 450);

    banner.querySelector('.btn-accept').addEventListener('click', function () {
      writeConsent('accepted');
      banner.classList.remove('is-visible');
      loadAnalytics();
    });
    banner.querySelector('.btn-decline').addEventListener('click', function () {
      writeConsent('declined');
      banner.classList.remove('is-visible');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var consent = readConsent();
    if (consent === 'accepted') {
      loadAnalytics();
    } else if (consent !== 'declined') {
      showBanner();
    }
  });
})();
