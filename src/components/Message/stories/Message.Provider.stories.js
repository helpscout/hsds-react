import React from 'react'
import { storiesOf } from '@storybook/react'
import { Message } from '../../index'

const stories = storiesOf('Message', module)

stories.add('Theme', () => {
  class Example extends React.PureComponent {
    state = {
      isEmbed: true,
    }

    toggle = () => {
      this.setState({ isEmbed: !this.state.isEmbed })
    }

    render() {
      const theme = this.state.isEmbed ? 'embed' : 'admin'
      return (
        <div>
          <button onClick={this.toggle}>Toggle</button>
          Currently: {theme}
          <hr />
          <Message.Provider theme={theme}>
            <Message to>
              <Message.Chat>Can I get an extension?</Message.Chat>
              <Message.Media
                imageUrl="https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto"
                caption="image.jpg"
              />
              <Message.Chat>Can I get an extension?</Message.Chat>
            </Message>
          </Message.Provider>
        </div>
      )
    }
  }

  return <Example />
})
