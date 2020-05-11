import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import { classNames } from '../../utilities/classNames'
import { ItemUI } from './ControlGroup.css'

class Item extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    isBlock: PropTypes.bool,
    isFirst: PropTypes.bool,
    isNotOnly: PropTypes.bool,
    isLast: PropTypes.bool,
  }
  static defaultProps = {
    isBlock: false,
    isFirst: false,
    isNotOnly: false,
    isLast: false,
  }
  static displayName = 'ControlGroupItem'

  getChildrenMarkup = () => {
    const { children, isFirst, isNotOnly, isLast } = this.props

    if (!children) return null

    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        isFirst,
        isNotOnly,
        isLast,
      })
    })
  }

  render() {
    const {
      children,
      className,
      isBlock,
      isFirst,
      isLast,
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
      <ItemUI className={componentClassName} {...getValidProps(rest)}>
        {childrenMarkup}
      </ItemUI>
    )
  }
}

export default Item
