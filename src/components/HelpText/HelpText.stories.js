import * as React from 'react'
import HelpText from '.'

export default {
  component: HelpText,
  title: 'Components/HelpText',
}

export const Default = () => (
  <HelpText>I am help text. Behold my text.</HelpText>
)

Default.story = {
  name: 'default',
}

export const States = () => (
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
)

States.story = {
  name: 'states',
}

export const StatesWithStringChildren = () => (
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
)

StatesWithStringChildren.story = {
  name: 'states with string children',
}
