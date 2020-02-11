import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { EmoticonUI, IconUI } from './Emoticon.css'
import { getName, getIcon } from './Emoticon.utils'

export class Emoticon extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    center: PropTypes.bool,
    clickable: PropTypes.bool,
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool,
    innerRef: PropTypes.func,
    inline: PropTypes.bool,
    name: PropTypes.oneOf([
      'happy',
      'sad',
      'meh',
      'reaction-happy',
      'reaction-sad',
      'reaction-okay',
    ]),
    title: PropTypes.string,
    size: PropTypes.oneOf(['lg', 'md', 'sm']),
  }

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
          {icon}
        </IconUI>
      </EmoticonUI>
    )
  }
}

export default Emoticon
