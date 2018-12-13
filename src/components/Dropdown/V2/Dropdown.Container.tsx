import * as React from 'react'
import { Provider } from '@helpscout/wedux'
import getDocumentFromComponent from '@helpscout/react-utils/dist/getDocumentFromComponent'
import getShallowDiffs from '@helpscout/react-utils/dist/getShallowDiffs'
import { DropdownProps } from './Dropdown.types'
import createStore, { initialState } from './Dropdown.store'
import Dropdown from './Dropdown'
import actionTypes from './Dropdown.actionTypes'
import Block from './Dropdown.Block'
import Card from './Dropdown.Card'
import Divider from './Dropdown.Divider'
import Group from './Dropdown.Group'
import Header from './Dropdown.Header'
import Item from './Dropdown.Item'
import Menu from './Dropdown.Menu'
import { pathResolve, getIndexMapFromItems } from './Dropdown.utils'
import Trigger from './Dropdown.Trigger'
import { createUniqueIDFactory } from '../../../utilities/id'
import { noop } from '../../../utilities/other'

export interface Props extends DropdownProps {
  // Secret prop to pass in a custom store
  __store?: any
  subscribe: (state: any) => void
}

export interface State {
  id: string
}

const uniqueID = createUniqueIDFactory('hsds-dropdown-v2-')

export class DropdownContainer extends React.PureComponent<Props, State> {
  static defaultProps = {
    ...initialState,
    onBlur: noop,
    onOpen: noop,
    onClose: noop,
    onFocus: noop,
    isOpen: false,
    innerRef: noop,
    onSelect: noop,
    subscribe: noop,
    trigger: 'Dropdown',
  }

  static actionTypes = actionTypes
  static Block = Block
  static Card = Card
  static Divider = Divider
  static Group = Group
  static Header = Header
  static Item = Item
  static Menu = Menu
  static Trigger = Trigger

  store: any

  constructor(props) {
    super(props)

    const id = props.id || uniqueID()
    const menuId = pathResolve(id, 'menu')
    const triggerId = pathResolve(id, 'trigger')

    // Define the initial state for the store
    const initialState = {
      ...this.props,
      envNode: getDocumentFromComponent(this),
      id,
      menuId,
      triggerId,
      indexMap: getIndexMapFromItems(props.items),
    }

    // Use the user provided Store, if defined...
    if (props.__store && props.__store.setState) {
      props.__store.setState({ id, menuId, triggerId })
      this.store = props.__store
    }
    // ...Otherwise, create our own default store
    else {
      this.store = createStore(initialState)
    }

    // Expose store.getState to internal components
    // This method is cleaner (and simpler) than relying on context or even
    // React.createContext
    this.store.setState({ getState: this.store.getState })
  }

  componentWillMount() {
    this.store.subscribe(this.props.subscribe)
  }

  componentWillUnmount() {
    this.store.unsubscribe(this.props.subscribe)
  }

  componentWillReceiveProps(nextProps) {
    const diffs = getShallowDiffs(this.props, nextProps)
    if (!diffs.diffs.length) return

    const { children, ...changedProps } = diffs.next

    if (Object.keys(changedProps).length) {
      this.rehydrateStoreWithProps(changedProps)
    }
  }

  rehydrateStoreWithProps(props: Object) {
    // @ts-ignore
    this.store.setState(props)
  }

  render() {
    return (
      <Provider store={this.store}>
        <Dropdown {...this.props} />
      </Provider>
    )
  }
}

export default DropdownContainer
