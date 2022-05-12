export function allowGlobalHotkeys(target) {
  if (target.dataset.blocksGlobalHotkeys) {
    return false
  }

  if (target.closest('[data-blocks-global-hotkeys="true"]')) {
    return false
  }

  return true
}
