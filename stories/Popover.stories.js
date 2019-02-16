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
stories.addDecorator(withArtboard())
stories.addDecorator(withKnobs)

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

  const props = {
    animationDelay: number('animationDelay', 100),
    animationDuration: number('animationDuration', 100),
    animationSequence: text('animationSequence', 'fade up'),
    closeOnBodyClick: boolean('closeOnBodyClick', true),
    closeOnEscPress: boolean('closeOnEscPress', true),
    onBeforeOpen: tooltipInstance => {
      action('onBeforeOpen')(tooltipInstance)
      return Promise.resolve()
    },
    onBeforeClose: tooltipInstance => {
      action('onBeforeOpen')(tooltipInstance)
      return Promise.resolve()
    },
    onContentClick: action('onContentClick'),
    onOpen: action('onOpen'),
    onClose: action('onClose'),
    isOpen: boolean('isOpen', true),
    triggerOn: triggerOn,
    placement: placement,
    showArrow: boolean('showArrow', true),
    header: text('header', ''),
    title: text('title', 'Hello'),
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
