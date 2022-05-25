import styled from 'styled-components'
import { getColor } from '@hsds/utils-color'

const itemPadding = 6
const borderOffset = 4
const borderWidth = 2
const dotTotalSize = 10
const dotBorderWidth = borderWidth
const dotOffset = itemPadding + dotTotalSize / 2
const timestampSize = 60

export const TimelineItemUI = styled.div`
  display: block;
  line-height: 1.5;
  margin-left: ${borderOffset}px;
  padding: ${itemPadding}px 0 ${itemPadding}px 20px;
  position: relative;

  .c-TimelineItem__block {
    max-width: calc(100% - ${timestampSize}px);
  }

  .c-TimelineItem__timestamp {
    min-width: ${timestampSize}px;
    opacity: 0;
    transition: opacity 200ms linear;
    will-change: opacity;
  }
  &:hover {
    .c-TimelineItem__timestamp {
      opacity: 1;
    }
  }

  &::before {
    background-color: ${getColor('grey.400')};
    bottom: 0;
    content: '';
    left: ${borderOffset}px;
    position: absolute;
    top: 0;
    width: ${borderWidth}px;
    z-index: 0;
  }

  &::after {
    background-color: white;
    border-radius: 50%;
    border: ${dotBorderWidth}px solid ${getColor('grey.800')};
    content: '';
    display: block;
    height: ${dotTotalSize}px;
    left: 0;
    position: absolute;
    top: ${dotOffset}px;
    width: ${dotTotalSize}px;
    z-index: 1;
  }

  &:first-child {
    &::before {
      bottom: 0;
      top: ${dotOffset}px;
    }
  }

  &:last-child {
    &::before {
      bottom: calc(100% - ${dotOffset + dotTotalSize / 2}px);
      top: 0;
    }
  }

  &:only-child {
    &::before {
      display: none;
    }
  }
`
