import * as React from 'react'
import { Provider } from 'unistore/react'
import store, { initialState } from './Dropdown.store'
import Menu from './Dropdown.Menu'

class Dropdown extends React.PureComponent<any> {
  static defaultProps = {
    ...initialState,
    onSelect: (item, props) => {
      console.log(item, props)
    },
  }

  componentWillMount() {
    this.rehydrateStore()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.rehydrateStore()
    }
  }

  rehydrateStore = () => {
    // @ts-ignore
    store.setState(this.props)
  }

  render() {
    return (
      <Provider store={store}>
        <Menu />
      </Provider>
    )
  }
}

export default Dropdown
