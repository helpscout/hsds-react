import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from '../src/components/styled'
import { createSpec, faker } from '@helpscout/helix'
import computeScrollIntoView from 'compute-scroll-into-view'
import renderSpy from '@helpscout/react-utils/dist/renderSpy'

const stories = storiesOf('DropdownPerformanceTest', module)

const ItemSpec = createSpec({
  id: faker.random.uuid(),
  label: faker.name.firstName(),
  value: faker.name.firstName(),
})

const items = ItemSpec.generate(1000)

class MenuBase extends React.PureComponent {
  render() {
    return <div {...this.props} />
  }
}
// const Menu = renderSpy()(MenuBase)
const Menu = MenuBase
class Item extends React.PureComponent {
  render() {
    return (
      <div
        {...this.props}
        style={{ background: this.props.selected ? '#f3f3f3' : '' }}
      />
    )
  }
}

class Dropdown extends React.Component {
  static defaultProps = {
    selectedIndex: 0,
    items,
    inputValue: '',
  }
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: props.selectedIndex,
      menuOptions: this.buildMenuOptions(props, ''),
      inputValue: '',
    }
  }

  onInputChange = event => {
    const inputValue = event.target.value

    this.setState({
      inputValue,
      menuOptions: this.buildMenuOptions(this.props, inputValue),
    })
  }

  buildMenuOptions = (props, inputValue) => {
    return props.items
      .filter(item =>
        item.value.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((item, index) => {
        const onHover = () => this.onOptionHover(index)

        return {
          ...item,
          key: item.id,
          onMouseMove: onHover,
          index,
          className: 'item',
          'data-index': index,
        }
      })
  }

  updateIndex = nextState => {
    this.setState(nextState)
  }

  onOptionHover = index => {
    const { selectedIndex } = this.state
    if (index === selectedIndex) return

    this.updateIndex({
      selectedIndex: index,
    })
  }

  scrollIntoView = selectedIndex => {
    requestAnimationFrame(() => {
      // const node = document.querySelector(`[data-index="${selectedIndex}"`)
      // if (node) {
      //   scrollIntoView(node)
      // }
    })
  }

  goUp = event => {
    event.preventDefault()
    let selectedIndex = this.state.selectedIndex - 1
    if (selectedIndex < 0) {
      selectedIndex = 0
    }
    this.updateIndex({
      selectedIndex: selectedIndex,
    })
    this.scrollIntoView(selectedIndex)
  }

  goDown = event => {
    event.preventDefault()
    let selectedIndex = this.state.selectedIndex + 1
    const max = this.props.items.length - 1
    if (selectedIndex > max) {
      selectedIndex = max
    }
    this.updateIndex({
      selectedIndex,
    })
    this.scrollIntoView(selectedIndex)
  }

  onKeyDown = event => {
    switch (event.key) {
      case 'ArrowDown':
        this.goDown(event)
        break
      case 'ArrowUp':
        this.goUp(event)
        break
      default:
        break
    }
  }

  renderOptions = () => {
    const render = props => {
      const selected = props.index === this.state.selectedIndex

      return (
        <Item {...props} selected={selected}>
          {props.value}
        </Item>
      )
    }

    return this.state.menuOptions.map(render)
  }

  render() {
    return (
      <div>
        <input value={this.state.inputValue} onChange={this.onInputChange} />
        <Menu onKeyDown={this.onKeyDown} tabIndex="0">
          {this.renderOptions()}
        </Menu>
      </div>
    )
  }
}

// Helper function for scroll handling + keyboard
// Thanks Downshift! <3
function scrollIntoView(node, rootNode) {
  if (node === null) {
    return
  }

  const actions = computeScrollIntoView(node, {
    boundary: rootNode,
    block: 'nearest',
    scrollMode: 'if-needed',
  })
  actions.forEach(({ el, top, left }) => {
    el.scrollTop = top
    el.scrollLeft = left
  })
}

stories.add('Test', () => {
  return <Dropdown />
})
