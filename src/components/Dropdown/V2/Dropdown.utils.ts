export const selectors = {
  actionAttribute: 'data-hsds-menu-action',
  itemAttribute: 'data-hsds-menu-item',
  menuAttribute: 'data-hsds-menu',
  wrapperAttribute: 'data-hsds-menu-wrapper',
  indexAttribute: 'data-hsds-menu-item-path',
  valueAttribute: 'data-hsds-menu-item-value',
}

export const pathResolve = (path: any = '', subPath?: any): string => {
  if (subPath !== undefined) {
    return `${path}.${subPath}`
  }

  return `${path}`
}

export const isPathActive = (path: string, index: string): boolean => {
  if (!path) return false

  const matchPath = path
    .split('.')
    .slice(0, index.split('.').length)
    .join('.')

  return matchPath === index
}

export const getParentPath = (path: string): string => {
  const paths = path.split('.')
  return paths.slice(0, paths.length - 1).join('.')
}

export const getNextChildPath = (path: string): string => {
  return `${path}.0`
}

export const getItemFromCollection = (
  items: Array<any>,
  value: string
): any => {
  for (const item of items) {
    if (item.value === value) {
      return item
    }
    if (item.items) {
      const child = getItemFromCollection(item.items, value)
      if (child) return child
    }
  }
  return undefined
}

export const incrementPathIndex = (
  path: string,
  amount: number = 1
): string => {
  const paths = path.split('.')
  const nextIndexBase = paths.pop()

  if (!nextIndexBase) return path

  const nextIndex = parseInt(nextIndexBase, 10) + amount
  return [...paths, nextIndex].join('.')
}

export const decrementPathIndex = (
  path: string,
  amount: number = 1
): string => {
  const paths = path.split('.')
  const nextIndexBase = paths.pop()

  if (!nextIndexBase) return path

  const nextIndex = parseInt(nextIndexBase, 10) - amount
  return [...paths, nextIndex].join('.')
}

export const setMenuPositionStyles = (props: {
  dropRight: boolean
  dropUp: boolean
  menuNode: HTMLElement | null
  itemNode: HTMLElement
  wrapperNode: HTMLElement | null
  triggerNode: HTMLElement
}) => {
  const defaultProps = {
    dropRight: true,
    dropUp: false,
  }

  const { dropRight, dropUp, menuNode, itemNode, wrapperNode, triggerNode } = {
    ...defaultProps,
    ...props,
  }

  if (!menuNode || !itemNode || !wrapperNode || !triggerNode) return

  let translateY

  // Reset menuNode scroll position
  menuNode.scrollTop = 0

  const menuOffset = 9
  const { top } = itemNode.getBoundingClientRect()
  const { height } = wrapperNode.getBoundingClientRect()
  const triggerNodeMenu = triggerNode.closest(`[${selectors.menuAttribute}]`)

  translateY =
    triggerNode.offsetHeight +
    (triggerNodeMenu ? triggerNodeMenu.scrollTop : 0) +
    menuOffset

  const predictedOffsetBottom = translateY + height + top
  const predictedFlippedOffsetTop = top - translateY - height

  const shouldDropUp =
    window.innerHeight < predictedOffsetBottom && predictedFlippedOffsetTop > 0

  if (!dropRight) {
    wrapperNode.style.right = '100%'
    wrapperNode.style.paddingLeft = '0px'
    wrapperNode.style.paddingRight = '20px'
  } else {
    wrapperNode.style.left = '100%'
    wrapperNode.style.paddingLeft = '20px'
    wrapperNode.style.paddingRight = '0px'
  }

  if (dropUp || shouldDropUp) {
    translateY = wrapperNode.clientHeight - menuOffset
  }

  wrapperNode.style.transform = `translateY(-${translateY}px)`
}
