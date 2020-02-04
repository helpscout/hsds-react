import * as React from 'react'
import { storiesOf } from '@storybook/react'
import HelpText from '.'

storiesOf('Components/HelpText', module)
  .add('default', () => <HelpText>I am help text. Behold my text.</HelpText>)
  .add('states', () => (
    <div>
      <HelpText>
        <strong>Default</strong>
      </HelpText>
      <br />
      <HelpText state="error">
        <strong>Error</strong>
      </HelpText>
      <br />
      <HelpText state="success">
        <strong>Success</strong>
      </HelpText>
      <br />
      <HelpText state="warning">
        <strong>Warning</strong>
      </HelpText>
      <br />
    </div>
  ))
  .add('states with string children', () => (
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
