export default class Cannon {
  constructor(x, y, sprite, canvas) {
    this.x = x;
    this.y = y;
    this._sprite = sprite;
    this._canvas = document.getElementById("cnvs");
    this.destroyed = false;
    this.type = "cannon";
    this.reloading = 0.0;
    this.reloadingTime = 1000;
  }

  draw(ctx, time) {
    if (this.x < 0) this.x = this._canvas.clientWidth;
    if (this.x > this._canvas.clientWidth) this.x = 0;

    ctx.drawImage(
      this._sprite.img,
      this._sprite.x, this._sprite.y, this._sprite.w, this._sprite.h,
      this.x - this._sprite.w / 2, this.y - this._sprite.h / 2, this._sprite.w, this._sprite.h
    );

    ctx.fillRect(this.x - this._sprite.w / 2 - 6, this.y + this._sprite.h / 2 + 10, (12 + this._sprite.w) * (1 - this.reloading / this.reloadingTime), 3);
  }

  get left() { return this.x - this._sprite.w / 2 }
  get right() { return this.x + this._sprite.w / 2 }
  get top() { return this.y - this._sprite.h / 2 }
  get bottom() { return this.y + this._sprite.h / 2 }
}
