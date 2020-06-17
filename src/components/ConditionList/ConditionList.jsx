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

ConditionList.propTypes = {
  className: PropTypes.string,
  /** Data attr for Cypress tests. */
  'data-cy': PropTypes.string,
  innerRef: PropTypes.func,
  isAddEnabled: PropTypes.bool,
  isWithOffset: PropTypes.bool,
  onAdd: PropTypes.func,
  scrollDuration: PropTypes.number,
  scrollOffset: PropTypes.number,
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

const ConditionListConsumer = props => {
  const contextValue = React.useContext(PageContext)

  if (contextValue) {
    const newProps = { ...props, ...contextValue }
    newProps.className = classNames(props.className, contextValue.className)
    return <ConditionList {...newProps} />
  }

  return <ConditionList {...props} />
}

export default ConditionListConsumer
