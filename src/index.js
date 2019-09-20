import "./styles.css";
import { Blobby } from "./Blobby";

export const version = document.getElementById("version");
version.innerHTML = "1.1";
export const canvas = document.getElementById("app");
export const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const blobby = new Blobby(10, canvas, ctx, "black");
let state = {
  left: false,
  right: false,
  up: false,
  down: false
};

function update(progress) {
  blobby.updateMouse(state);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  blobby.draw();
}

function loop(timestamp) {
  var progress = timestamp - lastRender;

  update(progress);
  draw();

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}
let lastRender = 0;
window.requestAnimationFrame(loop);

function keydown(event) {
  if (event.code === "ArrowLeft") state.left = true;
  if (event.code === "ArrowRight") state.right = true;
  if (event.code === "ArrowUp") state.up = true;
  if (event.code === "ArrowDown") state.down = true;
}
function keyup(event) {
  if (event.code === "ArrowLeft") state.left = false;
  if (event.code === "ArrowRight") state.right = false;
  if (event.code === "ArrowUp") state.up = false;
  if (event.code === "ArrowDown") state.down = false;
}

function mouseClick(event)
{
  var x = event.x;
  var y = event.y;
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  blobby.mouseClick([x, y]);
}

function touchStart(event) {
  event.preventDefault();
  var x = event.changedTouches[0].clientX;
  var y = event.changedTouches[0].clientY;
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;
  blobby.mouseClick([x, y]);
}

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);
canvas.addEventListener("mousedown", mouseClick, false);
canvas.addEventListener("touchstart", touchStart, false);
