import { getOptimalViewportPosition } from '../Drop.utils'

test('Returns false for invalid arguments', () => {
  expect(getOptimalViewportPosition()).toBeFalsy()
  expect(getOptimalViewportPosition(true)).toBeFalsy()
  expect(getOptimalViewportPosition({})).toBeFalsy()
})

test('Returns false for invalid triggerNode + contentNode', () => {
  const triggerNode = document.createElement('div')
  const contentNode = document.createElement('div')

  expect(
    getOptimalViewportPosition({
      triggerNode: true,
      contentNode: true,
    })
  ).toBeFalsy()

  expect(
    getOptimalViewportPosition({
      triggerNode,
      contentNode: true,
    })
  ).toBeFalsy()

  expect(
    getOptimalViewportPosition({
      triggerNode: true,
      contentNode,
    })
  ).toBeFalsy()
})

test('Returns coordinates object for valid elements', () => {
  const triggerNode = document.createElement('div')
  const contentNode = document.createElement('div')
  document.body.appendChild(triggerNode)
  document.body.appendChild(contentNode)

  triggerNode.getBoundingClientRect = () => ({
    width: 100,
    height: 80,
    top: 80,
    left: 8,
    right: 0,
    bottom: 0,
  })
  contentNode.getBoundingClientRect = () => ({
    width: 200,
    height: 400,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  })
  const offset = 8
  const o = getOptimalViewportPosition({ triggerNode, contentNode, offset })

  expect(typeof o).toBe('object')
  expect(o.top).not.toBe('undefined')
  expect(o.left).not.toBe('undefined')
  expect(o.offsetTop).not.toBe('undefined')
  expect(o.offsetLeft).not.toBe('undefined')
  expect(o.direction).not.toBe('undefined')
  expect(o.direction.x).not.toBe('undefined')
  expect(o.direction.y).not.toBe('undefined')
})

test('Returns calculated top/left props for valid elements', () => {
  const triggerNode = document.createElement('div')
  const contentNode = document.createElement('div')
  document.body.appendChild(triggerNode)
  document.body.appendChild(contentNode)

  const triggerNodeClientRect = {
    width: 100,
    height: 80,
    top: 80,
    left: 8,
    right: 400,
    bottom: 0,
  }
  const contentNodeClientRect = {
    width: 200,
    height: 400,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }

  triggerNode.getBoundingClientRect = () => triggerNodeClientRect
  contentNode.getBoundingClientRect = () => contentNodeClientRect
  const offset = 8
  const o = getOptimalViewportPosition({ triggerNode, contentNode, offset })

  expect(o.top).toBe(
    triggerNodeClientRect.top + triggerNodeClientRect.height + offset
  )
  expect(o.left).toBe(triggerNodeClientRect.left)
})

test('Returns offset of zero if no offset is defined', () => {
  const triggerNode = document.createElement('div')
  const contentNode = document.createElement('div')
  document.body.appendChild(triggerNode)
  document.body.appendChild(contentNode)

  const triggerNodeClientRect = {
    width: 100,
    height: 80,
    top: 0,
    left: 0,
    right: 400,
    bottom: 0,
  }
  const contentNodeClientRect = {
    width: 200,
    height: 400,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }

  const boundingOffset = 8
  triggerNode.getBoundingClientRect = () => triggerNodeClientRect
  contentNode.getBoundingClientRect = () => contentNodeClientRect
  const o = getOptimalViewportPosition({ triggerNode, contentNode })

  expect(o.offset).toBe(0 + boundingOffset)
})

