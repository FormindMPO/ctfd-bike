"use strict";

/**
 * Force CTFd theme to dark mode only.
 * No user preference, no browser preference, no light mode.
 */

function forceDarkTheme() {
  document.documentElement.setAttribute("data-bs-theme", "dark");
  localStorage.setItem("theme", "dark");
}

// Apply as early as possible to avoid light-mode flash
forceDarkTheme();

// Prevent another script from switching back to light mode
const observer = new MutationObserver(() => {
  if (document.documentElement.getAttribute("data-bs-theme") !== "dark") {
    forceDarkTheme();
  }
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["data-bs-theme"],
});

window.addEventListener("load", () => {
  forceDarkTheme();

  // Remove dark/light toggle buttons if present
  document.querySelectorAll(".theme-switch").forEach(element => {
    element.remove();
  });
});