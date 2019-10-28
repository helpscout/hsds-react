import * as React from 'react'
import getValidProps from '@helpscout/react-utils/dist/getValidProps'
import PropProvider from '../PropProvider'
import propConnect from '../PropProvider/propConnect'
import AddButton from './ConditionList.AddButton'
import { classNames } from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { ConditionListProps } from './ConditionList.types'
import { ConditionListUI } from './styles/ConditionList.css'
import { COMPONENT_KEY } from './ConditionList.utils'
import { COMPONENT_KEY as CONDITION_COMPONENT_KEY } from '../Condition/Condition.utils'

export class ConditionList extends React.Component<ConditionListProps> {
  static className = 'c-ConditionList'
  static defaultProps = {
    ref: noop,
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
      const isWithAnd = index > 0
      const value = {
        [CONDITION_COMPONENT_KEY.Condition]: {
          isWithAnd,
        },
      }
      return <PropProvider value={value}>{child}</PropProvider>
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
    const { children, ref, isAddEnabled, ...rest } = this.props

    return (
      <ConditionListUI
        {...getValidProps(rest)}
        className={this.getClassName()}
        ref={ref as any}
      >
        {this.renderConditions()}
        {this.renderAddAction()}
      </ConditionListUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY.ConditionList)(
  ConditionList
)

export default PropConnectedComponent
