import React from 'react'
import { storiesOf } from '@storybook/react'
import { withArtboard } from '@helpscout/artboard'
import { boolean, text } from '@storybook/addon-knobs'
import { Link } from '../index'

const stories = storiesOf('Link', module)

stories.addDecorator(
  withArtboard({ width: 300, height: 100, withCenterGuides: false })
)

stories.add('Default', () => {
  const props = {
    children: text('Content', 'Linky'),
    href: text('href', 'https://github.com/helpscout/hsds-react'),
    voidOnClick: boolean('voidOnClick', false),
  }

  return <Link {...props} />
})
