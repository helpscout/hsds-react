import React, { useState } from 'react'
import { boolean, number, select, text } from '@storybook/addon-knobs'
import Tooltip, { TooltipContext } from '.'
import Text from '../Text'
import Button from '../Button'

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
      right: 'right',
      bottom: 'bottom',
      left: 'left',
      'auto-start': 'auto-start',
      'auto-end': 'auto-end',
      'right-start': 'right-start',
      'right-end': 'right-end',
      'left-start': 'left-start',
      'left-end': 'left-end',
      'bottom-start': 'bottom-start',
      'bottom-end': 'bottom-end',
      'top-start': 'top-start',
      'top-end': 'top-end',
    },
    'top'
  )

  const props = {
    animationDelay: number('animationDelay', 100),
    animationDuration: number('animationDuration', 100),
    closeOnEscPress: boolean('closeOnEscPress', true),
    isOpen: boolean('isOpen', true),
    triggerOn: triggerOn,
    placement: placement,
    title: text('title', '"Hello"'),
    minWidth: number('minWidth', ''),
    maxWidth: number('maxWidth', ''),
    withArrow: boolean('withArrow', true),
  }

  return (
    <TooltipContext.Provider value={{ zIndex: 256 }}>
      <div style={{ padding: '20%', textAlign: 'center' }}>
        <Tooltip {...props}>Tooltip Trigger V2</Tooltip>
      </div>
    </TooltipContext.Provider>
  )
}

export const CustomContent = () => {
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
      'auto-start': 'auto-start',
      'auto-end': 'auto-end',
      'right-start': 'right-start',
      'right-end': 'right-end',
      'left-start': 'left-start',
      'left-end': 'left-end',
      'bottom-start': 'bottom-start',
      'bottom-end': 'bottom-end',
      'top-start': 'top-start',
      'top-end': 'top-end',
    },
    'top'
  )

  const tooltipContent = (
    <Text>
      Hello there. <strong>This is really important!</strong>
      <Button kind="primary" size="sm" state="grey">
        Learn More
      </Button>
    </Text>
  )

  const props = {
    animationDelay: number('animationDelay', 100),
    animationDuration: number('animationDuration', 100),
    closeOnEscPress: boolean('closeOnEscPress', true),
    isOpen: boolean('isOpen', true),
    triggerOn: triggerOn,
    placement: placement,
    title: tooltipContent,
    minWidth: number('minWidth', ''),
    maxWidth: number('maxWidth', ''),
  }

  return (
    <TooltipContext.Provider value={{ zIndex: 256 }}>
      <div style={{ padding: '20%', textAlign: 'center' }}>
        <Tooltip {...props}>Tooltip Trigger</Tooltip>
      </div>
    </TooltipContext.Provider>
  )
}

export const ControlledTooltip = () => {
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)

  return (
    <TooltipContext.Provider value={{ zIndex: 256 }}>
      <div style={{ padding: '20%', textAlign: 'center' }}>
        <p>
          <Tooltip visible={visible} title="Hello">
            Tooltip Trigger
          </Tooltip>
        </p>
        <p>
          <Button onClick={toggle}>toggle tooltip</Button>
        </p>
      </div>
    </TooltipContext.Provider>
  )
}
