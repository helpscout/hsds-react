import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button, Icon, Input } from '../src/index.js'

const stories = storiesOf('Input', module)

stories.add('default', () => <Input />)

stories.add('autocomplete', () => (
  <div style={{ width: 300 }}>
    <form autocomplete="on" action="/">
      <Input
        autoFocus
        label="First name"
        name="fname"
        placeholder="Ron"
        type="text"
      />
      <br />
      <Button submit size="sm">
        Submit
      </Button>
    </form>
  </div>
))

stories.add('helpText', () => (
  <div>
    <Input helpText="This text appears below the input" />
    <br />
    <Input
      helpText={
        <div>
          This is custom text <Icon name="emoji" inline />
        </div>
      }
    />
  </div>
))

stories.add('hintText', () => (
  <div>
    <Input hintText="This text appears above the input" />
    <br />
    <Input
      hintText={
        <div>
          This is custom text <Icon name="emoji" inline />
        </div>
      }
    />
  </div>
))

stories.add('multiline', () => (
  <div>
    <Input placeholder="This is an input!" style={{ marginBottom: '5px' }} />
    <Input autoFocus multiline={3} placeholder="This is a textarea!" />
  </div>
))

stories.add('multiline + resizable', () => (
  <Input
    multiline={3}
    resizable
    autoFocus
    placeholder="This is a resizable textarea!"
  />
))

stories.add('multiline + maxHeight', () => (
  <Input
    autoFocus
    multiline={3}
    resizable
    maxHeight={150}
    placeholder="This is a resizable textarea with maxHeight!"
  />
))

stories.add('label', () => <Input label="Labelled" autoFocus />)

stories.add('placeholder', () => <Input placeholder="Hello" autoFocus />)

stories.add('prefix + suffix', () => (
  <Input prefix="$" suffix=".00" autoFocus />
))

stories.add('seamless', () => <Input seamless autoFocus />)

stories.add('disabled', () => <Input disabled autoFocus />)

stories.add('readonly', () => (
  <Input readOnly autoFocus value={`I can't turn left`} />
))

stories.add('states', () => (
  <div>
    <Input state="error" />
    <br />
    <Input
      state="success"
      helpText="You're Awesome!"
      hintText="You're awesome!"
    />
    <br />
    <Input state="warning" removeStateStylesOnFocus />
  </div>
))

stories.add('sizes', () => (
  <div>
    <Input autoFocus placeholder="Regular" />
    <br />
    <Input size="sm" autoFocus placeholder="Small" />
  </div>
))
