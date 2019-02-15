import * as React from 'react'
import { PropProvider, Hr, Text, Popover } from '../src/components'
import {
  withKnobs,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('Popover', module)
stories.addDecorator(withArtboard())
stories.addDecorator(withKnobs)

const List = () => (
  <div style={{ width: 100 }}>
    <h3>Heading</h3>
    <ul>
      <li>One</li>
      <li>Two</li>
      <li>
        <span role="img" aria-label="Bee">
          🐝
        </span>
      </li>
    </ul>
  </div>
)

stories.add('Default', () => {
  const triggerOn = select(
    'triggerOn',
    {
      click: 'click',
      hover: 'hover',
    },
    'click'
  )
  const placement = select(
    'placement',
    {
      auto: 'auto',
      top: 'top',
      right: 'right',
      bottom: 'bottom',
      left: 'left',
    },
    'top'
  )

  return (
    <PropProvider value={{ Popover: { zIndex: 10 } }}>
      <div style={{ padding: '20%' }}>
        <Popover
          animationDelay={number('animationDelay', 100)}
          animationDuration={number('animationDuration', 100)}
          animationSequence={text('animationSequence', 'fade up')}
          closeOnBodyClick={boolean('closeOnBodyClick', true)}
          closeOnEscPress={boolean('closeOnEscPress', true)}
          isOpen={boolean('isOpen', true)}
          triggerOn={triggerOn}
          renderContent={() => <List />}
          placement={placement}
          showArrow={boolean('showArrow', true)}
          title="Hallo"
        >
          <div>Tooltip Trigger</div>
        </Popover>
      </div>
    </PropProvider>
  )
})
