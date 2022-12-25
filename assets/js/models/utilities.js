function isCollition({
  object1,
  object2
}) {
  return (
    object1.y + object1.h >= object2.y &&
    object1.y <= object2.y + object2.h &&
    object1.x <= object2.x + object2.w &&
    object1.x + object1.w >= object2.x
  )
}