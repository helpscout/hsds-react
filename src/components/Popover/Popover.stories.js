import React from 'react'
import PropTypes from 'prop-types'
import { boolean, number, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Text, Popover } from '..'

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
}

RenderProps.story = {
  name: 'Render props',
}
