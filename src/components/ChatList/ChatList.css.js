import styled from 'styled-components'
import { getColor } from '@hsds/utils-color'
import SpeechBubble from '@helpscout/hsds-illos/speech-bubble'
import Card from '../Card'
import Flexy from '../Flexy'
import Link from '../Link'
import Tag from '../Tag'

export const ChatListUI = styled('div')`
  margin-bottom: 10px;
  min-width: 280px;
`

export const BlankSlateUI = styled('div')`
  background-color: ${getColor('grey.200')};
`

export const SpeechBubbleIlloUI = styled(SpeechBubble)`
  display: block;
  margin: 0px auto -13px auto;
`

export const ContentUI = styled('div')`
  padding: 16px 20px 19px;
  text-align: center;
`
export const config = {
  backgroundColor: getColor('grey.200'),
  backgroundColorHover: '#f4f6f7',
  backgroundColorAssigned: 'white',
  backgroundColorAssignedHover: '#fcfcfc',
  backgroundColorFocused: '#f4fbff',
  backgroundColorFocusedHover: '#eef9ff',
  borderColorFocused: getColor('blue.500'),
  borderWidth: 3,
  flagColor: getColor('yellow.500'),
  flagSize: 12,
  transition: 'background-color 0.3s ease, border-left 0.1s ease',
}

export const ItemUI = styled(Link)`
  ${makeBackgroundColorStyles(config.backgroundColor)};

  border-left: ${config.borderWidth}px solid transparent;
  position: relative;
  transition: ${config.transition};

  &:hover {
    ${makeBackgroundColorStyles(config.backgroundColorHover)};
  }

  &:focus {
    outline: none !important;
    z-index: 2;
  }

  &.is-assigned,
  &.is-loading {
    ${makeBackgroundColorStyles(config.backgroundColorAssigned)};

    &:hover {
      ${makeBackgroundColorStyles(config.backgroundColorAssignedHover)};
    }
  }

  &.is-focused {
    ${makeBackgroundColorStyles(config.backgroundColorFocused)};
    border-left: ${config.borderWidth}px solid ${config.borderColorFocused};

    &:hover {
      ${makeBackgroundColorStyles(config.backgroundColorFocusedHover)};
    }
  }
`

export const BlockUI = styled(Card.Block)`
  padding-left: calc(20px - ${config.borderWidth}px);
  padding-bottom: 16px;
  padding-top: 16px;
`

export const TypingUI = styled('div')`
  padding-bottom: 8px;
  padding-top: 8px;
`

export const ViewingFlagUI = styled('div')`
  border-left: ${config.flagSize}px solid ${config.flagColor};
  border-bottom: ${config.flagSize}px solid transparent;
  height: 0;
  left: -${config.borderWidth}px;
  position: absolute;
  top: 0;
  width: 0;
  z-index: 1;
`

export const HeadingUI = styled(Flexy)`
  margin-bottom: 5px;
  min-height: 18px;
`

export const MessageCountUI = styled(Flexy.Item)`
  margin-bottom: -1px;
  margin-top: -1px;
`

export const MessageUI = styled('div')`
  min-height: 40px;
  margin-bottom: 2px;
  padding-right: 20px;
`

export const MetaUI = styled(Flexy)`
  margin-bottom: -5px;
`

export const TimestampUI = styled('div')`
  margin-right: 12px;
`

export const TagListWrapperUI = styled('div')`
  max-width: 140px;
`

export const AvatarListWrapperUI = styled('div')`
  margin-top: -9px;
`

export const DividerWrapperUI = styled('div')`
  margin-left: -3px;
`

function makeBackgroundColorStyles(color) {
  return `
    background-color: ${color};

    .c-Overflow__fader {
      color: ${color};
    }
  `
}

export const PulsingTagUI = styled(Tag)`
  animation: 4s ease 0s infinite normal both running Tag_Blink;
  backface-visibility: hidden;
  filter: blur(0);
  -webkit-filter: blur(0);

  &.is-red {
    color: ${getColor('red.500')};
    border-color: ${getColor('red.500')};
  }

  @keyframes Tag_Blink {
    0% {
      opacity: 0.2;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
`

export const ItemDividerUI = styled('hr')`
  margin: 0;
  border: 0;
  border-top-color: ${getColor('grey.400')};
  border-top-style: solid;
  border-top-width: 1px;
  box-sizing: content-box;
  display: block;
  height: 0;
`
