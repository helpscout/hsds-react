import React from 'react'
import { boolean, number, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Tooltip, { TooltipContext } from '.'

export default {
  component: Tooltip,
  title: 'Components/Overlay/TooltipV2',
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
    <TooltipContext.Provider value={{ zIndex: 256 }}>
      <div style={{ padding: '20%', textAlign: 'center' }}>
        <Tooltip {...props}>Tooltip Trigger V2</Tooltip>
      </div>
    </TooltipContext.Provider>
  )
}
