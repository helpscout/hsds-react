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
import { action } from '@storybook/addon-actions'

const stories = storiesOf('Popover', module)
stories.addDecorator(withArtboard({ width: 300, height: 100 }))
stories.addDecorator(withKnobs)

const actionLoggerProps = {
  onBeforeOpen: tooltipInstance => {
    action('onBeforeOpen')(tooltipInstance)
    return Promise.resolve()
  },
  onBeforeClose: tooltipInstance => {
    action('onBeforeClose')(tooltipInstance)
    return Promise.resolve()
  },
}

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
      'top-start': 'top-start',
      'top-end': 'top-end',
      right: 'right',
      bottom: 'bottom',
      left: 'left',
    },
    'top'
  )

  const props = {
    ...actionLoggerProps,
    animationDelay: number('animationDelay', 100),
    animationDuration: number('animationDuration', 100),
    animationSequence: text('animationSequence', 'fade up'),
    closeOnBodyClick: boolean('closeOnBodyClick', true),
    closeOnEscPress: boolean('closeOnEscPress', true),
    closeOnContentClick: boolean('closeOnContentClick', false),
    onContentClick: action('onContentClick'),
    onOpen: action('onOpen'),
    onClose: action('onClose'),
    isOpen: boolean('isOpen', true),
    triggerOn: triggerOn,
    placement: placement,
    showArrow: boolean('showArrow', true),
    header: text('header', ''),
    content: text('content', 'Hello'),
    minWidth: number('minWidth', ''),
    maxWidth: number('maxWidth', ''),
  }

  return (
    <PropProvider value={{ Popover: { zIndex: 10 } }}>
      <div style={{ padding: '20%', textAlign: 'center' }}>
        <Popover {...props}>
          <div>Popover Trigger</div>
        </Popover>
      </div>
    </PropProvider>
  )
})

stories.add('Render props', () => {
  const props = {
    ...actionLoggerProps,
    renderHeader: ({ Header, Title }) => (
      <Header>
        <Title>My Title</Title>
      </Header>
    ),
    renderContent: ({ close }) => (
      <div>
        <p>
          <Text>My Content</Text>
        </p>
        <button onClick={close}>Close</button>
      </div>
    ),
  }
  return (
    <Popover {...props}>
      <div>Popover Trigger</div>
    </Popover>
  )
})
