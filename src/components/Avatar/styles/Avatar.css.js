// @flow
import baseStyles from '../../../styles/resets/baseStyles.css.js'
import { getColor, getThemeBrandProp } from '../../../styles/utilities/color'
import forEach from '../../../styles/utilities/forEach'
import variableFontSize from '../../../styles/utilities/variableFontSize'
import styled from '../../styled'

export const config = {
  borderRadius: 3,
  borderWidth: 2,
  color: getColor('blue.500'),
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
  height: ${config.size.md.size}px;
  position: relative;
  width: ${config.size.md.size}px;

  ${props => getColorStyles(props)}

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

  ${getBorderRadiusStyles()};
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

  &.is-withBorder {
    transform: translate(-${config.borderWidth}px, -${config.borderWidth}px);
  }

  &.is-withStatusIcon {
    margin-right: -2px;
    margin-bottom: -1px;
  }

  &.is-circle {
    bottom: 0;
    right: 0;

    &.is-lg {
      bottom: -3px;
      right: -3px;
    }

    &.is-sm {
      bottom: -3px;
      right: -3px;
    }

    &.is-withBorder {
      transform: none;
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

export const CropBorderUI = styled('div')`
  position: absolute;
  top: -${config.borderWidth}px;
  bottom: -${config.borderWidth}px;
  left: -${config.borderWidth}px;
  right: -${config.borderWidth}px;
  border-style: solid;
  border-width: ${config.borderWidth}px;

  ${getBorderRadiusStyles()};
`

export const OuterBorderUI = styled(CropBorderUI)`
  top: -${config.borderWidth * 2}px;
  bottom: -${config.borderWidth * 2}px;
  left: -${config.borderWidth * 2}px;
  right: -${config.borderWidth * 2}px;
`

function getColorStyles(props: Object): string {
  return `
    color: ${getThemeBrandProp(props, 'brandColor', config.color)};
  `
}

function getBorderRadiusStyles(): string {
  return `
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
}

function getSizeStyles(): string {
  return forEach(config.size, (size, props) => {
    const { fontSize, size: sz } = props

    return `
      &.is-${size} {
        ${variableFontSize({ fontSize })}
        height: ${sz}px;
        width: ${sz}px;
      }
    `
  })
}
