// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor } from '../../../styles/utilities/color'
import forEach from '../../../styles/utilities/forEach'
import variableFontSize from '../../../styles/utilities/variableFontSize'
import styled from '../../styled'

export const config = {
  borderRadius: 3,
  borderWidth: 2,
  color: getColor('purple.500'),
  position: 'relative',
  size: {
    lg: {
      size: 52,
      fontSize: 13,
    },
    md: {
      size: 46,
      fontSize: 13,
    },
    smmd: {
      size: 35,
      fontSize: 12,
    },
    sm: {
      size: 30,
      fontSize: 10,
    },
    xs: {
      size: 28,
      fontSize: 10,
    },
    xxs: {
      size: 26,
      fontSize: 10,
    },
  },
}

export const AvatarUI = styled('div')`
  ${baseStyles}
  color: ${config.color};
  height: ${config.size.md.size}px;
  position: relative;
  width: ${config.size.md.size}px;

  &.is-light {
    color: ${getColor('grey.400')};
  }

  ${getSizeStyles()}
`

export const CropUI = styled('div')`
  align-items: center;
  background-color: currentColor;
  border-radius: 200%;
  display: flex;
  height: 100%;
  justify-content: center;
  overflow: hidden;
  width: 100%;

  &.is-circle {
    border-radius: 200%;
  }
  &.is-rounded {
    border-radius: ${config.borderRadius}px;
  }
  &.is-square {
    border-radius: 0;
  }
`

export const ImageUI = styled('div')`
  background-position: center center;
  background-size: cover;
  display: block;
  height: 100%;
  width: 100%;
`

export const TitleUI = styled('div')`
  color: white;
  line-height: 1;
  text-transform: uppercase;
  user-select: none;

  &.is-light {
    color: ${getColor('text.muted')};
  }
`

export const StatusUI = styled('div')`
  position: absolute;
  z-index: 1;

  &.is-circle {
    bottom: 0;
    right: 0;

    &.is-sm {
      bottom: -3px;
      right: -3px;
    }
  }

  &.is-rounded {
    bottom: -4px;
    right: -4px;
  }

  &.is-square {
    bottom: -4px;
    right: -4px;
  }
`

function getSizeStyles(): string {
  return forEach(config.size, (size, props) => {
    const { fontSize, size: sz } = props

    const outerSize = sz + config.borderWidth * 2

    return `
      &.is-${size} {
        ${variableFontSize({ fontSize })}
        height: ${sz}px;
        width: ${sz}px;

        &.has-outerBorderColor {
          height: ${outerSize}px;
          width: ${outerSize}px;
        }
      }
    `
  })
}
