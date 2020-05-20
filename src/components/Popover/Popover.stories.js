import React from 'react'

import { boolean, number, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Text, Popover, Heading } from '..'

export default {
  component: Popover,
  title: 'Components/Overlay/Popover',
}

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

export const Default = () => {
  const triggerOn = select(
    'triggerOn',
    {
      click: 'click',
      hover: 'mouseenter',
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
    closeOnEscPress: boolean('closeOnEscPress', true),
    closeOnContentClick: boolean('closeOnContentClick', false),
    onOpen: action('onOpen'),
    onClose: action('onClose'),
    isOpen: boolean('isOpen', true),
    triggerOn: triggerOn,
    placement: placement,
    header: text('header', ''),
    content: text('content', 'Hello'),
    minWidth: number('minWidth', ''),
    maxWidth: number('maxWidth', ''),
  }

  return (
    <div style={{ padding: '20%', textAlign: 'center' }}>
      <Popover {...props}>
        <div tabIndex="0">Popover Trigger</div>
      </Popover>
    </div>
  )
}

export const RenderProps = () => {
  const props = {
    ...actionLoggerProps,
    renderHeader: () => <Heading>Render header</Heading>,
    renderContent: () => (
      <div>
        <p>
          <Text>My Content</Text>
        </p>
        <button>Close</button>
      </div>
    ),
  }
  return (
    <Popover {...props}>
      <div>Popover Trigger</div>
    </Popover>
  )
}

RenderProps.story = {
  name: 'Render props',
}
