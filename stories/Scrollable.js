import React, {PureComponent as Component} from 'react'
import { storiesOf } from '@storybook/react'
import {
  Card,
  Image,
  InfiniteScroller,
  Scrollable,
  Text
} from '../src/index.js'

const stories = storiesOf('Scrollable', module)

class StoryComponent extends Component {
  constructor () {
    super()
    this.state = { isLoading: false }
    this.onLoading = this.onLoading.bind(this)
  }

  onLoading (onLoaded) {
    this.setState({ isLoading: true })
    console.log('Loading!')
    setTimeout(() => {
      onLoaded()
      console.log('Loaded!')
    }, 500)
  }

  render () {
    const {
      isLoading
    } = this.state

    const onLoading = this.onLoading

    return (
      <Card style={{height: 400}} seamless>
        <Scrollable>
          <Image
            src='https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto'
            alt='Not now, Arctic Puffin!'
            title='Not now, Arctic Puffin!'
          />
          <InfiniteScroller
            onLoading={onLoading}
            isLoading={isLoading}
          >
            <Text>Load More</Text>
          </InfiniteScroller>
        </Scrollable>
      </Card>
    )
  }
}

stories.add('default', () => (
  <StoryComponent />
))
