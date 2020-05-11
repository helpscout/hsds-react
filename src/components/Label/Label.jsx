import React from 'react'
import PropTypes from 'prop-types'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { isString } from '../../utilities/is'
import { LabelUI } from './Label.css'

class Label extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    for: PropTypes.string,
    isMarginless: PropTypes.bool,
    state: PropTypes.string,
  }

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

export default Label
