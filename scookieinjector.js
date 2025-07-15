
// ==UserScript==
// @name         Steam Cookie Injector (JSON Input)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Ask for JSON input, inject Steam cookies, and reload
// @match        *://steamcommunity.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Create the floating Options button
  const button = document.createElement('div');
  button.textContent = 'Options';
  Object.assign(button.style, {
    position: 'fixed',
    top: '10px',
    left: '10px',
    background: '#222',
    color: '#fff',
    padding: '8px 14px',
    fontSize: '14px',
    borderRadius: '6px',
    cursor: 'pointer',
    zIndex: '9999',
    userSelect: 'none',
  });
  document.body.appendChild(button);

  // On click, prompt for JSON input
  button.addEventListener('click', () => {
    const input = prompt('Paste Steam cookie JSON:\n\n{"sessionid":"...","steamLoginSecure":"..."}');

    if (!input) return;

    try {
      const data = JSON.parse(input);
      if (!data.sessionid || !data.steamLoginSecure) {
        alert("❌ Invalid JSON: both 'sessionid' and 'steamLoginSecure' are required.");
        return;
      }

      document.cookie = `sessionid=${data.sessionid}; domain=steamcommunity.com; path=/`;
      document.cookie = `steamLoginSecure=${data.steamLoginSecure}; domain=steamcommunity.com; path=/`;

      alert("✅ Cookies injected. Reloading Steam...");
      location.reload();

    } catch (e) {
      alert("❌ Failed to parse JSON. Please double-check the format.");
    }
  });
})();
