import { gaussianRand } from "./GuassRand";
import { scaleAcc } from "./Scales";
import { clamp } from "lodash";

export class Blobby {
  constructor(size, canvas, ctx, fillStyle) {
    this.canvas = canvas;
    this.size = size;
    this.ctx = ctx;
    this.fillStyle = fillStyle;
    this.pos = [200, 200];
    this.vel = [0, 0];
    this.acc = [0, 0];
  }

  updateRandom() {
    this.acc = [scaleAcc(gaussianRand()), scaleAcc(gaussianRand())];
    this.updatePos();
  }

  updateMouse(state) {
    this.acc = [0, 0];
    if (state.left) this.acc[0] += -0.1;
    if (state.right) this.acc[0] += 0.1;
    if (state.up) this.acc[1] += -0.1;
    if (state.down) this.acc[1] += 0.1;
    this.updatePos();
  }

  updatePos() {
    if (this.pos[0] === 0 || this.pos[0] === this.canvas.width) this.vel[0] = 0;
    if (this.pos[1] === 0 || this.pos[1] === this.canvas.height)
      this.vel[1] = 0;

    this.vel = [this.vel[0] + this.acc[0], this.vel[1] + this.acc[1]];
    this.pos = [
      clamp(this.pos[0] + this.vel[0], 0, this.canvas.width),
      clamp(this.pos[1] + this.vel[1], 0, this.canvas.height)
    ];
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.pos[0], this.pos[1], this.size, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fill();
  }
}
