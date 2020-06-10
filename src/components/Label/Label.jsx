import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import Text from '../Text'
import { classNames } from '../../utilities/classNames'
import { isString } from '../../utilities/is'
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

Label.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  for: PropTypes.string,
  isMarginless: PropTypes.bool,
  state: PropTypes.string,
}

Label.defaultProps = {
  'data-cy': 'Label',
  isMarginless: false,
  state: 'default',
}

export default Label
