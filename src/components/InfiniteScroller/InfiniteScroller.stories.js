import React, { PureComponent as Component } from 'react'
import {
  Animate,
  AnimateGroup,
  Card,
  InfiniteScroller,
  Modal,
  Scrollable,
  Text,
} from '../index'

export default {
  component: InfiniteScroller,
  title: 'Utilities/InfiniteScroller',
}

// Setup stuff
const makeStoryItems = (count, start = 0) => {
  const collection = []
  const badHash = () => Math.random() * (100 - 1) + 1
  const uniq = () => `${Math.round(new Date().getTime() / 1000)}-${badHash()}`

  for (let i = 0, len = count; i < len; i++) {
    const index = start + i
    collection.push(
      <Animate sequence="fade">
        <Card style={{ margin: 8 }} key={`item-${uniq()}-${i}`}>
          Item {index + 1}
        </Card>
      </Animate>
    )
  }
  return collection
}

class StoryComponent extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      items: makeStoryItems(15),
    }
    this.onLoading = this.onLoading.bind(this)
    this.onLoaded = this.onLoaded.bind(this)
  }

  onLoading(onLoaded) {
    this.setState({ isLoading: true })
    console.log('Loading!')
    setTimeout(() => {
      this.setState({
        isLoading: false,
      })
      onLoaded()
    }, 500)
  }

  onLoaded() {
    const { items } = this.state
    this.setState({
      items: items.concat(makeStoryItems(5, items.length)),
    })
    console.log('Loaded!')
  }

  render() {
    const { isLoading, items } = this.state

    const onLoaded = this.onLoaded
    const onLoading = this.onLoading

    return (
      <Card style={{ minWidth: 600, height: 320, margin: 'auto' }} seamless>
        <Scrollable>
          <AnimateGroup>{items}</AnimateGroup>
          <InfiniteScroller
            onLoading={onLoading}
            onLoaded={onLoaded}
            isLoading={isLoading}
            style={{ padding: 16 }}
          >
            <Text>Load More</Text>
          </InfiniteScroller>
        </Scrollable>
      </Card>
    )
  }
}

export const Default = () => <StoryComponent />

Default.story = {
  name: 'default',
}

export const _Modal = () => (
  <Modal trigger={<a>Click</a>} isOpen>
    <StoryComponent />
  </Modal>
)

_Modal.story = {
  name: 'modal',
}
