import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Heading from '../src/components/Heading'

storiesOf('Heading', module)
  .add('default', () => <Heading>I am heading. Behold my heading.</Heading>)
  .add('sizes', () => (
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
  .add('shades', () => (
    <div>
      <Heading size="small">Small Heading Dark</Heading>
      <br />
      <Heading size="small" light>
        Small Heading Light
      </Heading>
      <br />
    </div>
  ))
