import * as React from 'react'
import propConnect from '../PropProvider/propConnect'
import { getUniqueKeyFromItem } from '../Dropdown/V2/Dropdown.utils'
import SelectDropdown from '../SelectDropdown'
import ContentResizer from './ActionSelect.ContentResizer'
import { classNames } from '../../utilities/classNames'
import { findFirstFocusableNode } from '../../utilities/focus'
import { noop } from '../../utilities/other'
import { ActionSelectProps, ActionSelectState } from './ActionSelect.types'
import { ActionSelectUI } from './styles/ActionSelect.css'
import { COMPONENT_KEY } from './ActionSelect.utils'

export class ActionSelect extends React.PureComponent<
  ActionSelectProps,
  ActionSelectState
> {
  static className = 'c-ActionSelect'
  static defaultProps = {
    animationDuration: 160,
    animationEasing: 'ease',
    children: null,
    'data-cy': 'ActionSelect',
    innerRef: noop,
    items: [],
    isAutoFocusNodeOnSelect: true,
    shouldRefocusOnClose: () => true,
    onResize: noop,
    onSelect: noop,
  }

  state = {
    selectedItem: null,
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

    this.setState({
      selectedItem: props.item,
    })
  }

  autoFocusChildNode = () => {
    requestAnimationFrame(() => {
      if (!this.contentNode || !this.props.isAutoFocusNodeOnSelect) return

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
    const {
      animationDuration,
      animationEasing,
      children,
      innerRef,
      onResize,
      ...rest
    } = this.props

    const { selectedItem } = this.state

    return (
      <ActionSelectUI
        className={this.getClassName()}
        data-cy={this.props['data-cy']}
        innerRef={innerRef}
      >
        <div className="c-ActionSelectDropdownWrapper">
          <SelectDropdown
            {...rest}
            data-cy="ActionSelectDropdown"
            onSelect={this.handleOnSelect}
            shouldRefocusOnClose={this.handleShouldRefocusOnClose}
          />
        </div>
        <ContentResizer
          animationDuration={animationDuration}
          animationEasing={animationEasing}
          borderWidth={1}
          innerRef={this.setContentNode}
          onResize={onResize}
          selectedKey={getUniqueKeyFromItem(selectedItem)}
        >
          {children}
        </ContentResizer>
      </ActionSelectUI>
    )
  }
}

const PropConnectedComponent = propConnect(COMPONENT_KEY)(ActionSelect)

export default PropConnectedComponent
