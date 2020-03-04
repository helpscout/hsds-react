import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { EmoticonUI, IconUI } from './Emoticon.css'
import { getName, getIcon } from './Emoticon.utils'

export class Emoticon extends React.PureComponent {
  static defaultProps = {
    center: false,
    clickable: true,
    inline: false,
    isActive: true,
    isDisabled: false,
    innerRef: noop,
    name: 'happy',
    role: 'presentation',
    size: 'md',
    title: '',
  }

  static className = 'c-Emoticon'

  getClassNames() {
    const {
      className,
      clickable,
      center,
      isActive,
      isDisabled,
      inline,
      name,
      size,
    } = this.props

    return classNames(
      Emoticon.className,
      !clickable && 'is-noInteract',
      isActive ? 'is-active' : 'is-inactive',
      center && 'is-center',
      inline && 'is-inline',
      isDisabled && 'is-disabled',
      name && `is-${getName(name)}`,
      size && `is-${size}`,
      className
    )
  }

  render() {
    const {
      className,
      center,
      clickable,
      innerRef,
      isActive,
      isDisabled,
      inline,
      name,
      title,
      size,
      ...rest
    } = this.props
    const iconName = getName(name)
    const icon = getIcon(iconName, size)

    return (
      <EmoticonUI
        {...getValidProps(rest)}
        size={size}
        className={this.getClassNames()}
        innerRef={innerRef}
      >
        <IconUI className="c-Emoticon__icon" title={title}>
          {icon && icon}
        </IconUI>
      </EmoticonUI>
    )
  }
}

Emoticon.propTypes = {
  /** Center aligns component. */
  center: PropTypes.bool,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Enables the component to be clickable. */
  clickable: PropTypes.bool,
  /** Displays the component as `inline-block`. */
  inline: PropTypes.bool,
  /** Determines the emoticon color. (false is monochrome grey) */
  isActive: PropTypes.bool,
  /** Disables the emoticon from interactions. */
  isDisabled: PropTypes.bool,
  /** Determines the SVG image. Required. */
  name: PropTypes.oneOf([
    'happy',
    'sad',
    'meh',
    'reaction-happy',
    'reaction-sad',
    'reaction-okay',
  ]),
  /** Adjusts the size of the component. */
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
  /** Provides a title on the icon. */
  title: PropTypes.string,
  innerRef: PropTypes.func,
}

export default Emoticon
