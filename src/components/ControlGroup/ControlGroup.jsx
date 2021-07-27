import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import classNames from 'classnames'
import ControlGroupBlock from './ControlGroup.Block'
import ControlGroupItem from './ControlGroup.Item'
import { ControlGroupUI } from './ControlGroup.css'

class ControlGroup extends React.PureComponent {
  static Block = ControlGroupBlock
  static Item = ControlGroupItem

  getChildrenMarkup = () => {
    const { children } = this.props

    if (!children) return null

    return React.Children.map(children, (child, index) => {
      if (child.type !== ControlGroupItem && child.type !== ControlGroupBlock)
        return child

      return React.cloneElement(child, {
        isFirst: index === 0 && children.length > 1,
        isNotOnly: index > 0 && index < children.length - 1,
        isLast: index !== 0 && index === children.length - 1,
      })
    })
  }

  render() {
    const { children, className, ...rest } = this.props
    const componentClassName = classNames('c-ControlGroup', className)
    const childrenMarkup = this.getChildrenMarkup()

    return (
      <ControlGroupUI className={componentClassName} {...getValidProps(rest)}>
        {childrenMarkup}
      </ControlGroupUI>
    )
  }
}

ControlGroup.defaultProps = {
  'data-cy': 'ControlGroup',
}

ControlGroup.propTypes = {
  /** The className of the component. */
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
}

export default ControlGroup
