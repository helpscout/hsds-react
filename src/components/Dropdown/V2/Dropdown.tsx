import * as React from 'react'
import { Provider } from 'unistore/react'
import store, { initialState } from './Dropdown.store'
import MenuContainer from './Dropdown.MenuContainer'
import Menu from './Dropdown.Menu'
import Item from './Dropdown.Item'
import { pathResolve } from './Dropdown.utils'
import Trigger from './Dropdown.Trigger'
import Keys from '../../../constants/Keys'
import { DropdownUI } from './Dropdown.css.js'
import { classNames } from '../../../utilities/classNames'
import { createUniqueIDFactory } from '../../../utilities/id'
import { noop } from '../../../utilities/other'

export interface Props {
  activeItem?: HTMLElement | null
  activeIndex?: string
  className?: string
  id?: string
  onBlur: (event: Event) => void
  onFocus: (event: Event) => void
  onOpen: () => void
  onClose: () => void
  innerRef: (node: HTMLElement) => void
  isOpen: boolean
  items: Array<any>
  direction: 'left' | 'right'
  dropUp: boolean
  onSelect: (item: Object, props: Object) => void
  menuId?: string
  renderTrigger?: any
  trigger: any
}

export interface State {
  id: string
}

const uniqueID = createUniqueIDFactory('hsds-dropdown-v2-')

class Dropdown extends React.PureComponent<Props, State> {
  static defaultProps = {
    ...initialState,
    onBlur: noop,
    onOpen: noop,
    onClose: noop,
    onFocus: noop,
    isOpen: false,
    innerRef: noop,
    onSelect: noop,
    trigger: 'Dropdown',
  }
  static Menu = Menu
  static Item = Item
  static Trigger = Trigger
  static store = store

  node: HTMLElement
  triggerNode: HTMLElement

  componentWillMount() {
    this.setIdToStore()
    this.rehydrateStore()
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOnBodyClick)
    document.addEventListener('keydown', this.handleOnKeyDown)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.rehydrateStore()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOnBodyClick)
    document.removeEventListener('keydown', this.handleOnKeyDown)
  }

  setIdToStore = () => {
    const id = this.props.id || uniqueID()

    store.setState({
      id,
      menuId: pathResolve(id, 'menu'),
      triggerId: pathResolve(id, 'trigger'),
    })
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
    store.setState({
      isOpen: false,
    })
    this.props.onClose()
  }

  focusTriggerNode = () => {
    if (this.triggerNode && store.getState().isOpen) {
      this.triggerNode.focus()
    }
  }

  rehydrateStore = () => {
    // @ts-ignore
    store.setState(this.props)
  }

  getTriggerProps = () => {
    const { onBlur, onFocus } = this.props

    return {
      onBlur,
      onFocus,
      innerRef: this.setTriggerNodeRef,
    }
  }

  setNodeRef = (node: HTMLElement) => {
    this.node = node
    this.props.innerRef(node)
  }

  setTriggerNodeRef = (node: HTMLElement) => {
    this.triggerNode = node
  }

  renderTrigger = () => {
    const { trigger, renderTrigger } = this.props

    return (
      <Trigger {...this.getTriggerProps()}>{renderTrigger || trigger}</Trigger>
    )
  }

  render() {
    const { className, id } = this.props
    const componentClassName = classNames(className, 'c-DropdownV2')

    return (
      <Provider store={store}>
        <DropdownUI
          className={componentClassName}
          innerRef={this.setNodeRef}
          id={id}
        >
          {this.renderTrigger()}
          <MenuContainer />
        </DropdownUI>
      </Provider>
    )
  }
}

export default Dropdown
