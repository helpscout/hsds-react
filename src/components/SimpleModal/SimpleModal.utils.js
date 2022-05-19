export function allowGlobalHotkeys(target) {
  if (target.dataset.blocksGlobalHotkeys) {
    return false
  }

  if (target.closest('[data-blocks-global-hotkeys="true"]')) {
    return false
  }

  return true
}

export function shouldUnsetDimensions(unsetDimensions, layoutName) {
  if (layoutName === 'Confirmation') return true
  if (unsetDimensions) return true

  return false
}
