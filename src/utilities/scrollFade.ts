const offsetX = 28
const offsetY = 32

export const getFadeTopStyles = (event, offset = offsetX) => {
  const scrollNode = event.currentTarget
  const { scrollTop } = scrollNode
  let transform

  if (scrollTop > 0) {
    const size = scrollTop < offset ? scrollTop : offset
    const amount = offset ? size / offset : 1
    transform = `scaleY(${amount})`
  } else {
    transform = `scaleY(0)`
  }

  return transform
}

export const getFadeBottomStyles = (event, offset = offsetX) => {
  const scrollNode = event.currentTarget
  const { clientHeight, scrollHeight, scrollTop } = scrollNode
  const scrollBottom = scrollHeight - (scrollTop + clientHeight)
  let transform

  if (scrollBottom > 0) {
    const size = scrollBottom < offset ? scrollBottom : offset
    const amount = offset ? size / offset : 1
    transform = `scaleY(${amount})`
  } else {
    transform = `scaleY(0)`
  }

  return transform
}

export const getFadeLeftStyles = (event, offset = offsetY) => {
  const scrollNode = event.currentTarget
  const { scrollLeft } = scrollNode
  let transform

  if (scrollLeft > 0) {
    const size = scrollLeft < offset ? scrollLeft : offset
    const amount = offset ? size / offset : 1
    transform = `scaleX(${amount})`
  } else {
    transform = `scaleX(0)`
  }

  return transform
}

export const getFadeRightStyles = (event, offset = offsetY) => {
  const scrollNode = event.currentTarget
  const { clientWidth, scrollWidth, scrollLeft } = scrollNode
  const scrollRight = scrollWidth - (scrollLeft + clientWidth)
  let transform

  if (scrollRight > 0) {
    const size = scrollRight < offset ? scrollRight : offset
    const amount = offset ? size / offset : 1
    transform = `scaleX(${amount})`
  } else {
    transform = `scaleX(0)`
  }

  return transform
}