describe('Positioning', () => {
  // Note: JSDOM's window dimensions are 1024x768
  test('Adjusts from up -> down, if applicable', () => {
    const triggerNode = document.createElement('div')
    const contentNode = document.createElement('div')
    document.body.appendChild(triggerNode)
    document.body.appendChild(contentNode)

    const triggerNodeClientRect = {
      width: 100,
      height: 80,
      top: 0,
      left: 8,
      right: 400,
      bottom: 0,
    }
    const contentNodeClientRect = {
      width: 200,
      height: 400,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
    triggerNode.getBoundingClientRect = () => triggerNodeClientRect
    contentNode.getBoundingClientRect = () => contentNodeClientRect

    const offset = 8
    const direction = {
      x: '',
      y: 'up',
    }

    const o = getOptimalViewportPosition({
      triggerNode,
      contentNode,
      offset,
      direction,
    })

    expect(o.direction.y).toBe('down')
  })

  test('Adjusts from down -> up, if applicable', () => {
    const triggerNode = document.createElement('div')
    const contentNode = document.createElement('div')
    document.body.appendChild(triggerNode)
    document.body.appendChild(contentNode)

    const triggerNodeClientRect = {
      width: 100,
      height: 80,
      top: 700,
      left: 8,
      right: 400,
      bottom: 0,
    }
    const contentNodeClientRect = {
      width: 200,
      height: 400,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
    triggerNode.getBoundingClientRect = () => triggerNodeClientRect
    contentNode.getBoundingClientRect = () => contentNodeClientRect

    const offset = 8
    const direction = {
      x: '',
      y: 'down',
    }

    const o = getOptimalViewportPosition({
      triggerNode,
      contentNode,
      offset,
      direction,
    })

    expect(o.direction.y).toBe('up')
  })

  test('Adjusts from left -> right, if applicable', () => {
    const triggerNode = document.createElement('div')
    const contentNode = document.createElement('div')
    document.body.appendChild(triggerNode)
    document.body.appendChild(contentNode)

    const triggerNodeClientRect = {
      width: 100,
      height: 80,
      top: 700,
      left: 8,
      right: 0,
      bottom: 0,
    }
    const contentNodeClientRect = {
      width: 200,
      height: 400,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
    triggerNode.getBoundingClientRect = () => triggerNodeClientRect
    contentNode.getBoundingClientRect = () => contentNodeClientRect

    const offset = 8
    const direction = {
      x: 'left',
      y: 'down',
    }

    const o = getOptimalViewportPosition({
      triggerNode,
      contentNode,
      offset,
      direction,
    })

    expect(o.direction.x).toBe('right')
  })

  test('Adjusts from right -> left, if applicable', () => {
    const triggerNode = document.createElement('div')
    const contentNode = document.createElement('div')
    document.body.appendChild(triggerNode)
    document.body.appendChild(contentNode)

    const triggerNodeClientRect = {
      width: 100,
      height: 80,
      top: 0,
      left: 900,
      right: 0,
      bottom: 0,
    }
    const contentNodeClientRect = {
      width: 200,
      height: 400,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
    triggerNode.getBoundingClientRect = () => triggerNodeClientRect
    contentNode.getBoundingClientRect = () => contentNodeClientRect

    const offset = 8
    const direction = {
      x: 'right',
      y: 'down',
    }

    const o = getOptimalViewportPosition({
      triggerNode,
      contentNode,
      offset,
      direction,
    })

    expect(o.direction.x).toBe('left')
  })

  test('Adjusts from up/left -> down/right, if applicable', () => {
    const triggerNode = document.createElement('div')
    const contentNode = document.createElement('div')
    document.body.appendChild(triggerNode)
    document.body.appendChild(contentNode)

    const triggerNodeClientRect = {
      width: 100,
      height: 80,
      top: 0,
      left: 0,
      right: 400,
      bottom: 0,
    }
    const contentNodeClientRect = {
      width: 200,
      height: 400,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
    triggerNode.getBoundingClientRect = () => triggerNodeClientRect
    contentNode.getBoundingClientRect = () => contentNodeClientRect

    const offset = 8
    const direction = {
      x: 'left',
      y: 'up',
    }

    const o = getOptimalViewportPosition({
      triggerNode,
      contentNode,
      offset,
      direction,
    })

    expect(o.direction.x).toBe('right')
    expect(o.direction.y).toBe('down')
  })

  test('Adjusts from up/right -> down/left, if applicable', () => {
    const triggerNode = document.createElement('div')
    const contentNode = document.createElement('div')
    document.body.appendChild(triggerNode)
    document.body.appendChild(contentNode)

    const triggerNodeClientRect = {
      width: 100,
      height: 80,
      top: 0,
      left: 900,
      right: 0,
      bottom: 0,
    }
    const contentNodeClientRect = {
      width: 200,
      height: 400,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
    triggerNode.getBoundingClientRect = () => triggerNodeClientRect
    contentNode.getBoundingClientRect = () => contentNodeClientRect

    const offset = 8
    const direction = {
      x: 'right',
      y: 'up',
    }

    const o = getOptimalViewportPosition({
      triggerNode,
      contentNode,
      offset,
      direction,
    })
    expect(o.direction.x).toBe('left')
    expect(o.direction.y).toBe('down')
  })

  test('Adjusts from down/left -> up/right, if applicable', () => {
    const triggerNode = document.createElement('div')
    const contentNode = document.createElement('div')
    document.body.appendChild(triggerNode)
    document.body.appendChild(contentNode)

    const triggerNodeClientRect = {
      width: 100,
      height: 80,
      top: 700,
      left: 0,
      right: 0,
      bottom: 0,
    }
    const contentNodeClientRect = {
      width: 200,
      height: 400,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
    triggerNode.getBoundingClientRect = () => triggerNodeClientRect
    contentNode.getBoundingClientRect = () => contentNodeClientRect

    const offset = 8
    const direction = {
      x: 'left',
      y: 'down',
    }

    const o = getOptimalViewportPosition({
      triggerNode,
      contentNode,
      offset,
      direction,
    })

    expect(o.direction.x).toBe('right')
    expect(o.direction.y).toBe('up')
  })

  test('Adjusts from down/right -> up/left, if applicable', () => {
    const triggerNode = document.createElement('div')
    const contentNode = document.createElement('div')
    document.body.appendChild(triggerNode)
    document.body.appendChild(contentNode)

    const triggerNodeClientRect = {
      width: 100,
      height: 80,
      top: 700,
      left: 1000,
      right: 0,
      bottom: 0,
    }
    const contentNodeClientRect = {
      width: 200,
      height: 400,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }
    triggerNode.getBoundingClientRect = () => triggerNodeClientRect
    contentNode.getBoundingClientRect = () => contentNodeClientRect

    const offset = 8
    const direction = {
      x: 'right',
      y: 'down',
    }

    const o = getOptimalViewportPosition({
      triggerNode,
      contentNode,
      offset,
      direction,
    })

    expect(o.direction.x).toBe('left')
    expect(o.direction.y).toBe('up')
  })
})
