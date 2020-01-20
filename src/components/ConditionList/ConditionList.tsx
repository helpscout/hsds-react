import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import AddButton from './ConditionList.AddButton'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ConditionListProps } from './ConditionList.types'
import { ConditionListUI } from './styles/ConditionList.css'
import { PageContext } from '../Page/Page'

export class ConditionList extends React.Component<ConditionListProps> {
  static className = 'c-ConditionList'
  static defaultProps = {
    innerRef: noop,
    onAdd: noop,
    isAddEnabled: true,
    isWithOffset: false,
    scrollDuration: 300,
    scrollOffset: 200,
  }

  static AddButton = AddButton

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
      <AddButton
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
        ref={innerRef as any}
        data-cy="ConditionList"
      >
        {this.renderConditions()}
        {this.renderAddAction()}
      </ConditionListUI>
    )
  }
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
