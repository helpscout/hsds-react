import * as React from 'react'
import Tooltip, { TooltipContext } from '../src/components/Tooltip'

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

const stories = storiesOf('Tooltip', module)
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
    title: text('title', '"Hello"'),
    minWidth: number('minWidth', ''),
    maxWidth: number('maxWidth', ''),
  }

  return (
    <TooltipContext.Provider value={{ zIndex: 10 }}>
      <div style={{ padding: '20%', textAlign: 'center' }}>
        <Tooltip {...props}>
          <div>Tooltip Trigger</div>
        </Tooltip>
      </div>
    </TooltipContext.Provider>
  )
})

stories.add('With Context provider', () => {
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
    title: text('title', '"Hello"'),
  }

  return (
    <TooltipContext.Provider
      value={{ zIndex: 10, animationDelay: 2500, animationDuration: 0 }}
    >
      <div style={{ padding: '20%', textAlign: 'center' }}>
        <Tooltip {...props}>
          <div>Tooltip Trigger</div>
        </Tooltip>
      </div>
    </TooltipContext.Provider>
  )
})
