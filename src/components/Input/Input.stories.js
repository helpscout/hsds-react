import React from 'react'
import styled from 'styled-components'
import { action } from '@storybook/addon-actions'
import { boolean, select, text } from '@storybook/addon-knobs'
import { getColor } from '../../styles/utilities/color'
import { Button, Flexy, Icon, Input } from '../index'

export default {
  component: Input,
  title: 'Components/Forms/Input',
}

export const Default = () => {
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
}

export const Multiline = () => (
  <div>
    <Input placeholder="This is an input!" style={{ marginBottom: '5px' }} />
    <Input
      autoFocus
      multiline={3}
      placeholder="This is a textarea!"
      onResize={() => console.log('Resize')}
    />
  </div>
)

Multiline.story = {
  name: 'multiline',
}

export const MultilineCharValidation = () => (
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
)

MultilineCharValidation.story = {
  name: 'multiline + char validation',
}

export const MultilineResizable = () => (
  <Input
    multiline={3}
    resizable
    autoFocus
    placeholder="This is a resizable textarea!"
  />
)

MultilineResizable.story = {
  name: 'multiline + resizable',
}

export const MultilineMaxHeight = () => (
  <Input
    autoFocus
    multiline={3}
    resizable
    maxHeight={160}
    placeholder="This is a resizable textarea with maxHeight!"
    offsetAmount={8}
  />
)

MultilineMaxHeight.story = {
  name: 'multiline + maxHeight',
}

export const MultilinePaddedBottom = () => (
  <PaddedTextArea>
    <Input
      autoFocus
      multiline={3}
      resizable
      maxHeight={160}
      placeholder="This one has a 30px bottom padding. Pressing enter for the last line preserves this spacing!"
    />
  </PaddedTextArea>
)

MultilinePaddedBottom.story = {
  name: 'multiline + padded bottom',
}

export const Label = () => <Input label="Labelled" autoFocus />

Label.story = {
  name: 'label',
}

export const Placeholder = () => <Input placeholder="Hello" autoFocus />

Placeholder.story = {
  name: 'placeholder',
}

export const Seamless = () => <Input seamless autoFocus />

Seamless.story = {
  name: 'seamless',
}

export const Disabled = () => <Input disabled />

Disabled.story = {
  name: 'disabled',
}

export const Readonly = () => (
  <Input readOnly autoFocus value={`I can't turn left`} />
)

Readonly.story = {
  name: 'readonly',
}

export const States = () => (
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
)

States.story = {
  name: 'states',
}

export const StateError = () => (
  <div>
    <div style={{ width: 100 }}>
      <Input state="error" errorMessage="This is incorrect!" />
    </div>
    <br />
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
)

StateError.story = {
  name: 'state: error',
}

export const Scrollock = () => (
  <Input
    multiline={3}
    resizable
    autoFocus
    scrollLock
    placeholder="This is a resizable textarea with scrollLock!"
    maxHeight={150}
  />
)

Scrollock.story = {
  name: 'scrollock',
}

export const Sizes = () => (
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
)

Sizes.story = {
  name: 'sizes',
}

const PaddedTextArea = styled('div')`
  textarea {
    padding-bottom: 30px !important;
  }
`

export const Action = () => {
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
              <Button kind="primary" size="sm" disabled={this.state.isDisabled}>
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
              <Button kind="primary" size="xs" disabled={this.state.isDisabled}>
                Apply
              </Button>
            }
          />
        </div>
      )
    }
  }

  return <Example />
}

export const MultiAction = () => {
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
            <Button kind="primary" size="sm">
              Apply
            </Button>
          </Flexy.Item>
          <Flexy.Item>
            <Button kind="secondary" size="sm">
              Cancel
            </Button>
          </Flexy.Item>
        </Flexy>
      }
    />
  )
}

MultiAction.story = {
  name: 'Multi-Action',
}
