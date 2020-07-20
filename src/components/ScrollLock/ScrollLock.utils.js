export function scrollLockX(event, stopPropagation) {
  const { deltaX } = event
  const scrollNode = event.currentTarget
  const { clientWidth, scrollWidth, scrollLeft } = scrollNode

  if (stopPropagation) {
    event.stopPropagation()
  }

  if (deltaX > 0 && deltaX > scrollWidth - clientWidth - scrollLeft) {
    scrollNode.scrollLeft = scrollWidth
    event.preventDefault()
  } else if (deltaX <= 0 && -deltaX > scrollLeft) {
    scrollNode.scrollLeft = 0
    event.preventDefault()
  }
}

export function scrollLockY(event, stopPropagation) {
  const scrollNode = event.currentTarget
  const { clientHeight, scrollHeight, scrollTop } = scrollNode
  const { deltaY } = event

  if (stopPropagation) {
    event.stopPropagation()
  }

  if (deltaY > 0 && deltaY > scrollHeight - clientHeight - scrollTop) {
    scrollNode.scrollTop = scrollHeight
    event.preventDefault()
  } else if (deltaY <= 0 && -deltaY > scrollTop) {
    scrollNode.scrollTop = 0
    event.preventDefault()
  }
}

export function handleWheelEvent(event, direction, stopPropagation) {
  if (direction === 'x') {
    return scrollLockX(event, stopPropagation)
  } else {
    return scrollLockY(event, stopPropagation)
  }
}
