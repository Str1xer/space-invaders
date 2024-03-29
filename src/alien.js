export default class Alien {
  constructor(x, y, [spriteA, spriteB]) {
    this.x = x;
    this.y = y;
    this._spriteA = spriteA;
    this._spriteB = spriteB;
    this.destroyed = false;
    this.shootingIsAvailable = false;
    this.timeToReload = 5000;
    this.timeToShoot = Math.random() * 10000;
    this.type = "alien"
  }

  draw(ctx, time) {
    this.sp = (Math.ceil(time / 1000) % 2 === 0) ? this._spriteA : this._spriteB;

    ctx.drawImage(
      this.sp.img,
      this.sp.x, this.sp.y, this.sp.w, this.sp.h,
      this.x, this.y, this.sp.w, this.sp.h
    )
      // console.log(time)
    // this.timeToReload -= time;
  }

  get left() { return this.x }
  get right() { return this.x + this.sp.w }
  get top() { return this.y }
  get bottom() { return this.y + this.sp.h }
}
