import React from 'react'
import PropTypes from 'prop-types'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import ConditionListAddButton from './ConditionList.AddButton'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ConditionListUI } from './ConditionList.css'
import { PageContext } from '../Page/Page'

export class ConditionList extends React.Component {
  static className = 'c-ConditionList'
  static AddButton = ConditionListAddButton

  getClassName() {
    const { className, isWithOffset } = this.props
    return classNames(
      ConditionList.className,
      isWithOffset && 'is-withOffset',
      className
    )
  }

  renderConditions() {
    const { children } = this.props

    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        ...child.props,
        isWithAnd: index > 0,
      })
    })
  }

  renderAddAction() {
    const { isAddEnabled, onAdd, scrollDuration, scrollOffset } = this.props
    if (!isAddEnabled) return null

    return (
      <ConditionListAddButton
        onClick={onAdd}
        scrollDuration={scrollDuration}
        scrollOffset={scrollOffset}
      />
    )
  }

  render() {
    const { children, innerRef, isAddEnabled, ...rest } = this.props

    return (
      <ConditionListUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={innerRef}
      >
        {this.renderConditions()}
        {this.renderAddAction()}
      </ConditionListUI>
    )
  }
}

ConditionList.defaultProps = {
  'data-cy': 'ConditionList',
  innerRef: noop,
  onAdd: noop,
  isAddEnabled: true,
  isWithOffset: false,
  scrollDuration: 300,
  scrollOffset: 200,
}

ConditionList.propTypes = {
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  /** The className of the component. */
  className: PropTypes.string,
  /** Retrieve the inner DOM node. */
  innerRef: PropTypes.func,
  /** Renders an inner Condition.AddButton. */
  isAddEnabled: PropTypes.bool,
  /** Renders component with negative left/right margins. */
  isWithOffset: PropTypes.bool,
  /** Callback when the inner Condition.AddButton is clicked. */
  onAdd: PropTypes.func,
  /** Time (ms) it takes to scroll into view. */
  scrollDuration: PropTypes.number,
  /** Amount (px) used to calculate scrolling into view. */
  scrollOffset: PropTypes.number,
}

const ConditionListConsumer = props => {
  const contextValue = React.useContext(PageContext)

  if (contextValue) {
    const newProps = { ...props, ...contextValue }
    newProps.className = classNames(props.className, contextValue.className)
    return <ConditionList {...newProps} />
  }

  return <ConditionList {...props} />
}

ConditionListConsumer.propTypes = ConditionList.propTypes

export default ConditionListConsumer
