import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'

import { FormGroupChoiceUI } from './FormGroup.css'

class Choice extends React.PureComponent {
  static defaultProps = {
    isResponsive: false,
    style: {},
  }

  static displayName = 'FormGroupChoice'

  render() {
    const {
      className,
      children,
      isResponsive,
      maxWidth,
      style,
      ...rest
    } = this.props

    const componentClassName = classNames(
      'c-FormGroupChoice',
      isResponsive && 'is-responsive',
      className
    )

    const componentStyle = {
      maxWidth,
      ...style,
    }

    return (
      <FormGroupChoiceUI
        {...getValidProps(rest)}
        className={componentClassName}
        style={componentStyle}
      >
        {children}
      </FormGroupChoiceUI>
    )
  }
}

Choice.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Max-width for the component. */
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Enables responsive styling. */
  isResponsive: PropTypes.bool,
}

export default Choice
