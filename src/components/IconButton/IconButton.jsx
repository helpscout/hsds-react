import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import {
  useButtonClassnames,
  THEME_GREY,
  THEMES,
  SIZE_XL,
  SIZE_LG,
} from '../Button/Button.utils'

import Icon from '../Icon'
import Avatar from '../Avatar'
import { IconButtonUI, IconContainerUI, ChildrenUI } from './IconButton.css'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'

export const SIZES = [SIZE_XL, SIZE_LG]

const useIconButtonAvatar = (props = {}) => {
  const { image, fallbackImage } = props
  if (!image) {
    return null
  }

  return <Avatar image={image} fallbackImage={fallbackImage} />
}

const useIconButton = props => {
  const { as, disabled, size, filled, submit, ...rest } = props

  const forcedProps = {
    rounded: true,
    size: SIZES.includes(size) ? size : 'xl',
    outlined: !filled,
  }

  const componentClassName = useButtonClassnames(
    'c-IconButton',
    { ...rest, ...forcedProps },
    disabled
  )

  const type = submit ? 'submit' : 'button'

  return {
    'data-testid': 'IconButton',
    ...getValidProps(rest),
    type,
    disabled,
    as: as ? as : undefined,
    className: componentClassName,
  }
}

export const IconButton = forwardRef((props, ref) => {
  const { icon, avatarProps = {}, ...rest } = props

  const { children, ...buttonProps } = useIconButton(rest)

  const avatarComponent = useIconButtonAvatar(avatarProps)
  const shouldShowIcon = icon && !avatarComponent

  return (
    <IconButtonUI {...buttonProps} ref={ref}>
      <IconContainerUI>
        {shouldShowIcon && <Icon name={icon} size={24} />}
        {avatarComponent && avatarComponent}
      </IconContainerUI>
      {children && <ChildrenUI>{children}</ChildrenUI>}
    </IconButtonUI>
  )
})

IconButton.defaultProps = {
  disabled: false,
  submit: false,
  filled: false,
  theme: THEME_GREY,
  'data-cy': 'IconButton',
  icon: 'search',
}

IconButton.propTypes = {
  /** Change the html element used for the component. */
  as: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Disable the button so it can't be clicked. */
  disabled: PropTypes.bool,
  /** The name of the icon to render. */
  icon: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Sets the size of the button. */
  size: PropTypes.oneOf(SIZES),
  /** Sets the `type` of the button to `"submit"`. */
  submit: PropTypes.bool,
  /** Applies a theme based style to the button. */
  theme: PropTypes.oneOf(THEMES),
}

export default IconButton
