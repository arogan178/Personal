const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

const nameElement = document.querySelector("#Name");

// Randomizes name when mouse is over name element.
nameElement.addEventListener("mouseover", () => {
  let iteration = 0;

  clearInterval(interval);

  // Randomizes name.
  interval = setInterval(() => {
    const nameValue = nameElement.dataset.value;
    const randomizedName = nameValue
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return nameValue[index];
        }

        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    // Updates name element with randomized name.
    nameElement.innerText = randomizedName;

    // Stops randomizing name when it's fully randomized.
    if (iteration >= nameValue.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 30);
});
