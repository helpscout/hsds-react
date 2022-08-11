import { useEffect, useState } from 'react'

const DEFAULT_TRANSITION_TIMEOUT = 200

/**
 * Survey buttons resize from a larger to a smaller size after they have
 * been selected, but they do so after a short delay to allow for animations
 * to complete. This hooks provides the logic to resize the buttons on selection
 * after a given delay.
 */
function useButtonResizeOnSelection({
  // The size buttons have by default
  defaultSize = 'lg',
  // The size buttons have when selected
  selectedSize = 'md',
  // Callback function for when a button is selected
  onSelection = () => {},
  // The delay (in ms) for the resize transition
  transitionTimeout = DEFAULT_TRANSITION_TIMEOUT,
  // Disabling the transition prevents the buttons from resizing
  disableTransition = false,
}) {
  const [buttonSize, setButtonSize] = useState(defaultSize)
  let timeoutId = null

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  function handleOnClick(id) {
    onSelection(id)

    if (disableTransition) return

    timeoutId = setTimeout(() => {
      setButtonSize(selectedSize)
    }, transitionTimeout)
  }

  return {
    buttonSize,
    handleOnClick,
  }
}

export { useButtonResizeOnSelection }
