export default class Bunker {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this._sprite = sprite;
    this._canvas = document.getElementById("cnvs");
    this.destroyed = false;
    this.type = "bunker";
    this.hits = 3;
  }

  draw(ctx, time) {
    ctx.drawImage(
      this._sprite.img,
      this._sprite.x, this._sprite.y, this._sprite.w, this._sprite.h,
      this.x - this._sprite.w / 2, this.y - this._sprite.h / 2, this._sprite.w, this._sprite.h
    );
  }

  get left() { return this.x - this._sprite.w / 2 }
  get right() { return this.x + this._sprite.w / 2 }
  get top() { return this.y - this._sprite.h / 2 }
  get bottom() { return this.y + this._sprite.h / 2 }
}
