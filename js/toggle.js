const LIGHT_THEME = "light";
const DARK_THEME = "dark";

const toggle = document.getElementById("toggle-input");

// Toggles theme. 
function setTheme(theme, persist = false) {
  const on = theme;
  const off = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;

  const htmlEl = document.documentElement;
  htmlEl.classList.add(on);
  htmlEl.classList.remove(off);

  if (persist) {
    localStorage.setItem("preferred-theme", theme);
  }
}

// Updates UI based on theme.
function updateUI(theme) {
  toggle.checked = theme === LIGHT_THEME;
}

toggle.addEventListener("click", () => {
  const theme = toggle.checked ? LIGHT_THEME : DARK_THEME;
  setTheme(theme, true);
  updateUI(theme);
});

// Sets theme based on OS preference or previously selected theme.
const osPreference = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? DARK_THEME
  : LIGHT_THEME;
const preferredTheme = localStorage.getItem("preferred-theme") || osPreference;
setTheme(preferredTheme, false);
updateUI(preferredTheme);