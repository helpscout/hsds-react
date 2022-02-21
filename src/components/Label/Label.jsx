import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import classNames from 'classnames'
import isString from 'lodash.isstring'
import { LabelUI } from './Label.css'

class Label extends React.PureComponent {
  render() {
    const {
      className,
      children,
      for: htmlFor,
      isMarginless,
      state,
      ...rest
    } = this.props
    const componentClassName = classNames(
      'c-Label',
      isMarginless && 'is-marginless',
      state && `is-${state}`,
      className
    )
    const contentMarkup = isString(children) ? (
      <Text className="c-Label__text" shade="subtle">
        {children}
      </Text>
    ) : (
      children
    )

    return (
      <LabelUI
        {...getValidProps(rest)}
        className={componentClassName}
        htmlFor={htmlFor}
      >
        {contentMarkup}
      </LabelUI>
    )
  }
}

Label.defaultProps = {
  'data-cy': 'Label',
  isMarginless: false,
}

Label.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Determines what the label is associated with. */
  for: PropTypes.string,
  /** Changes the text color based on state. */
  state: PropTypes.oneOf(['error', 'success', 'warning']),
  /** Remove bottom margin */
  isMarginless: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default Label
