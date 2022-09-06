import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {
  useButtonClassnames,
  useButtonAs,
  SIZE_XL,
  SIZE_LG,
  SIZE_SM,
  SIZE_XS,
} from '../Button/Button.utils'
import Icon from '../Icon'
import Avatar from '../Avatar'
import {
  IconButtonUI,
  IconContainerUI,
  ChildrenUI,
  StatusUI,
} from './IconButton.css'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'

export const SIZES = [SIZE_XL, SIZE_LG, SIZE_SM, SIZE_XS]

const useIconButtonAvatar = props => {
  if (!props) {
    return null
  }

  const { image, initials, ...rest } = props
  if (!image && !initials) {
    return null
  }

  return <Avatar image={image} initials={initials} {...rest} />
}

const useIconButton = props => {
  const {
    children,
    filled,
    icon,
    seamless,
    size,
    submit,
    title,
    status,
    ...rest
  } = props

  const forcedProps = {
    // IconButton is always rounded, makes it easier to overwrite properties without the classname
    rounded: null,
    size: SIZES.includes(size) ? size : 'xl',
    outlined: !filled,
    seamless: seamless && !filled,
  }

  const additionalProps = useButtonAs(props)
  console.log('🚀 ~ useIconButton ~ additionalProps', additionalProps)

  const buttonProps = {
    ...rest,
    ...forcedProps,
    ...additionalProps,
  }

  const componentClassName = useButtonClassnames('c-IconButton', buttonProps)

  const ariaLabel = rest['aria-label'] || title || undefined
  const hasOnlyIcon = !children && icon
  return {
    'data-testid': 'IconButton',
    ...getValidProps(buttonProps),
    className: classNames(
      componentClassName,
      children && 'has-children',
      hasOnlyIcon && 'has-icon-only',
      status && 'with-status'
    ),
    'aria-label': ariaLabel,
    iconSize: ![SIZE_SM, SIZE_XS].includes(size) ? 24 : 20,
    icon,
    children,
    status,
  }
}

export const IconButton = forwardRef((props, ref) => {
  const { avatarProps = {}, ...rest } = props

  const { iconSize, children, icon, status, ...buttonProps } = useIconButton(
    rest
  )

  const avatarComponent = useIconButtonAvatar(avatarProps)
  const shouldShowIcon = icon && !avatarComponent

  return (
    <IconButtonUI {...buttonProps} ref={ref}>
      <IconContainerUI>
        {shouldShowIcon && (
          <Icon name={icon} size={iconSize} title={buttonProps['aria-label']} />
        )}
        {avatarComponent && avatarComponent}
      </IconContainerUI>
      {children && (
        <ChildrenUI className={shouldShowIcon && 'has-icon'}>
          {children}
        </ChildrenUI>
      )}
      {status && <StatusUI data-testid="IconButton.Status" />}
    </IconButtonUI>
  )
})

IconButton.defaultProps = {
  disabled: false,
  submit: false,
  filled: false,
  theme: 'grey',
  'data-cy': 'IconButton',
  icon: 'search',
  seamless: false,
  status: false,
}

IconButton.propTypes = {
  avatarProps: PropTypes.shape({
    image: PropTypes.string.isRequired,
    fallbackImage: PropTypes.string,
  }),
  /** Change the html element used for the component. */
  as: PropTypes.string,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Disable the button so it can't be clicked. */
  disabled: PropTypes.bool,
  /** Hide the border and background of an outlined button */
  seamless: PropTypes.bool,
  /** Display a status indicator */
  status: PropTypes.bool,
  /** The name of the icon to render. */
  icon: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Sets the size of the button. */
  size: PropTypes.oneOf(['xs', 'sm', 'lg', 'xl']),
  /** Sets the `type` of the button to `"submit"`. */
  submit: PropTypes.bool,
  /** Applies a theme based style to the button. */
  theme: PropTypes.oneOf(['blue', 'red', 'green', 'grey']),
}

export default IconButton
