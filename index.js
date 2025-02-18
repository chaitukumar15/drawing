const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let isErasing = false;
let penSize = 5;
let penColor = "#000000";
let bgColor = "#ffffff";

canvas.width = window.innerWidth * 0.8;
canvas.height = 400;
canvas.style.backgroundColor = bgColor;

const penButton = document.getElementById("pen");
const eraserButton = document.getElementById("eraser");
const clearButton = document.getElementById("clear");
const penSizeInput = document.getElementById("pen-size");
const penColorInput = document.getElementById("pen-color");
const bgColorInput = document.getElementById("bg-color");

// Functions for drawing and erasing
function startDrawing(e) {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function draw(e) {
  if (!isDrawing) return;
  if (isErasing) {
    ctx.clearRect(e.clientX - canvas.offsetLeft - penSize / 2, e.clientY - canvas.offsetTop - penSize / 2, penSize, penSize);
  } else {
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }
}

function stopDrawing() {
  isDrawing = false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.backgroundColor = bgColor;
}

// Event listeners
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

penButton.addEventListener("click", () => {
  isErasing = false;
  penButton.classList.add("active");
  eraserButton.classList.remove("active");
});

eraserButton.addEventListener("click", () => {
  isErasing = true;
  eraserButton.classList.add("active");
  penButton.classList.remove("active");
});

clearButton.addEventListener("click", clearCanvas);

penSizeInput.addEventListener("input", (e) => {
  penSize = e.target.value;
});

penColorInput.addEventListener("input", (e) => {
  penColor = e.target.value;
});

bgColorInput.addEventListener("input", (e) => {
  bgColor = e.target.value;
  canvas.style.backgroundColor = bgColor;
});
