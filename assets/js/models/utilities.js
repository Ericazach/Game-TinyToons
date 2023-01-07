function isCollition( player, enemy ) {
  return (
    player.y + player.h >= enemy.y &&
    player.y <= enemy.y + enemy.h &&
    player.x <= enemy.x + enemy.w &&
    player.x + player.w >= enemy.x
  );
}
