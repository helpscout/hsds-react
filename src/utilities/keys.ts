export const isModifierKeyPressed = (event): boolean => {
  return event.altKey || event.ctrlKey || event.metaKey || event.shiftKey
}
