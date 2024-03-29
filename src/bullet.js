export default class Bullet {
  constructor(x, y, vy, w, h, color) {
    this.x = x;
  	this.y = y;
  	this.vy = vy;
  	this.w = w;
  	this.h = h;
  	this.color = color;
    this.destroyed = false;
  }

  update(time) {
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
  	ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  get left() { return this.x }
  get right() { return this.x + this.w }
  get top() { return this.y }
  get bottom() { return this.y + this.h }
}
