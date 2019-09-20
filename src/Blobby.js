import { gaussianRand } from "./GuassRand";
import { scaleAcc } from "./Scales";

const accAmt = 0.1;

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
    if (state.left) this.acc[0] += -accAmt;
    if (state.right) this.acc[0] += accAmt;
    if (state.up) this.acc[1] += -accAmt;
    if (state.down) this.acc[1] += accAmt;
    this.updatePos();
  }

  mouseClick(pos) {
    this.acc[0] = (pos[0] - this.pos[0]) * accAmt * 0.1;
    this.acc[1] = (pos[1] - this.pos[1]) * accAmt * 0.1;
    this.updatePos();
  }

  updatePos() {
    this.vel = [this.vel[0] + this.acc[0], this.vel[1] + this.acc[1]];
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    this.bounce(0, 0, (p, c) => p < c);
    this.bounce(0, this.canvas.width, (p, c) => p > c);
    this.bounce(1, 0, (p, c) => p < c);
    this.bounce(1, this.canvas.height, (p, c) => p > c);
  }

  bounce(i, cutoff, compare) {
    if (compare(this.pos[i], cutoff)) {
      this.pos[i] = cutoff * 2 - this.pos[i];
      this.vel[i] = -this.vel[i];
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.pos[0], this.pos[1], this.size, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fill();
  }
}
