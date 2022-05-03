import React from 'react'

const TRANSITION_DURATION = 200

/**
 * Handles the logic for resizing survey buttons
 * after a short timeout when an option is selected.
 */
function useButtonResizeOnSelection({
  defaultSize = 'lg',
  selectedSize = 'md',
  onSelection = () => {},
}) {
  const [buttonSize, setButtonSize] = React.useState(defaultSize)
  let timeoutId = null

  React.useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  function handleOnClick(id) {
    onSelection(id)

    timeoutId = setTimeout(() => {
      setButtonSize(selectedSize)
    }, TRANSITION_DURATION)
  }

  return {
    buttonSize,
    handleOnClick,
  }
}

export { useButtonResizeOnSelection }
