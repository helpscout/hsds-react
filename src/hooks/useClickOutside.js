import { useEffect } from 'react'

/**
 * Custom hook that adds a click event listener on the document that gets
 * executed when clicking outside a given DOM Node passed as a ref.
 *
 * @param {Object} ref The Ref to the DOM node to detect clicking outside of
 * @param {*} callback The callback to execute on clicking
 */
const useClickOutside = (ref, callback) => {
  const handleClick = e => {
    if (ref && ref.current && !ref.current.contains(e.target)) {
      callback(e)
    }
  }

  useEffect(() => {
    if (ref) {
      document.addEventListener('click', handleClick)
    }

    return () => {
      if (ref) {
        document.removeEventListener('click', handleClick)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useClickOutside
