import { useState, useRef, useEffect, useCallback } from 'react'

export const useCopyConfirmation = props => {
  const { onClick, onReset, resetTimeout = 2000 } = props

  const [shouldRenderConfirmation, setConfirmation] = useState(false)
  const confirmationTimeout = useRef()
  const isCancelled = useRef(false)

  const handleClick = useCallback(
    e => {
      if (confirmationTimeout.current) {
        clearTimeout(confirmationTimeout)
      }

      setConfirmation(true)
      onClick && onClick(e)

      confirmationTimeout.current = setTimeout(() => {
        if (!isCancelled.current) {
          setConfirmation(false)
          onReset && onReset()
        }
      }, resetTimeout)
    },
    [onClick, onReset, resetTimeout]
  )

  useEffect(() => {
    if (confirmationTimeout.current) {
      clearTimeout(confirmationTimeout)
    }
    return () => {
      isCancelled.current = true
      if (confirmationTimeout.current) {
        clearTimeout(confirmationTimeout)
      }
    }
  }, [])

  return [shouldRenderConfirmation, handleClick]
}
