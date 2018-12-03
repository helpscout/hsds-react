import * as React from 'react'
import { storiesOf } from '@storybook/react'
import HelpText from '../src/components/HelpText'

storiesOf('HelpText', module)
  .add('default', () => <HelpText>I am help text. Behold my text.</HelpText>)
  .add('states', () => (
    <div>
      <HelpText>Default</HelpText>
      <br />
      <HelpText state="error">Error</HelpText>
      <br />
      <HelpText state="success">Success</HelpText>
      <br />
      <HelpText state="warning">Warning</HelpText>
      <br />
    </div>
  ))
