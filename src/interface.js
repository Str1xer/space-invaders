export function drawCannonLifes(ctx, canvas, sprite, lifes) {
    ctx.font = "18px MinecraftRusNEW";
    ctx.fillStyle = "#8EFA00";
    ctx.fillText(lifes, 0, canvas.clientHeight - 36);

    for (let i = 0; i < lifes; i++)
        ctx.drawImage(
            sprite.img,
            sprite.x, sprite.y, sprite.w, sprite.h,
            30 + (sprite.w + 10) * i, canvas.clientHeight - 50, sprite.w, sprite.h
        );
}

export function drawGameLoss (ctx, canvas,) {
    ctx.font = "32px MinecraftRusNEW";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ПОТРАЧЕНО", canvas.clientWidth/2, canvas.clientHeight/2);
}

export function drawGameWinning (ctx, canvas,) {
    ctx.font = "32px MinecraftRusNEW";
    ctx.fillStyle = "#8EFA00";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ПОБЕДА", canvas.clientWidth/2, canvas.clientHeight/2);
}