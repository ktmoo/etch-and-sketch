
const grid = document.querySelector("#grid");
const gridItem = document.querySelector(".gridItem");
const colorPicker = document.querySelector("#colorPicker");
const colorBtn = document.querySelector(".colorBtn");
const rainbowBtn = document.querySelector(".rainbowBtn");
const clearBtn = document.querySelector(".clearBtn");
const eraserBtn = document.querySelector(".eraserBtn");
const sizeSlider = document.querySelector("#sizeSlider");
const sizeValue = document.querySelector("#sizeValue");
const rainbowColors = [
  "#FF0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#4B0082",
  "#9400D3",
];

let colorMode = true;
let rainbowMode = false;
let eraserMode = false;
let gridSize = 16;
let gridArea = gridSize * gridSize;
let gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
let gridColor = "#333333";
let rainbowIndex = 0;
let rainbowInterval;
let rainbowIntervalTime = 100;
let rainbowIntervalSpeed = 1;



const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;


let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
  currentColor = newColor;

};

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
};

function setCurrentSize(newSize) {
  currentSize = newSize;
};

function changeSize(value) {
  setCurrentSize(value)
  updateSizeValue(value)
  reloadGrid()
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`
}


function reloadGrid() {
  clearGrid()
  createGrid(currentSize)
}

function createGrid(size) {
  grid.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    let gridItem = document.createElement("div");
    gridItem.classList.add("gridItem");
    gridItem.addEventListener("mouseover", changeColor);
    grid.appendChild(gridItem);
  }
}


function clearGrid() {
  grid.innerHTML = ""
}


function activateButton(newMode) {
  if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }
  if (newMode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
};


let mouseDown = false // Variable to keep track of whether the mouse is down
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


// Create a grid of divs with the specified number of rows and columns


function clearGrid() {
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
}

function changeColor(e) {
  if (colorMode) {
    color = colorPicker.value;
  } else if (rainbowMode) {
    color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  } else if (eraserMode) {
    color = "#ffffff";
  }
  e.target.style.backgroundColor = color;
}

function changeSize() {
  gridSize = sizeSlider.value;
  sizeValue.textContent = `${gridSize} x ${gridSize}`;
  clearGrid();
  createGrid(gridSize);
}


function changeMode() {
  if (colorMode) {
    colorMode = false;
    rainbowMode = true;
    eraserMode = false;
    colorBtn.textContent = "Color Mode";
    rainbowBtn.textContent = "Rainbow Mode (On)";
    eraserBtn.textContent = "Eraser";
  } else if (rainbowMode) {
    colorMode = false;
    rainbowMode = false;
    eraserMode = true;
    colorBtn.textContent = "Color Mode";
    rainbowBtn.textContent = "Rainbow Mode";
    eraserBtn.textContent = "Eraser (On)";
  } else if (eraserMode) {
    colorMode = true;
    rainbowMode = false;
    eraserMode = false;
    colorBtn.textContent = "Color Mode (On)";
    rainbowBtn.textContent = "Rainbow Mode";
    eraserBtn.textContent = "Eraser";
  }
}



function clearCanvas() {
  const gridItems = document.querySelectorAll(".gridItem");
  gridItems.forEach((gridItem) => {
    gridItem.style.backgroundColor = "#ffffff";

  });
}

createGrid(gridSize);

colorPicker.addEventListener("input", changeColor)
colorBtn.addEventListener("click", changeMode);
rainbowBtn.addEventListener("click", changeMode);
eraserBtn.addEventListener("click", changeMode);
clearBtn.addEventListener("click", clearCanvas);
sizeSlider.addEventListener("input", changeSize);
sizeSlider.addEventListener("change", changeSize);
grid.addEventListener("mouseover", changeColor);
grid.addEventListener("mousedown", changeColor);


window.onload = () => {
  createGrid(DEFAULT_SIZE)
  activateButton(DEFAULT_MODE)
}







