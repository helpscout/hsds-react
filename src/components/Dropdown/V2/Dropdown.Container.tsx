import * as React from 'react'
import { Provider } from 'unistore/react'
import getDocumentFromComponent from '@helpscout/react-utils/dist/getDocumentFromComponent'
import { DropdownProps } from './Dropdown.types'
import createStore, { initialState } from './Dropdown.store'
import Dropdown from './Dropdown'
import Menu from './Dropdown.Menu'
import Item from './Dropdown.Item'
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
  static Menu = Menu
  static Item = Item
  static Trigger = Trigger

  static childContextTypes = {
    getState: noop,
  }

  store: any

  getChildContext = () => {
    return { getState: () => this.store.getState() }
  }

  constructor(props) {
    super(props)

    const id = props.id || uniqueID()
    const menuId = pathResolve(id, 'menu')
    const triggerId = pathResolve(id, 'trigger')
    const initialState = {
      ...this.props,
      envNode: getDocumentFromComponent(this),
      id,
      menuId,
      triggerId,
      indexMap: getIndexMapFromItems(props.items),
    }

    if (props.__store && props.__store.setState) {
      props.__store.setState({ id, menuId, triggerId })
      this.store = props.__store
    } else {
      this.store = createStore(initialState)
    }
  }

  componentWillMount() {
    this.store.subscribe(this.props.subscribe)
  }

  componentWillUnmount() {
    this.store.unsubscribe(this.props.subscribe)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.rehydrateStoreWithProps({
        items: nextProps.items,
        indexMap: getIndexMapFromItems(nextProps.items),
      })
    }
    if (nextProps.isOpen !== this.props.isOpen) {
      this.rehydrateStoreWithProps({ isOpen: nextProps.isOpen })
    }
    if (nextProps.inputValue !== this.props.inputValue) {
      this.rehydrateStoreWithProps({
        previousIndex: this.store.getState().index,
        index: '0',
      })
    }
  }

  rehydrateStoreWithProps = (props: Object) => {
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
