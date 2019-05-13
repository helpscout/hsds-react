import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import SelectDropdown from '../SelectDropdown'
import ContentResizer from './ActionSelect.ContentResizer'
import { classNames } from '../../utilities/classNames'
import { findFirstFocusableNode } from '../../utilities/focus'
import { noop } from '../../utilities/other'
import { ActionSelectProps } from './ActionSelect.types'
import { ActionSelectUI } from './styles/ActionSelect.css'
import { COMPONENT_KEY } from './ActionSelect.utils'

export class ActionSelect extends React.PureComponent<ActionSelectProps> {
  static className = 'c-ActionSelect'
  static defaultProps = {
    animationEasing: 'ease',
    children: null,
    innerRef: noop,
    items: [],
    isAutoFocusNodeOnSelect: true,
    shouldRefocusOnClose: () => true,
    onSelect: noop,
  }

  contentNode: HTMLDivElement

  getClassName() {
    const { children, className } = this.props

    return classNames(
      ActionSelect.className,
      children && 'is-withContent',
      className
    )
  }

  handleOnSelect = (item, props) => {
    this.props.onSelect(item, props)
    this.autoFocusChildNode()
  }

  autoFocusChildNode = () => {
    requestAnimationFrame(() => {
      if (!this.contentNode) return

      const focusableNode = findFirstFocusableNode(this.contentNode)

      if (focusableNode) {
        focusableNode.focus()
      }
    })
  }

  handleShouldRefocusOnClose = props => {
    return this.props.shouldRefocusOnClose(props)
  }

  setContentNode = node => {
    this.contentNode = node
  }

  render() {
    const { animationEasing, children, innerRef, ...rest } = this.props

    return (
      <ActionSelectUI className={this.getClassName()} innerRef={innerRef}>
        <div className="c-ActionSelectDropdownWrapper">
          <SelectDropdown
            {...rest}
            onSelect={this.handleOnSelect}
            shouldRefocusOnClose={this.handleShouldRefocusOnClose}
          />
        </div>
        <ContentResizer
          animationEasing={animationEasing}
          borderWidth={1}
          innerRef={this.setContentNode}
        >
          {children}
        </ContentResizer>
      </ActionSelectUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(ActionSelect)

export default PropConnectedComponent
