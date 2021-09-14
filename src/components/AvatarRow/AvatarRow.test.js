import React from 'react'
import { render } from '@testing-library/react'
import AvatarRow from '../AvatarRow'
import { splitAvatarsArray } from './AvatarRow.utils'

const avatars = [
  {
    id: '001',
    image: 'image 001',
    name: 'name 001',
  },
  {
    id: '002',
    image: 'image 002',
    name: 'name 002',
  },
  {
    id: '003',
    image: 'image 003',
    name: 'name 003',
  },
  {
    id: '004',
    image: 'image 004',
    name: 'name 004',
  },
  {
    id: '005',
    image: 'image 005',
    name: 'name 005',
  },
  {
    id: '006',
    image: 'image 006',
    name: 'name 006',
  },
]

describe('Modes', () => {
  beforeEach(() => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }))
  })
  afterEach(() => {
    window.ResizeObserver = undefined
  })

  test('Should use ResizeObserver by default', () => {
    render(<AvatarRow avatars={avatars} />)

    expect(ResizeObserver).toHaveBeenCalled()
  })

  test('Should not use ResizeObserver in ie compat mode', () => {
    render(<AvatarRow ieCompatible avatars={avatars} />)

    expect(ResizeObserver).not.toHaveBeenCalled()
  })

  test('Should not use resize window event by default', () => {
    const spy = jest.spyOn(window, 'addEventListener')
    render(<AvatarRow avatars={avatars} />)

    expect(spy).not.toHaveBeenLastCalledWith('resize', expect.anything())
  })

  test('Should use resize window event in ie compat mode', () => {
    const spy = jest.spyOn(global, 'addEventListener')
    render(<AvatarRow ieCompatible avatars={avatars} />)

    expect(spy).toHaveBeenLastCalledWith('resize', expect.anything())
  })

  test('Should not use ResizeObserver if adaptable off', () => {
    render(<AvatarRow adaptable={false} avatars={avatars} />)

    expect(ResizeObserver).not.toHaveBeenCalled()
  })

  test('Should not use resize window event if adaptable off', () => {
    const spy = jest.spyOn(global, 'addEventListener')
    render(<AvatarRow ieCompatible adaptable={false} avatars={avatars} />)

    expect(spy).not.toHaveBeenLastCalledWith('resize', expect.anything())
  })
})

describe('Resize', () => {
  test('should render all avatars if space is enough', async () => {
    const avatarSize = 46
    const margin = 2
    const gaps = 5
    const spaceNeededForAll = avatarSize * avatars.length + margin * gaps

    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: spaceNeededForAll,
      }
    })
    const { container } = render(<AvatarRow ieCompatible avatars={avatars} />)

    expect(container.querySelectorAll('.c-Avatar').length).toBe(avatars.length)
    expect(container.querySelector('.AvatarOverflowed')).not.toBeInTheDocument()
  })

  test('should render the counter if space is not enough', async () => {
    const avatarSize = 46
    const margin = 2
    const gaps = 5
    const spaceNeededFor5 = avatarSize * (avatars.length - 1) + margin * gaps

    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: spaceNeededFor5,
      }
    })
    const { container } = render(<AvatarRow ieCompatible avatars={avatars} />)

    expect(container.querySelectorAll('.c-Avatar').length).toBe(
      avatars.length - 2
    )
    expect(container.querySelector('.AvatarOverflowed')).toBeInTheDocument()
    expect(container.querySelector('.TooltipTrigger')).toBeInTheDocument()
    expect(container.querySelector('.AvatarOverflowed').textContent).toBe('2')
  })

  test('should always render 1 item even if space is not enough', async () => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 10,
      }
    })
    const { container } = render(<AvatarRow ieCompatible avatars={avatars} />)

    expect(container.querySelectorAll('.c-Avatar').length).toBe(0)
    expect(container.querySelector('.AvatarOverflowed')).toBeInTheDocument()
    expect(container.querySelector('.AvatarOverflowed').textContent).toBe('6')
  })
})

describe('splitAvatarsArray', () => {
  test('should split avatars into displayed and hidden', () => {
    const { shownAvatars, hiddenAvatars } = splitAvatarsArray(avatars, 3)

    expect(shownAvatars.length).toBe(2)
    expect(hiddenAvatars.length).toBe(4)
  })

  test('should not split avatars if items displayed is same as number of avatars', () => {
    const { shownAvatars, hiddenAvatars } = splitAvatarsArray(avatars, 6)

    expect(shownAvatars.length).toBe(6)
    expect(hiddenAvatars.length).toBe(0)
  })

  test('should not split avatars if items displayed is larger than number of avatars', () => {
    const { shownAvatars, hiddenAvatars } = splitAvatarsArray(avatars, 7)

    expect(shownAvatars.length).toBe(6)
    expect(hiddenAvatars.length).toBe(0)
  })
})
