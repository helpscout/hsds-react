import React from 'react'
import { storiesOf } from '@storybook/react'
import MessageList from '../src/components/MessageList'
import Page from '../src/components/Page'
import { withArtboard } from '@helpscout/artboard'
import mockItems from '../src/components/MessageList/__tests__/mockItems'
import arrayMove from 'array-move'

const stories = storiesOf('MessageList', module)

stories.add('MessageList', () => {
  class Example extends React.Component {
    state = {
      items: mockItems,
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
      const { items } = this.state
      this.setState({
        items: arrayMove(items, oldIndex, newIndex),
      })
    }

    render() {
      return (
        <Page>
          <Page.Card>
            <MessageList items={this.state.items} onSortEnd={this.onSortEnd} />
          </Page.Card>
        </Page>
      )
    }
  }

  return <Example />
})
