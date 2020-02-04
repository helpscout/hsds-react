import React from 'react'
import { storiesOf } from '@storybook/react'
import arrayMove from 'array-move'
import mockItems from './MessageList.mockItems'
import Page from '../Page'
import MessageList from '.'

const stories = storiesOf('PhaseOut/MessageList', module)

stories.add('MessageList', () => {
  class Messages extends React.Component {
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

  return <Messages />
})
