export function allowGlobalHotkeys(target) {
  if (target.dataset.blocksGlobalHotkeys) {
    return false
  }

  if (target.closest('[data-blocks-global-hotkeys="true"]')) {
    return false
  }

  return true
}

export function shouldClearDimensions(name) {
  if (name === 'Confirmation') return true

  return false
}
