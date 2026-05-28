const LIGHT_THEME = "light";
const DARK_THEME = "dark";
const PREFERRED_THEME_KEY = "preferred-theme";
const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";

const toggle = document.getElementById("toggle-input");

// Define color schemes.
const COLOR_SCHEMES = {
  [LIGHT_THEME]: {
    "--background-color": "var(--clr-light)",
    "--font-color": "var(--clr-dark)",
    "--toggle-color": "var(--clr-dark)",
    "--clr-border": "rgba(0, 0, 0, 0.1)",
    "--clr-card-start": "rgba(255, 255, 255, 0.4)",
    "--clr-card-end": "rgba(255, 255, 255, 0.1)",
    "--clr-header-bg": "rgba(173, 14, 14, 0.85)", /* Frosted red accent */
    "--clr-nav-bg": "rgba(250, 250, 250, 0.85)", /* Frosted overlay */
    "--bs-card": "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
    "--bs-card-hover": "0 10px 20px rgba(0, 0, 0, 0.08)",
  },
  [DARK_THEME]: {
    "--background-color": "var(--clr-dark)",
    "--font-color": "var(--clr-light)",
    "--toggle-color": "var(--clr-light)",
    "--clr-border": "rgba(255, 255, 255, 0.1)",
    "--clr-card-start": "rgba(255, 255, 255, 0.05)",
    "--clr-card-end": "rgba(255, 255, 255, 0.01)",
    "--clr-header-bg": "rgba(173, 14, 14, 0.85)", /* Frosted red accent */
    "--clr-nav-bg": "rgba(10, 10, 10, 0.85)", /* Frosted overlay */
    "--bs-card": "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
    "--bs-card-hover": "0 10px 20px rgba(0, 0, 0, 0.4)",
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
    localStorage.setItem(PREFERRED_THEME_KEY, theme);
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
  const osPreference = window.matchMedia(DARK_SCHEME_QUERY).matches
    ? DARK_THEME
    : LIGHT_THEME;
  const preferredTheme =
    localStorage.getItem(PREFERRED_THEME_KEY) || osPreference;
  setTheme(preferredTheme, false);
  updateUI(preferredTheme);
}

toggle.addEventListener("click", handleThemeToggle);

// Initialize the theme when the script loads.
initializeTheme();
