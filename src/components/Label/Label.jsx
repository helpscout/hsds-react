import React from 'react'
import PropTypes from 'prop-types'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { isString } from '../../utilities/is'
import { LabelUI } from './Label.css'

class Label extends React.PureComponent {
  static defaultProps = {
    isMarginless: false,
    state: 'default',
  }

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
      <LabelUI {...rest} className={componentClassName} htmlFor={htmlFor}>
        {contentMarkup}
      </LabelUI>
    )
  }
}

Label.propTypes = {
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Determines what the label is associated with. */
  for: PropTypes.string,
  /** Changes the text color based on state. */
  state: PropTypes.oneOf(['error', 'success', 'warning']),
  isMarginless: PropTypes.bool,
}

export default Label
