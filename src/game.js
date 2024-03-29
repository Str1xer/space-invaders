import Sprite from './sprite'
import Cannon from './cannon'
import Bullet from './bullet'
import Alien from './alien'
import InputHandler from './input-handler'

import assetPath from '../assets/invaders.png'
import { isBlocked, isBulletIntersects } from './collision/collision'
import { clamp } from './utils/clamp'
import { drawCannonLifes, drawGameLoss, drawGameWinning } from './interface'

let assets;
const sprites = {
  aliens: [],
  cannon: null,
  bunker: null
};
const gameState = {
  bullets: [],
  aliens: [],
  cannon: null,
  cannonLifes: 3,
  roundState: "playing"
};
const inputHandler = new InputHandler();
let direction = 1;
let kills = 0;
let timeMultiplier = 0;

export function preload(onPreloadComplete) {
  assets = new Image();
  assets.addEventListener("load", () => {
    sprites.cannon = new Sprite(assets, 62, 0, 22, 16);
    sprites.bunker = new Sprite(assets, 84, 8, 36, 24);
    sprites.aliens = [
      [new Sprite(assets, 0, 0, 22, 16), new Sprite(assets, 0, 16, 22, 16)],
      [new Sprite(assets, 22, 0, 16, 16), new Sprite(assets, 22, 16, 16, 16)],
      [new Sprite(assets, 38, 0, 24, 16), new Sprite(assets, 38, 16, 24, 16)]
    ]

    onPreloadComplete();
  });
  assets.src = assetPath;
}

export function init(canvas) {
  const alienTypes = [1, 0, 2, 1, 0];
  for (var i = 0, len = alienTypes.length; i < len; i++) {
    for (var j = 0; j < 10; j++) {
      const alienType = alienTypes[i];

      let alienX = 30 + j * 30;
      let alienY = 30 + i * 30;

      if (alienType === 1) {
        alienX += 3; // (kostyl) aliens of this type is a bit thinner
      }

      gameState.aliens.push(
        new Alien(alienX, alienY, sprites.aliens[alienType])
      );
    }
  }

  gameState.cannon = new Cannon(
    100, canvas.height - 100,
    sprites.cannon
  );
}

export function update(time, stopGame, canvas) {

  if (gameState.roundState !== "playing") return;

  if (inputHandler.isDown('ArrowLeft')) {
    gameState.cannon.x -= 4
  }

  if (inputHandler.isDown('ArrowRight')) {
    gameState.cannon.x += 4
  }

  if (inputHandler.isPressed('Space') && gameState.cannon.reloading === 0) {
    const bulletX = gameState.cannon.left + 10;
    const bulletY = gameState.cannon.top - 15;
    gameState.bullets.push(new Bullet(bulletX, bulletY, -8, 2, 6, "#fff"));
    gameState.cannon.reloading = gameState.cannon.reloadingTime;
  }

  gameState.bullets.forEach(b => {

    let possibleHit = [];

    if (isBulletIntersects(b, gameState.cannon)) {
      possibleHit.push({ distance: isBulletIntersects(b, gameState.cannon), other: gameState.cannon })
    }

    gameState.aliens.forEach(alien => {
      let overlapInfo = isBulletIntersects(b, alien);
      if (overlapInfo) {
        possibleHit.push({ distance: overlapInfo, other: alien });
      }
    })

    if (possibleHit.length) {
      possibleHit = possibleHit.sort(function (first, second) {
        return first.distance - second.distance;
      });

      if (possibleHit[0].other.type == "alien") {
        kills += 1;
        if (kills == 10) {
          kills = 0;
          timeMultiplier = 5000;
        }
      }

      if (possibleHit[0].other.type == "cannon") {
        kills = 0;
        gameState.cannonLifes -= 1;
        if (!gameState.cannonLifes)
          gameState.roundState = "loss";
      }

      possibleHit[0].other.destroyed = true;
      b.destroyed = true;
    } else {
      if (b.bottom < 0)
        b.destroyed = true;
      else
        b.update(time)
    }

  });

  gameState.bullets = gameState.bullets.filter(b => !b.destroyed);
  gameState.aliens = gameState.aliens.filter(a => !a.destroyed);

  if (!gameState.aliens.length) gameState.roundState = "winning";

  let newYLevel = false;
  gameState.aliens.forEach(alien => {
    newYLevel = newYLevel || (alien.right > canvas.clientWidth || alien.left < 0)
    let blocked = false;

    gameState.aliens.forEach(other => {
      if (alien != other)
        blocked = blocked || isBlocked(alien, other)
    })

    alien.shootingIsAvailable = !blocked;
  })

  if (newYLevel) {
    direction *= -1;
    gameState.aliens.forEach(alien => { alien.y += 25; alien.x += direction * 1 })
  }
  else
    gameState.aliens.forEach(alien => {
      alien.x += direction * 0.5;
      alien.timeToReload -= 15 * (timeMultiplier < 0 ? 1 : 4);
      if (alien.shootingIsAvailable && alien.timeToReload <= 0) {
        alien.timeToShoot -= 15 * (timeMultiplier < 0 ? 1 : 4);

        if (alien.timeToShoot < 0) {
          const bulletX = alien.left + 10;
          const bulletY = alien.bottom + 6;
          gameState.bullets.push(new Bullet(bulletX, bulletY, timeMultiplier < 0 ? 2 : 4, 2, 6, timeMultiplier < 0 ? "#fff" : "#FF0000"));
          alien.timeToReload = 5000;
          alien.timeToShoot = Math.random() * 10000
        }
      }
    })

  timeMultiplier -= 15;
  gameState.cannon.reloading = clamp(gameState.cannon.reloading - 15, 0, gameState.cannon.reloadingTime)
}

export function draw(canvas, time) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameState.roundState == "loss") {
    drawGameLoss(ctx, canvas);
    return;
  }

  if (gameState.roundState == "winning") {
    drawGameWinning(ctx, canvas);
    return;
  }

  drawCannonLifes(ctx, canvas, sprites.cannon, gameState.cannonLifes);

  gameState.aliens.forEach(a => a.draw(ctx, time));
  gameState.cannon.draw(ctx);
  gameState.bullets.forEach(b => b.draw(ctx));


}
