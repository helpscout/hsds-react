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
import {
  pathResolve,
  getIndexMapFromItems,
  filterNonStoreProps,
} from './Dropdown.utils'
import {
  updateItems,
  updateOpen,
  updateIndex,
  updateInputValue,
  updateDropUp,
  updateSelectedItem,
} from './Dropdown.actions'
import Trigger from './Dropdown.Trigger'
import { createUniqueIDFactory } from '../../../utilities/id'
import { noop } from '../../../utilities/other'
import { isDefined } from '../../../utilities/is'

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

  constructor(props, context) {
    super(props, context)

    const id = props.id || uniqueID()
    const menuId = pathResolve(id, 'menu')
    const triggerId = pathResolve(id, 'trigger')

    // Define the initial state for the store
    const initialState = {
      ...this.props,
      envNode: getDocumentFromComponent(this),
      // When displaying the dropdown component in an `iframe` (e.g. Beacon),
      // this scopes the window reference to the `iframe`, instead of the host.
      // When not in an `iframe` the default window object will be set.
      containerWindow: props.customWindow || window,
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
    const state = this.store.getState()
    // Batch updates to a single update
    let nextState = {}

    // Update items + regenerate the indexMap if items change
    if (nextProps.items !== state.items) {
      nextState = {
        ...nextState,
        ...updateItems(state, nextProps.items),
      }
    }

    // Adjust open state, if changed
    if (nextProps.isOpen !== this.props.isOpen) {
      // Queuing this one with RAF
      requestAnimationFrame(() => {
        this.rehydrateStoreWithProps(updateOpen(state, nextProps.isOpen))
      })
    }

    // Adjust index, if changed
    if (
      nextProps.closeOnSelect &&
      isDefined(nextProps.index) &&
      nextProps.index !== state.index
    ) {
      nextState = {
        ...nextState,
        ...updateIndex(state, nextProps.index),
      }
    }

    // Adjust dropUp, if changed
    if (nextProps.dropUp !== state.dropUp) {
      nextState = {
        ...nextState,
        ...updateDropUp(state, nextProps.dropUp),
      }
    }

    // This is to handle filterable dropdowns. We need to adjust the internally
    // tracked inputValue and reset the `index` value for a filterable
    // experience.
    if (nextProps.inputValue !== state.inputValue) {
      nextState = {
        ...nextState,
        ...updateInputValue(state, nextProps.inputValue),
      }
    }

    // Update selectedItem state, if changed externally
    if (nextProps.selectedItem !== state.selectedItem) {
      nextState = {
        ...nextState,
        ...updateSelectedItem(state, nextProps.selectedItem),
      }
    }

    const diffs = getShallowDiffs(this.props, nextProps)
    /* istanbul ignore else */
    if (diffs.diffs.length) {
      const {
        children,
        items,
        isOpen,
        index,
        dropUp,
        inputValue,
        ...changedProps
      } = diffs.next

      if (Object.keys(changedProps).length) {
        nextState = {
          ...nextState,
          ...changedProps,
        }
      }
    }

    this.rehydrateStoreWithProps(nextState)
  }

  rehydrateStoreWithProps(props: Object) {
    // @ts-ignore
    this.store.setState(filterNonStoreProps(props))
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
