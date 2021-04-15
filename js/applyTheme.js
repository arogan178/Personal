function applyTheme(theme) {
  document.body.classList.remove("auto_theme", "dark_theme", "light_theme");
  document.body.classList.add(`${theme}_theme`);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#theme").addEventListener("change", function() {
    applyTheme(this.value);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("Theme") || "auto";

  applyTheme(savedTheme);

  for (const optionElement of document.querySelectorAll("#Theme option")) {
    optionElement.selected = savedTheme === optionElement.value;
  }

  document.querySelector("#Theme").addEventListener("change", function() {
    localStorage.setItem("Theme", this.value);
    applyTheme(this.value);
  })
})