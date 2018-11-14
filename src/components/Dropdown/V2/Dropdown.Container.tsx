import * as React from 'react'
import { Provider } from 'unistore/react'
import createStore, { initialState } from './Dropdown.store'
import Dropdown, { Props as DropdownProps } from './Dropdown'
import Menu from './Dropdown.Menu'
import Item from './Dropdown.Item'
import { pathResolve } from './Dropdown.utils'
import Trigger from './Dropdown.Trigger'
import { createUniqueIDFactory } from '../../../utilities/id'
import { noop } from '../../../utilities/other'

export interface Props extends DropdownProps {
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

  store: any

  constructor(props) {
    super(props)

    const id = props.id || uniqueID()
    const menuId = pathResolve(id, 'menu')
    const triggerId = pathResolve(id, 'trigger')

    this.store = createStore({ ...this.props, id, menuId, triggerId })
  }

  componentWillMount() {
    this.store.subscribe(this.props.subscribe)
  }

  componentWillUnmount() {
    this.store.unsubscribe(this.props.subscribe)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.rehydrateStore()
    }
  }

  rehydrateStore = () => {
    // @ts-ignore
    this.store.setState(this.props)
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
