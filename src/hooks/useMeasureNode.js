// very difficult to test with JSDom
/* istanbul ignore file */
import { useState, useCallback, useRef } from 'react'

export default function useMeasureNode({ observeSize = false }) {
  const [measures, setMeasures] = useState(null)
  const [el, setEl] = useState(null)
  const observerRef = useRef(null)

  const ref = useCallback(node => {
    if (node != null) {
      if (observeSize) {
        const resizeObserver = setupObserver({
          cb: setMeasures,
          dimensions: { height: true },
        })

        resizeObserver.observe(node)
        observerRef.current = resizeObserver
      } else {
        const { height, width } = node.getBoundingClientRect()
        setMeasures({ height, width })
      }

      setEl(node)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [measures, el, ref, observerRef]
}

export function setupObserver({
  cb = () => {},
  dimensions,
  observerEntryType = 'borderBoxSize',
}) {
  return new ResizeObserver(entries => {
    for (let entry of entries) {
      if (entry[observerEntryType]) {
        const size = Array.isArray(entry[observerEntryType])
          ? entry[observerEntryType][0]
          : entry[observerEntryType]
        const { blockSize: height, inlineSize: width } = size

        if (!dimensions || (dimensions.height && dimensions.width)) {
          cb({ height, width })
        } else if (dimensions.height) {
          cb({ height })
        } else if (dimensions.width) {
          cb({ width })
        }
      }
    }
  })
}
