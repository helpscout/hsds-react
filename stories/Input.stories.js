import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { boolean, select, text } from '@storybook/addon-knobs'
import InputReadme from '../src/components/Input/README.md'
import { jsxDecorator } from 'storybook-addon-jsx'
import { Button, Flexy, Icon, Input, styled } from '../src/index'

const stories = storiesOf('Input', module)

stories.addDecorator(jsxDecorator)
stories.addParameters({
  readme: { sidebar: InputReadme },
})

stories.add('Default', () => {
  const props = {
    onEnterDown: action('onEnterDown'),
    onEnterUp: action('onEnterUp'),
    onKeyDown: action('onKeyDown'),
    onKeyUp: action('onKeyUp'),
    label: text('label', 'Label'),
    hintText: text('hintText', ''),
    helpText: text('helpText', ''),
    placeholder: text('placeholder', 'Placeholder'),
    size: select(
      'size',
      {
        lg: 'lg',
        md: 'md',
        sm: 'sm',
        xssm: 'xssm',
        xs: 'xs',
      },
      'md'
    ),
    state: select(
      'state',
      {
        default: 'default',
        error: 'error',
        success: 'success',
        warning: 'warning',
      },
      'default'
    ),
    removeStateStylesOnFocus: boolean('removeStateStylesOnFocus', false),
    errorMessage: text('errorMessage', ''),
    inlinePrefix: text('inlinePrefix', ''),
    inlineSuffix: text('inlineSuffix', ''),
  }
  return <Input {...props} />
})

stories.add('autocomplete', () => (
  <div style={{ width: 300 }}>
    <form autoComplete="on" action="/">
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
    <Input
      autoFocus
      multiline={3}
      placeholder="This is a textarea!"
      onResize={() => console.log('Resize')}
    />
  </div>
))

stories.add('multiline + char validation', () => (
  <div style={{ width: 300 }}>
    <Input
      autoFocus
      multiline={3}
      placeholder="Show at char validation at 5, turn to yellow at 2, turn to red at 0 chars"
      withCharValidator={true}
      charValidatorLimit={10}
      resizable
    />
    <br />
    <Input
      autoFocus
      multiline={3}
      placeholder="Show at char validation at 50, turn to yellow at 20, turn to red at 0 chars"
      withCharValidator={true}
      charValidatorLimit={105}
      resizable
    />
    <br />
    <Input
      autoFocus
      multiline={3}
      placeholder="Show at char validation at 250, turn to yellow at 400, turn to red at 0 chars"
      withCharValidator={true}
      charValidatorLimit={512}
      resizable
    />
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
    maxHeight={160}
    placeholder="This is a resizable textarea with maxHeight!"
    offsetAmount={8}
  />
))

stories.add('multiline + padded bottom', () => (
  <PaddedTextArea>
    <Input
      autoFocus
      multiline={3}
      resizable
      maxHeight={160}
      placeholder="This one has a 30px bottom padding. Pressing enter for the last line preserves this spacing!"
    />
  </PaddedTextArea>
))

stories.add('label', () => <Input label="Labelled" autoFocus />)

stories.add('placeholder', () => <Input placeholder="Hello" autoFocus />)

stories.add('prefix + suffix', () => (
  <div>
    <Input inlinePrefix="$" inlineSuffix=".00" value="Inline Prefix/Suffix" />
  </div>
))

stories.add('prefix', () => (
  <div>
    <Input
      prefix={
        <Button version={2} kind="secondary" size="lg" isFirst>
          Prefix
        </Button>
      }
      value="Input Prefix"
    />
  </div>
))

stories.add('suffix', () => (
  <div>
    <Input
      suffix={
        <Button version={2} kind="secondary" size="lg" isLast>
          Suffix
        </Button>
      }
      value="Input Suffix"
    />
  </div>
))

stories.add('seamless', () => <Input seamless autoFocus />)

stories.add('disabled', () => <Input disabled autoFocus />)

stories.add('readonly', () => (
  <Input readOnly autoFocus value={`I can't turn left`} />
))

