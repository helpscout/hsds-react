import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, select, text } from '@storybook/addon-knobs'
import { withArtboard } from '@helpscout/artboard'
import Heading from '../src/components/Heading'

const stories = storiesOf('Heading', module)
stories.addDecorator(
  withArtboard({ width: 400, height: 200, withCenterGuides: false })
)

stories.add('Default', () => {
  const props = {
    children: text('children', 'Heading'),
    center: boolean('center', false),
    disableSelect: boolean('disableSelect', false),
    light: boolean('light', false),
    linkStyle: boolean('linkStyle', false),
    lineHeightInherit: boolean('lineHeightInherit', false),
    lineHeightReset: boolean('lineHeightReset', false),
    noWrap: boolean('noWrap', false),
    size: select(
      'size',
      {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
      },
      'h1'
    ),
    truncate: boolean('truncate', false),
    wordWrap: boolean('wordWrap', false),
  }
  return <Heading {...props} />
})

stories.add('sizes', () => (
  <div>
    <Heading size="h1">Font size: h1</Heading>
    <br />
    <Heading size="h2">Font size: h2</Heading>
    <br />
    <Heading size="h3">Font size: h3</Heading>
    <br />
    <Heading size="h4">Font size: h4</Heading>
    <br />
    <Heading size="h5">Font size: h5</Heading>
    <br />
    <Heading size="h6">Font size: h6</Heading>
    <br />
    <Heading size="big">Font size: Big</Heading>
    <br />
    <Heading size="small">Font size: Small</Heading>
    <br />
  </div>
))

stories.add('shades', () => (
  <div>
    <Heading size="small">Small Heading Dark</Heading>
    <br />
    <Heading size="small" light>
      Small Heading Light
    </Heading>
    <br />
  </div>
))
