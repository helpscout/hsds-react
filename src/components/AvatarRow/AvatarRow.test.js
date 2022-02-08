import React from 'react'
import { render } from '@testing-library/react'
import AvatarRow from '../AvatarRow'
import { getNumberOfItemsToDisplay, splitAvatarsArray } from './AvatarRow.utils'

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

describe('ResizeObserver', () => {
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

  test('Should not use ResizeObserver if adaptable off', () => {
    render(<AvatarRow adaptable={false} avatars={avatars} />)

    expect(ResizeObserver).not.toHaveBeenCalled()
  })
})

describe('Space calculations (getNumberOfItemsToDisplay)', () => {
  test('should render all avatars if space is enough', async () => {
    const avatarSize = 46
    const margin = 2
    const gaps = 5
    const spaceNeededForAll = avatarSize * avatars.length + margin * gaps

    expect(
      getNumberOfItemsToDisplay({
        avatarSize,
        containerWidth: spaceNeededForAll,
        gap: 2,
        numberOfAvatars: avatars.length,
        numberOfItemsOnDisplay: avatars.length,
      })
    ).toBe(6)
  })

  test('should reduce the number of items to display if space is not enough', async () => {
    const avatarSize = 46
    const margin = 2
    const gaps = 5
    const spaceNeededForAll = avatarSize * avatars.length + margin * gaps

    expect(
      getNumberOfItemsToDisplay({
        avatarSize,
        containerWidth: spaceNeededForAll - 10,
        gap: 2,
        numberOfAvatars: avatars.length,
      })
    ).toBe(5)

    expect(
      getNumberOfItemsToDisplay({
        avatarSize,
        containerWidth: spaceNeededForAll - 50,
        gap: 2,
        numberOfAvatars: avatars.length,
      })
    ).toBe(4)
  })

  test('should always return 1 item even if space is not enough', () => {
    const avatarSize = 46

    expect(
      getNumberOfItemsToDisplay({
        avatarSize,
        containerWidth: avatarSize - 5,
        gap: 2,
        numberOfAvatars: avatars.length,
      })
    ).toBe(1)
  })

  test('should return undefined item even if no width provided or just one avatar', () => {
    const avatarSize = 46

    expect(
      getNumberOfItemsToDisplay({
        avatarSize,
        containerWidth: undefined,
        gap: 2,
        numberOfAvatars: avatars.length,
      })
    ).toBe(undefined)

    expect(
      getNumberOfItemsToDisplay({
        avatarSize,
        containerWidth: 500,
        gap: 2,
        numberOfAvatars: 1,
      })
    ).toBe(undefined)
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