stories.add('states', () => (
  <div>
    <Input autoComplete="off" state="error" placeholder="Error" />
    <br />
    <Input
      autoComplete="off"
      state="success"
      placeholder="Success"
      helpText="You're Awesome!"
      hintText="You're awesome!"
    />
    <br />
    <Input autoComplete="off" state="warning" placeholder="Warning" />
    <br />
    <Input
      autoComplete="off"
      state="warning"
      placeholder="State styles will remove on focus"
      removeStateStylesOnFocus
    />
  </div>
))

stories.add('state: error', () => (
  <div>
    <Input state="error" errorMessage="This is incorrect!" />
    <br />
    <Input state="error" inlineSuffix=".00" errorMessage="This is incorrect!" />
    <br />
    <Input state="error" size="sm" errorMessage="This is incorrect!" />
    <br />
    <Input
      state="error"
      errorMessage="This is incorrect!"
      multiline={3}
      maxHeight={180}
    />
    <br />
    <Input seamless state="error" size="sm" errorMessage="This is incorrect!" />
  </div>
))

stories.add('scrollock', () => (
  <Input
    multiline={3}
    resizable
    autoFocus
    scrollLock
    placeholder="This is a resizable textarea with scrollLock!"
    maxHeight={150}
  />
))

stories.add('sizes', () => (
  <div>
    <Input autoFocus placeholder="Regular" />
    <br />
    <Input size="sm" placeholder="Small" />
    <br />
    <Input
      multiline={3}
      resizable
      placeholder="This is a resizable textarea with scrollLock!"
      maxHeight={150}
    />
  </div>
))

stories.add('value', () => (
  <div>
    <Input autoFocus placeholder="Regular" value="Derek Zoolander" />
  </div>
))

let applyCallStopTyping

stories.add('onStartTyping', () => {
  return (
    <div>
      <Input
        autoFocus
        onStartTyping={() => console.log('typing started')}
        onStopTyping={() => console.log('typing stopped')}
        placeholder="Regular"
        refApplyCallStopTyping={fn => (applyCallStopTyping = fn)}
        typingTimeoutDelay={4000}
        withTypingEvent={true}
      />
      <Button onClick={() => applyCallStopTyping()}>Apply Stop Typing</Button>
    </div>
  )
})

stories.add('special key + return', () => (
  <div>
    <Input hasInsertCarriageReturns={true} multiline={29} resizable />
  </div>
))

const PaddedTextArea = styled('div')`
  textarea {
    padding-bottom: 30px !important;
  }
`

stories.add('Action', () => {
  const error = boolean('error', false)
  const state = error ? 'error' : null

  class Example extends React.Component {
    state = {
      isDisabled: true,
      value: '',
    }

    onChange = value => {
      this.setState({
        value,
        isDisabled: !value,
      })
    }

    render() {
      return (
        <div style={{ width: 300 }}>
          <Input
            autoFocus
            label="Zip Code (Default Size, md)"
            name="zip"
            placeholder="Zip Code"
            type="text"
            onChange={this.onChange}
            value={this.state.value}
            state={state}
            action={
              <Button
                version={2}
                kind="primary"
                size="sm"
                disabled={this.state.isDisabled}
              >
                Apply
              </Button>
            }
          />
          <br />
          <Input
            autoFocus
            label="Zip Code (Small Size, sm)"
            name="zip"
            placeholder="Zip Code"
            type="text"
            onChange={this.onChange}
            value={this.state.value}
            size="sm"
            state={state}
            action={
              <Button
                version={2}
                kind="primary"
                size="xs"
                disabled={this.state.isDisabled}
              >
                Apply
              </Button>
            }
          />
        </div>
      )
    }
  }

  return <Example />
})

stories.add('Multi-Action', () => {
  return (
    <Input
      autoFocus
      label="Zip Code"
      name="zip"
      placeholder="Zip Code"
      type="text"
      action={
        <Flexy gap="xs">
          <Flexy.Item>
            <Button version={2} kind="primary" size="sm">
              Apply
            </Button>
          </Flexy.Item>
          <Flexy.Item>
            <Button version={2} kind="secondary" size="sm">
              Cancel
            </Button>
          </Flexy.Item>
        </Flexy>
      }
    />
  )
})
