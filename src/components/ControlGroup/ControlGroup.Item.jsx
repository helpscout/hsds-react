import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { isDOMTypeElement } from '../../utilities/is'
import { ItemUI } from './ControlGroup.css'

class ControlGroupItem extends React.PureComponent {
  getChildrenMarkup = () => {
    const { children, isFirst, isNotOnly, isLast } = this.props

    if (!children) return null

    return React.Children.map(children, (child, index) => {
      let props = isDOMTypeElement(child)
        ? {}
        : {
            isFirst,
            isNotOnly,
            isLast,
          }

      return React.cloneElement(child, props)
    })
  }

  render() {
    const {
      children,
      className,
      isBlock,
      isFirst,
      isLast,
      isNotOnly,
      ...rest
    } = this.props
    const componentClassName = classNames(
      'c-ControlGroupItem',
      isBlock && 'is-block',
      isFirst && 'is-first',
      isLast && 'is-last',
      className
    )
    const childrenMarkup = this.getChildrenMarkup()

    return (
      <ItemUI {...getValidProps(rest)} className={componentClassName}>
        {childrenMarkup}
      </ItemUI>
    )
  }
}

ControlGroupItem.defaultProps = {
  'data-cy': 'ControlGroupItem',
  isBlock: false,
  isFirst: false,
  isNotOnly: false,
  isLast: false,
}

ControlGroupItem.propTypes = {
  /** Content to render. */
  children: PropTypes.any,
  /** Custom class names to be added to the component. */
  className: PropTypes.string,
  /** Renders with a wider responsive width. */
  isBlock: PropTypes.bool,
  /** Helps render component without right borders. */
  isFirst: PropTypes.bool,
  /** Helps render component without left/right borders. */
  isNotOnly: PropTypes.bool,
  /** Helps render component without left borders. */
  isLast: PropTypes.bool,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default ControlGroupItem
