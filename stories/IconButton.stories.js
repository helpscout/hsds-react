import React from 'react'
import { storiesOf } from '@storybook/react'
import IconButton from '../src/components/IconButton'
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'

const stories = storiesOf('IconButton', module)

stories.addDecorator(
  withArtboard({
    width: 500,
    height: 300,
    withCenterGuides: false,
    showInterface: false,
  })
)

stories.add('Default', () => {
  const props = {
    icon: text('icon', 'search'),
    kind: select(
      'kind',
      {
        primary: 'primary',
        primaryAlt: 'primaryAlt',
        secondary: 'secondary',
        secondaryAlt: 'secondaryAlt',
        default: 'default',
        link: 'link',
      },
      'secondary'
    ),
    size: select(
      'size',
      {
        xl: 'xl',
        lgxl: 'lgxl',
        lg: 'lg',
        md: 'md',
        sm: 'sm',
        xs: 'xs',
      },
      'lg'
    ),
  }
  return <IconButton {...props} />
})
