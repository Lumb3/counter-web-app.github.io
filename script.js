const decreaseButton = document.getElementById("decrease");
const resetButton = document.getElementById("reset");
const increaseButton = document.getElementById("increase");
const countLabel = document.getElementById("countlabel");
const emoji = document.getElementById("emoji");
const stepInput = document.getElementById("stepper");
const randomColorButton = document.getElementById("randomColor");
const darkModeButton = document.getElementById("darkMode");
const maxVal = document.getElementById("maxVal");
const minVal = document.getElementById("minVal");
const historyList = document.getElementById("historyList");

// Sound elements
const soundInc = document.getElementById("sound-increase");
const soundDec = document.getElementById("sound-decrease");
const soundReset = document.getElementById("sound-reset");

let counter = Number(localStorage.getItem("count")) || 0;
let max = counter;
let min = counter;

function updateDisplay() {
  countLabel.textContent = counter;
  localStorage.setItem("count", counter);

  // Emoji reactions
  if (counter > 10) emoji.textContent = "🔥";
  else if (counter < 0) emoji.textContent = "🥶";
  else emoji.textContent = "🙂";

  // Color based on value
  if (counter > 0) countLabel.style.color = "green";
  else if (counter < 0) countLabel.style.color = "red";
  else countLabel.style.color = "black";

  // Update max/min
  if (counter > max) max = counter;
  if (counter < min) min = counter;
  maxVal.textContent = max;
  minVal.textContent = min;

  // Add to history
  const li = document.createElement("li");
  li.textContent = `Count: ${counter}`;
  historyList.prepend(li);
}

decreaseButton.onclick = () => {
  counter -= Number(stepInput.value);
  updateDisplay();
  soundDec.play();
};

increaseButton.onclick = () => {
  counter += Number(stepInput.value);
  updateDisplay();
  soundInc.play();
};

resetButton.onclick = () => {
  counter = 0;
  updateDisplay();
  soundReset.play();
};

// Random color button
randomColorButton.onclick = () => {
  const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = color;
};

// Dark mode toggle
darkModeButton.onclick = () => {
  document.body.classList.toggle("dark-mode");
};

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") increaseButton.click();
  if (e.key === "ArrowDown") decreaseButton.click();
  if (e.key.toLowerCase() === "r") resetButton.click();
});

// Initialize UI
updateDisplay();
