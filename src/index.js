import "./styles.css";
import { Blobby } from "./Blobby";

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

function update() {
  blobby.updateMouse(state);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  blobby.draw();
}

function loop() {
  update();
  draw();
  window.requestAnimationFrame(loop);
}

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

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);
