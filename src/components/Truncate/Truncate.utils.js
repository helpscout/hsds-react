import isString from 'lodash.isstring'
import isNil from 'lodash.isnil'

export const TRUNCATED_COMPONENT_KEY = 'c-Truncate__content__chunks'

export const TRUNCATED_CLASSNAMES = {
  component: TRUNCATED_COMPONENT_KEY,
  withSplitter: 'with-splitter',
  firstChunk: `${TRUNCATED_COMPONENT_KEY}__first`,
  secondChunk: `${TRUNCATED_COMPONENT_KEY}__second`,
}

// Source
// https://github.com/kahwee/truncate-middle
export const truncateMiddle = (word, startLen, endLen, ellip) => {
  const wordLen = isNil(word) ? 0 : word.length

  if (!isString(word) && !wordLen) {
    return ''
  }
  // Setting default values
  const frontLen = ~~startLen // will cast to integer
  const backLen = ~~endLen
  const truncateStr = ellip !== undefined ? ellip : '…'

  if (
    (frontLen === 0 && backLen === 0) ||
    frontLen >= wordLen ||
    backLen >= wordLen ||
    frontLen + backLen >= wordLen
  ) {
    return word
  } else if (backLen === 0) {
    return word.slice(0, frontLen) + truncateStr
  } else {
    return word.slice(0, frontLen) + truncateStr + word.slice(wordLen - backLen)
  }
}
