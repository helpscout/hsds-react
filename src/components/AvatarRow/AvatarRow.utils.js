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

export function getNumberOfItemsToDisplay({
  avatarSize,
  containerWidth,
  gap,
  numberOfAvatars,
  numberOfItemsOnDisplay,
}) {
  /** Only act if we have more than 1 avatar */
  if (!containerWidth || numberOfAvatars <= 1) {
    return
  }

  /** The total space for the avatars is comprised of:
   * Avatar space: Number of avatars * the size of the avatar
   * +
   * Margin space: gap between avatars * the number of gaps. For example, for 3 avatars, there are 2 gaps => [AV]gap[AV]gap[AV]
   */
  const spaceForAllAvatars =
    avatarSize * numberOfAvatars + (numberOfAvatars - 1) * gap

  if (containerWidth >= spaceForAllAvatars) {
    return numberOfAvatars
  } else {
    const numberOfGaps = numberOfItemsOnDisplay - 1
    const itemsThatFit = Math.floor(
      (containerWidth - numberOfGaps * gap) / avatarSize
    )

    return itemsThatFit > 0 ? itemsThatFit : 1
  }
}
