const LIGHT_THEME = "light";
const DARK_THEME = "dark";

const toggle = document.getElementById("toggle-input");

// Define color schemes.
const COLOR_SCHEMES = {
  [LIGHT_THEME]: {
    "--background-color": "var(--clr-light)",
    "--font-color": "var(--clr-dark)",
    "--toggle-color": "var(--clr-dark)",
  },
  [DARK_THEME]: {
    "--background-color": "var(--clr-dark)",
    "--font-color": "var(--clr-light)",
    "--toggle-color": "var(--clr-light)",
  },
};

// Sets the theme by updating CSS variables.
function setTheme(theme, persist = false) {
  const colorScheme = COLOR_SCHEMES[theme];
  const rootStyle = document.documentElement.style;

  for (let property in colorScheme) {
    rootStyle.setProperty(property, colorScheme[property]);
  }

  if (persist) {
    localStorage.setItem("preferred-theme", theme);
  }
}

// Updates the UI toggle based on the current theme.
function updateUI(theme) {
  toggle.checked = theme === DARK_THEME;
}

// Handles the theme toggle event.
function handleThemeToggle() {
  const newTheme = toggle.checked ? DARK_THEME : LIGHT_THEME;
  setTheme(newTheme, true);
}

// Initializes the theme based on user preference or saved theme.
function initializeTheme() {
  const osPreference = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK_THEME
    : LIGHT_THEME;
  const preferredTheme =
    localStorage.getItem("preferred-theme") || osPreference;
  setTheme(preferredTheme, false);
  updateUI(preferredTheme);
}

toggle.addEventListener("click", handleThemeToggle);

// Initialize the theme when the script loads.
initializeTheme();
