import * as React from 'react'
import { connect } from 'unistore/react'
import {
  itemOnMouseEnter,
  itemOnFocus,
  itemOnClick,
  closeDropdown,
  setTriggerNode,
} from './Dropdown.actions'
import {
  enhanceItemsWithProps,
  getEnhancedItemsWithProps,
} from './Dropdown.utils'
import MenuContainer from './Dropdown.MenuContainer'
import Trigger from './Dropdown.Trigger'
import { DropdownUI } from './Dropdown.css.js'
import Keys from '../../../constants/Keys'
import { classNames } from '../../../utilities/classNames'
import { noop } from '../../../utilities/other'

export interface Props {
  children?: (props: any) => void
  className?: string
  closeDropdown: () => void
  id?: string
  onBlur: (event: Event) => void
  onFocus: (event: Event) => void
  onOpen: () => void
  onClose: () => void
  innerRef: (node: HTMLElement) => void
  isOpen: boolean
  items: Array<any>
  itemOnMouseEnter: (event: Event) => void
  itemOnFocus: (event: Event) => void
  itemOnClick: (event: Event) => void
  direction: 'left' | 'right'
  dropUp: boolean
  onSelect: (item: Object, props: Object) => void
  menuId?: string
  renderItems?: any
  renderTrigger?: any
  trigger: any
  triggerRef: (node: HTMLElement) => void
  setTriggerNode: (node: HTMLElement) => void
}

export interface State {
  items: Array<any>
}

export class Dropdown extends React.PureComponent<Props, State> {
  static defaultProps = {
    direction: 'right',
    dropUp: false,
    innerRef: noop,
    isOpen: false,
    itemOnClick: noop,
    itemOnFocus: noop,
    itemOnMouseEnter: noop,
    items: [],
    onBlur: noop,
    onClose: noop,
    onFocus: noop,
    onOpen: noop,
    onSelect: noop,
    subscribe: noop,
    trigger: 'Dropdown',
    triggerRef: noop,
  }

  node: HTMLElement
  triggerNode: HTMLElement

  constructor(props) {
    super(props)
    this.state = {
      items: this.getEnhancedItemsFromProps(props),
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOnBodyClick)
    document.addEventListener('keydown', this.handleOnKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOnBodyClick)
    document.removeEventListener('keydown', this.handleOnKeyDown)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({
        items: this.getEnhancedItemsFromProps(nextProps),
      })
    }
  }

  handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === Keys.ESCAPE) {
      this.focusTriggerNode()
      this.closeMenu()
    }
  }

  handleOnBodyClick = (event: Event) => {
    if (!event) return
    if (!this.node) return

    if (event.target instanceof Element) {
      if (this.node.contains(event.target)) return

      this.closeMenu()
    }
  }

  closeMenu = () => {
    if (!this.props.isOpen) return
    this.props.closeDropdown()
    this.props.onClose()
  }

  focusTriggerNode = () => {
    if (this.triggerNode && this.props.isOpen) {
      this.triggerNode.focus()
    }
  }

  getEnhancedItemsFromProps = (props: Props = this.props) => {
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

    return (
      <Trigger {...this.getTriggerProps()}>{renderTrigger || trigger}</Trigger>
    )
  }

  setNodeRef = (node: HTMLElement) => {
    this.node = node
    this.props.innerRef(node)
  }

  setTriggerNodeRef = (node: HTMLElement) => {
    this.triggerNode = node
    this.props.triggerRef(node)
    // Internally, for store
    this.props.setTriggerNode(node)
  }

  render() {
    const { className, children, id } = this.props
    const componentClassName = classNames(className, 'c-DropdownV2')

    const { items } = this.state

    return (
      <DropdownUI
        className={componentClassName}
        innerRef={this.setNodeRef}
        id={id}
      >
        {this.renderTrigger()}
        <MenuContainer items={items} children={children} />
      </DropdownUI>
    )
  }
}

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
    setTriggerNode,
  }
)(
  // @ts-ignore
  Dropdown
)

export default ConnectedDropdown
