import { useState, useRef, useEffect, useCallback } from 'react'

export const useCopyConfirmation = props => {
  const { onClick, onReset, resetTimeout = 2000 } = props

  const [shouldRenderConfirmation, setConfirmation] = useState(false)
  const confirmationTimeout = useRef()

  useEffect(() => {
    if (confirmationTimeout.current) {
      clearTimeout(confirmationTimeout)
    }
    return () => {
      if (confirmationTimeout.current) {
        clearTimeout(confirmationTimeout)
      }
    }
  }, [])

  const handleClick = useCallback(
    e => {
      if (confirmationTimeout.current) {
        clearTimeout(confirmationTimeout)
      }

      setConfirmation(true)
      onClick && onClick(e)

      confirmationTimeout.current = setTimeout(() => {
        setConfirmation(false)
        onReset && onReset()
      }, resetTimeout)
    },
    [onClick, onReset, resetTimeout]
  )

  return [shouldRenderConfirmation, handleClick]
}
