import React from 'react'
import { createSpec, faker } from '@helpscout/helix'
import Artboard, { GuideContainer, Guide } from '@helpscout/artboard'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Notification } from '../src/index'

const NotificationSpec = createSpec({
  id: faker.random.uuid(),
  body: faker.lorem.paragraph(),
  from: faker.name.firstName(),
})

const stories = storiesOf('Notification', module)
stories.addDecorator(withKnobs)
stories.addDecorator(storyFn => {
  return (
    <Artboard
      name="hsds-notification"
      artboardHeight={200}
      withCenterGuides={false}
    >
      <div style={{ padding: 20 }}>{storyFn()}</div>
    </Artboard>
  )
})

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

const defaultProps = NotificationSpec.generate()

stories.add('Default', () => {
  const { body, from } = defaultProps
  const align = select(
    'align',
    {
      Left: 'left',
      Right: 'right',
    },
    'right'
  )

  const type = select(
    'type',
    {
      Text: 'text',
      Image: 'image',
      Link: 'link',
    },
    'text'
  )

  return (
    <GuideContainer maxWidth={300}>
      {makeGuides(notificationGuides)}
      <div>
        <Notification
          body={text('body', body)}
          from={text('from', from)}
          align={align}
          type={type}
          onClick={action('Clicked!')}
        />
      </div>
    </GuideContainer>
  )
})
