import { useState, useCallback } from 'react'

export default function useClientRect() {
  const [rect, setRect] = useState(null)
  const [el, setEl] = useState(null)

  const ref = useCallback(node => {
    if (node !== null) {
      setEl(node)
      setRect(node.getBoundingClientRect())
    }
  }, [])

  return [rect, el, ref]
}
