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

export function getNumberOfItemsToDisplay({
  avatarSize,
  containerWidth,
  gap,
  numberOfAvatars,
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
    // The real space for an avatar is its size + gap, we round down to account
    // for the last avatar not having a gap after it [AV]gap[AV]gap[AV]gap[AV]
    const numberOfGaps = Math.floor(containerWidth / (avatarSize + gap))
    const itemsThatFit = Math.floor(
      (containerWidth - numberOfGaps * gap) / avatarSize
    )

    // Always show 1 regardless if there's enough space for it
    return itemsThatFit > 0 ? itemsThatFit : 1
  }
}
