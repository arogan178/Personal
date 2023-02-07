const toggle = document.getElementById('toggle-input');
const lightIcon = document.getElementById('light-icon');
const darkIcon = document.getElementById('dark-icon');

function setTheme (theme, persist = false) {
  const on = theme;
  const off = theme === 'light' ? 'dark' : 'light';

  const htmlEl = document.documentElement;
  htmlEl.classList.add(on);
  htmlEl.classList.remove(off);

  if (persist) {
   localStorage.setItem('preferred-theme', theme);
  }
}

function updateUI (theme) {
  toggle.checked = theme === 'light';

  /* Show the right icon */
  if (theme === 'light') {
    lightIcon.classList.add('active');
    darkIcon.classList.remove('active');
  } else {
    darkIcon.classList.add('active');
    lightIcon.classList.remove('active');
  }
}

toggle.addEventListener('click', () => {
  const theme = toggle.checked ? 'light' : 'dark';
  setTheme(theme, true);
  updateUI(theme);
})

/* Set theme on load */
const osPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const preferredTheme = localStorage.getItem('preferred-theme') || osPreference;
setTheme(preferredTheme, false);
updateUI(preferredTheme);