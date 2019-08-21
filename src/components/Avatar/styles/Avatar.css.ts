import baseStyles from '../../../styles/resets/baseStyles.css'
import { getColor, getThemeBrandProp } from '../../../styles/utilities/color'
import forEach from '../../../styles/utilities/forEach'
import variableFontSize from '../../../styles/utilities/variableFontSize'
import styled from '../../styled'

import { config as buttonConfig } from '../../Button/styles/Button.css'

export const config = {
  borderRadius: 3,
  borderWidth: 2,
  boxShadow: '0 5px 8px rgba(0, 0, 0, 0.2)',
  color: getColor('blue.500'),
  position: 'relative',
  size: {
    xl: {
      size: 64,
      fontSize: 13,
    },
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

export const ActionUI = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: rgb(255, 255, 255);

  &:before {
    content: '';
    opacity: 0;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    transition: transform ease-in-out 0.15s;
    transform: scale(0);
  }

  ${getBorderRadiusStyles({ suffix: ':before' })};

  .c-Icon {
    opacity: 0;
    transform: translateY(3px);
    transition: opacity 0.2s, transform 0.3s;
    position: relative;
    z-index: 5;
  }

  &:hover:before {
    opacity: 1;
    transform: scale(1);
  }
  &:hover .c-Icon {
    opacity: 1;
    transform: translateY(0);
  }
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
  position: relative;

  ${getBorderRadiusStyles()};

  &.is-withShadow {
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0) inset, ${config.boxShadow};

    &.is-imageLoaded {
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 1) inset, ${config.boxShadow};
    }
  }
`

export const ImageWrapperUI = styled('div')`
  backface-visibility: hidden;
  display: block;
  height: 100%;
  opacity: 0;
  overflow: hidden;
  transform: translate3d(0, 0, 0) scale(1.0125);
  width: 100%;

  ${getBorderRadiusStyles()};

  &.is-herbieFullyLoaded {
    opacity: 1;
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

    &.is-xl {
      bottom: 3px;
      right: 3px;
    }

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
  border-color: ${props =>
    props.borderColor ? props.borderColor : 'transparent'};
  ${getBorderRadiusStyles()};
`

export const FocusUI = styled('span')`
  position: absolute;
  top: -${config.borderWidth}px;
  bottom: -${config.borderWidth}px;
  left: -${config.borderWidth}px;
  right: -${config.borderWidth}px;

  animation: FocusFadeIn 200ms;
  box-shadow: 0 0 0 ${buttonConfig.focusOutlineWidth}px
    ${buttonConfig.focusOutlineColor};
  display: none;
  pointer-events: none;

  @keyframes FocusFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

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

function getBorderRadiusStyles({ suffix = '' } = {}): string {
  return `
    &.is-circle${suffix} {
      border-radius: 200%;
    }
    &.is-rounded${suffix} {
      border-radius: ${config.borderRadius}px;
    }
    &.is-square${suffix} {
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

export const AvatarUI = styled('div')`
  ${baseStyles};
  height: ${config.size.md.size}px;
  position: relative;
  width: ${config.size.md.size}px;

  ${props => getColorStyles(props)} &.is-light {
    color: ${getColor('grey.400')};
  }

  ${getSizeStyles()};
`

export const AvatarButtonUI = styled('button')`
  ${baseStyles};
  padding: 0;
  border: none;
  height: ${config.size.md.size}px;
  position: relative;
  width: ${config.size.md.size}px;
  outline: none;

  ${props => getColorStyles(props)} &.is-light {
    color: ${getColor('grey.400')};
  }

  ${getSizeStyles()};

  &:hover,
  &:active,
  &:focus {
    outline: none;
    text-decoration: none;
  }

  &:active,
  &:active:focus {
    .c-Avatar__focusBorder {
      display: none;
    }
  }

  &.is-active,
  &:focus {
    z-index: 2;
    .c-Avatar__focusBorder {
      display: block;
    }
    .c-Avatar__outerBorder {
      opacity: 0;
    }
  }
`
