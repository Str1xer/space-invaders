export function isBulletIntersects(bullet, other) {
    let d1x = bullet.left - other.right
    let d2x = other.left - bullet.right

    if (d1x > 0 || d2x > 0) return false
    if ((bullet.top - other.bottom > 0 | other.top - bullet.bottom > -bullet.vy) && bullet.vy < 0) return false
    if ((other.top - bullet.bottom > 0 || bullet.top - other.bottom > bullet.vy) && bullet.vy > 0) return false

    return bullet.vy < 0 ? bullet.top - other.bottom : other.top - bullet.bottom
}

export function isBlocked(self, other) {
    let d1x = self.left - other.right
    let d2x = other.left - self.right

    if (d1x > 0 || d2x > 0 || self.top - other.bottom > 0) return false

    return true
}