import * as React from 'react'
import {
  withKnobs,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Tooltip, { TooltipContext } from '.'

export default {
  component: Tooltip,
  title: 'Components/Tooltip',
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
}

export const WithContextProvider = () => {
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
          <div tabIndex="0">Tooltip Trigger</div>
        </Tooltip>
      </div>
    </TooltipContext.Provider>
  )
}

WithContextProvider.story = {
  name: 'With Context provider',
}
