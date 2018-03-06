import React, {Component} from 'react'
import {createSpec, faker} from '@helpscout/helix'
import { storiesOf } from '@storybook/react'
import {
  Notification,
  NotificationStack
} from '../../src/index.js'

const NotificationSpec = createSpec({
  id: faker.random.uuid(),
  body: faker.lorem.sentence()
})

const fromName = faker.name.firstName()()
const stories = storiesOf('NotificationStack', module)

class TestComponent extends Component {
  constructor () {
    super()
    this.state = {
      notifications: []
    }
    this.handleAddNotification = this.handleAddNotification.bind(this)
    this.handleRemoveNotifications = this.handleRemoveNotifications.bind(this)
  }

  handleAddNotification () {
    this.setState({
      notifications: [
        ...this.state.notifications,
        NotificationSpec.generate()
      ]
    })
  }

  handleRemoveNotifications () {
    this.setState(prevState => {
      return {
        notifications: []
      }
    })
    console.log('Dismissed all')
  }

  render () {
    const {notifications} = this.state
    const handleAddNotification = this.handleAddNotification
    const handleRemoveNotifications = this.handleRemoveNotifications

    const messageMarkup = [...notifications].map(n => {
      const {id} = n
      return (
        <Notification
          {...n}
          key={id}
          from={fromName}
        />
      )
    })

    return (
      <div>
        <button onClick={handleAddNotification}>Add Notification</button>
        <div style={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          background: 'rgba(255, 0, 0, 0.02)',
          width: 350
        }}>
          <span style={{opacity: 0.2}}>ContainerFrame (iFrame)</span>
          <NotificationStack onClick={handleRemoveNotifications}>
            {messageMarkup}
          </NotificationStack>
        </div>
      </div>
    )
  }
}

stories.add('default', () => {
  return (
    <TestComponent />
  )
})
