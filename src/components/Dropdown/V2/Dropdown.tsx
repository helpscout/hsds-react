import * as React from 'react'
import { connect } from 'unistore/react'
import { DropdownProps } from './Dropdown.types'
import propConnect from '../../PropProvider/propConnect'
import {
  itemOnMouseEnter,
  itemOnFocus,
  itemOnClick,
  closeDropdown,
  setMenuNode,
  setTriggerNode,
} from './Dropdown.actions'
import {
  enhanceItemsWithProps,
  getEnhancedItemsWithProps,
  renderRenderPropComponent,
} from './Dropdown.utils'
import EventListener from '../../EventListener'
import KeypressListener from '../../KeypressListener'
import MenuContainer from './Dropdown.MenuContainer'
import Trigger from './Dropdown.Trigger'
import { DropdownUI } from './Dropdown.css.js'
import Keys from '../../../constants/Keys'
import { classNames } from '../../../utilities/classNames'
import { noop } from '../../../utilities/other'
import { namespaceComponent } from '../../../utilities/component'
import { COMPONENT_KEY } from './Dropdown.utils'

export interface State {
  items: Array<any>
}

export class Dropdown extends React.PureComponent<DropdownProps, State> {
  static defaultProps = {
    closeDropdown: noop,
    direction: 'right',
    dropUp: false,
    innerRef: noop,
    isOpen: false,
    isLoading: false,
    itemOnClick: noop,
    itemOnFocus: noop,
    itemOnMouseEnter: noop,
    items: [],
    minWidth: 180,
    maxWidth: 360,
    minHeight: 48,
    maxHeight: 320,
    menuRef: noop,
    onBlur: noop,
    onClose: noop,
    onFocus: noop,
    onOpen: noop,
    onSelect: noop,
    selectedItem: '',
    setMenuNode: noop,
    setTriggerNode: noop,
    subscribe: noop,
    trigger: 'Dropdown',
    triggerRef: noop,
    withScrollLock: true,
  }

  static childContextTypes = {
    getState: noop,
  }

  node: HTMLElement
  triggerNode: HTMLElement
  menuNode: HTMLElement

  constructor(props) {
    super(props)
    this.state = {
      items: this.getEnhancedItemsFromProps(props),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({
        items: this.getEnhancedItemsFromProps(nextProps),
      })
    }
  }

  handleOnDocumentKeyDown = (event: KeyboardEvent) => {
    if (!this.props.isOpen) return

    /* istanbul ignore else */
    if (event.keyCode === Keys.ESCAPE) {
      event.preventDefault && event.preventDefault()
      this.focusTriggerNode()
      this.closeMenu()
    }
  }

  handleOnDocumentBodyClick = (event: Event) => {
    if (!event) return
    if (!this.menuNode) return

    const targetNode = event.target

    /* istanbul ignore else */
    if (targetNode instanceof Element) {
      if (this.menuNode.contains(targetNode) || targetNode === this.triggerNode)
        return

      this.closeMenu()
    }
  }

  closeMenu = () => {
    if (!this.props.isOpen) return
    // Store calls onClose() callback
    this.props.closeDropdown()
  }

  focusTriggerNode = () => {
    if (this.triggerNode && this.props.isOpen) {
      this.triggerNode.focus()
    }
  }

  getEnhancedItemsFromProps = (props: DropdownProps) => {
    const { items, itemOnMouseEnter, itemOnFocus, itemOnClick } = props

    return enhanceItemsWithProps(items, {
      onClick: itemOnClick,
      onFocus: itemOnFocus,
      onMouseEnter: itemOnMouseEnter,
    })
  }

  getTriggerProps = () => {
    const { onBlur, onFocus } = this.props

    return {
      onBlur,
      onFocus,
      innerRef: this.setTriggerNodeRef,
    }
  }

  renderTrigger = () => {
    const { trigger, renderTrigger } = this.props
    const triggerComponent = renderTrigger
      ? /* istanbul ignore next */
        renderRenderPropComponent(renderTrigger)
      : trigger

    return <Trigger {...this.getTriggerProps()}>{triggerComponent}</Trigger>
  }

  setNodeRef = (node: HTMLElement) => {
    this.node = node
    this.props.innerRef(node)
  }

  setMenuNodeRef = (node: HTMLElement) => {
    this.menuNode = node
    this.props.menuRef(node)
    // Internally, for store
    this.props.setMenuNode(node)
  }

  setTriggerNodeRef = (node: HTMLElement) => {
    this.triggerNode = node
    this.props.triggerRef(node)
    // Internally, for store
    this.props.setTriggerNode(node)
  }

  renderMenu = () => {
    const { children } = this.props
    const { items } = this.state

    return (
      <MenuContainer
        items={items}
        children={children}
        innerRef={this.setMenuNodeRef}
      />
    )
  }

  render() {
    const { className, id } = this.props
    const componentClassName = classNames(className, 'c-DropdownV2')

    return (
      <DropdownUI
        className={componentClassName}
        innerRef={this.setNodeRef}
        id={id}
      >
        <KeypressListener
          handler={this.handleOnDocumentKeyDown}
          type="keydown"
        />
        <EventListener
          event="click"
          handler={this.handleOnDocumentBodyClick}
          scope={document}
        />
        {this.renderTrigger()}
        {this.renderMenu()}
      </DropdownUI>
    )
  }
}

namespaceComponent(COMPONENT_KEY.Dropdown)(Dropdown)
const PropConnectedComponent = propConnect(COMPONENT_KEY.Dropdown)(Dropdown)

const ConnectedDropdown: any = connect(
  // mapStateToProps
  (state: any) => {
    const { id, isOpen } = state
    return {
      id,
      isOpen,
      items: getEnhancedItemsWithProps(state),
    }
  },
  // mapDispatchToProps
  {
    closeDropdown,
    itemOnMouseEnter,
    itemOnFocus,
    itemOnClick,
    setMenuNode,
    setTriggerNode,
  }
)(
  // @ts-ignore
  PropConnectedComponent
)

export default ConnectedDropdown
