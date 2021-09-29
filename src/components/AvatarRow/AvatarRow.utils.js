import React from 'react'
import AvatarRow from './AvatarRow'
import { generateAvatarList } from '../../utilities/specs/avatar.specs'

export const MARGIN_LEFT = 2

export function splitAvatarsArray(avatars, itemsDisplayed) {
  const hiddenAvatars =
    itemsDisplayed < avatars.length
      ? avatars.slice(itemsDisplayed - 1, avatars.length)
      : []

  const shownAvatars = hiddenAvatars.length
    ? avatars.slice(0, itemsDisplayed - 1)
    : avatars

  return { shownAvatars, hiddenAvatars }
}

// TODO: Move this to the general utils library that is coming some time in the winter
export function setupObserver(callback) {
  return new ResizeObserver(entries => {
    for (let entry of entries) {
      if (entry.contentBoxSize) {
        // Firefox implements `contentBoxSize` as a single content rect, rather than an array
        const contentBoxSize = Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0]
          : entry.contentBoxSize
        const { inlineSize: width } = contentBoxSize

        callback({ width })
      }
    }
  })
}

export const AvatarRowPlayground = () => {
  const [avatars, setAvatars] = React.useState(generateAvatarList(1, true))

  const handleClick = () => {
    setAvatars([...avatars, ...generateAvatarList(1, true)])
  }

  return (
    <div>
      <AvatarRow size="lg" gap={10} avatars={avatars} />
      <button onClick={handleClick}>increase avatar count</button>
    </div>
  )
}
