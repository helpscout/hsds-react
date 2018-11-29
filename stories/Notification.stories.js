import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import Artboard, { GuideContainer, Guide } from '@helpscout/artboard'
import { storiesOf } from '@storybook/react'
import { Notification } from '../src/index.js'

const NotificationSpec = createSpec({
  id: faker.random.uuid(),
  body: faker.lorem.paragraph(),
  from: faker.name.firstName(),
})

const stories = storiesOf('Notification', module)
stories.addDecorator(storyFn => (
  <Artboard
    name="hsds-notification"
    artboardHeight={200}
    withCenterGuides={false}
  >
    <div style={{ padding: 30 }}>{storyFn()}</div>
  </Artboard>
))

const baseGuide = {
  position: 'absolute',
  width: '100%',
  zIndex: 1000,
}

export const notificationGuides = [
  {
    ...baseGuide,
    height: 20,
  },
  {
    ...baseGuide,
    height: 20,
    top: 'none',
    bottom: 3,
  },
  {
    ...baseGuide,
    height: '100%',
    width: 20,
  },
  {
    ...baseGuide,
    height: '100%',
    left: 'none',
    right: 0,
    width: 20,
  },
  {
    ...baseGuide,
    height: 3,
    top: 'none',
    color: 'blue',
    bottom: 0,
  },
  {
    ...baseGuide,
    height: 5,
    top: 35,
    color: 'blue',
  },
]

export function makeGuides(guides) {
  return guides.map((guide, key) => <Guide key={key} {...guide} />)
}

stories.add('default', () => {
  const props = NotificationSpec.generate()
  const { body, from, name } = props

  return (
    <GuideContainer>
      {makeGuides(notificationGuides)}
      <div>
        <Notification body={body} from={from} name={name} />
      </div>
    </GuideContainer>
  )
})

stories.add('types', () => {
  const props = NotificationSpec.generate()
  return (
    <div style={{ maxWidth: 300 }}>
      <div style={{ textAlign: 'right' }}>Text (Default)</div>
      <Notification {...props} type="text" />

      <div style={{ textAlign: 'right' }}>Link</div>
      <Notification
        {...props}
        body="https://www.helpscout.net/blog/beacon-preview/"
        type="link"
      />

      <div style={{ textAlign: 'right' }}>Image</div>
      <Notification
        {...props}
        body="https://www.helpscout.net/images/blog/2016/feb/release-notes-2016.png"
        type="image"
      />
    </div>
  )
})

stories.add('align', () => {
  const props = () => NotificationSpec.generate()

  return (
    <div style={{ maxWidth: 300 }}>
      <div style={{ textAlign: 'right' }}>Right (Default)</div>
      <div>
        <Notification {...props()} type="text" />
        <Notification {...props()} type="text" />
      </div>

      <div style={{ textAlign: 'left' }}>Left</div>
      <div>
        <Notification {...props()} align="left" type="text" />
        <Notification {...props()} align="left" type="text" />
      </div>
    </div>
  )
})
