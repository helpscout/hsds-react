import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import { EmoticonUI, IconUI, EmoticonAnimationUI } from './Emoticon.css'
import { getName, getIcon } from './Emoticon.utils'

export class Emoticon extends React.PureComponent {
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
      withAnimation = false,
      ...rest
    } = this.props
    const iconName = getName(name)
    const icon = getIcon(iconName, size)

    const component = (
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

    if (withAnimation) {
      return <EmoticonAnimationUI>{component}</EmoticonAnimationUI>
    }

    return component
  }
}

function noop() {}

Emoticon.defaultProps = {
  center: false,
  clickable: true,
  'data-cy': 'Emoticon',
  inline: false,
  isActive: true,
  isDisabled: false,
  innerRef: noop,
  name: 'happy',
  role: 'presentation',
  size: 'md',
  title: '',
}

Emoticon.propTypes = {
  /** The className of the component. */
  className: PropTypes.string,
  /** Center aligns component with margin right and left = auto */
  center: PropTypes.bool,
  /** No pointer events allowed if false */
  clickable: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** Give the emoticon an inactive style (grey) */
  isActive: PropTypes.bool,
  /** Disabled (no pointer events allowed and reduced opacity) */
  isDisabled: PropTypes.bool,
  /** Get the dom ref */
  innerRef: PropTypes.func,
  /** Display as inline block */
  inline: PropTypes.bool,
  /** The name of the emoticon to render */
  name: PropTypes.oneOf([
    'happy',
    'sad',
    'meh',
    'reaction-happy',
    'reaction-sad',
    'reaction-okay',
  ]),
  /** Render a html title attribute on the emoticon*/
  title: PropTypes.string,
  /** size of the emoticon: lg: '24px', md: '20px', sm: '16px' */
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
  /** Animate Emoticon on hover */
  withAnimation: PropTypes.bool,
}

export default Emoticon
