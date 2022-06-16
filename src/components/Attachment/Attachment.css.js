import styled from 'styled-components'

import { d400, d400Effect } from '../../styles/mixins/depth.css'
import linkStyles from '../../styles/mixins/linkStyles.css'
import { focusRing } from '../../styles/mixins/focusRing.css'
import { getColor } from '../../styles/utilities/color'
import Image from '../Image'
import Text from '../Text'
import { rgba } from '../../utilities/color'
import IconButton from '../IconButton'

const config = {
  imageSize: '37px',
  imageMaxWidth: '80px',
}

export const RemoveButtonUI = styled(IconButton)`
  position: absolute;
  right: -12px;
  top: -12px;
  z-index: 5;
  opacity: 0;
  transform: scale(0);

  &.is-theme-grey.has-icon-only {
    --buttonHeight: 24px;
    --focusRingOffset: -2px;
    --buttonBackgroundColorHover: white;
    --buttonColorHover: ${getColor('pink.1000')};
    --buttonBorderColorHover: ${getColor('pink.900')};
  }

  transition: all 200ms linear;
`

export const SizeUI = styled(Text)`
  color: ${getColor('charcoal.400')};
  margin-left: 5px;
`
export const NameUI = styled(Text)``

export const ImageUI = styled(Image)`
  border-radius: 2px;
  height: ${config.imageSize};
  object-fit: cover;
  max-height: ${config.imageSize};
  max-width: ${config.imageMaxWidth};
  min-width: ${config.imageSize};
  width: auto;
`

export const AttachmentElementUI = styled.a`
  ${linkStyles()};
  ${focusRing};
  --focusRingRadius: 15px;
  background-color: white;
  border: 1px solid ${getColor('grey.500')};
  border-radius: var(--focusRingRadius);
  line-height: 1;
  padding: 4px 10px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-family: var(--HSDSGlobalFontFamily);

  &:hover,
  &:focus-within {
    border-color: ${getColor('grey.600')};
    text-decoration: none;

    ${NameUI} {
      text-decoration: underline;
    }
  }

  &.is-error:after {
    content: '';
    border-radius: inherit;
    border: 1px solid ${getColor('red.500')};
    bottom: 0px;
    left: 0px;
    pointer-events: none;
    position: absolute;
    right: 0px;
    top: 0px;
  }

  &.is-error {
    color: ${getColor('red.500')};

    &:hover,
    &:active,
    &:focus {
      color: ${getColor('red.500')};
    }
  }

  &.is-action {
    ${NameUI} {
      text-decoration: none;
    }
  }

  &.is-theme-preview {
    ${d400};
    --focusRingRadius: 4px;
    border: none;
    border-radius: var(--focusRingRadius);
    display: inline-flex;
    font-weight: 500;
    padding: 0 17px;
    height: 43px;
    align-items: center;
    white-space: nowrap;
    flex-direction: row;
    gap: 4px;
    flex-wrap: nowrap;

    &:hover,
    &:focus-within {
      ${d400Effect}
    }

    &.has-image:not(.is-broken-image) {
      padding: 3px;
    }
    &.is-broken-image {
      box-shadow: 0 0 0 1px ${rgba(getColor('grey.700'), 0.7)};
      background-color: ${getColor('grey.200')};
      color: ${getColor('charcoal.400')};
      padding-left: 14px;

      &:hover {
        box-shadow: 0 0 0 1px ${rgba(getColor('grey.700'), 0.7)};
      }
      > .c-Icon {
        color: ${getColor('charcoal.200')};
      }
    }
  }
`

export const AttachmentUI = styled.div`
  position: relative;
  flex: 0 0 auto;
  display: inline-flex;
  transition: all 200ms linear;
  z-index: 1;

  &:hover {
    z-index: 3;
  }
  &:focus-within {
    z-index: 2;
  }

  &:hover,
  &:focus-within {
    transform: translateY(-2px);

    ${RemoveButtonUI} {
      opacity: 1;
      transform: scale(1);
    }
  }
`
