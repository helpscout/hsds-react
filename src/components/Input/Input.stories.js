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

export const Autocomplete = () => (
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
)

Autocomplete.story = {
  name: 'autocomplete',
}

export const HelpText = () => (
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
)

HelpText.story = {
  name: 'helpText',
}

export const HintText = () => (
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
)

HintText.story = {
  name: 'hintText',
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

export const PrefixSuffix = () => (
  <div>
    <Input inlinePrefix="$" inlineSuffix=".00" value="Inline Prefix/Suffix" />
  </div>
)

PrefixSuffix.story = {
  name: 'prefix + suffix',
}

export const Prefix = () => (
  <div>
    <Input
      prefix={
        <Button kind="secondary" size="lg" isFirst>
          Prefix
        </Button>
      }
      value="Input Prefix"
    />
  </div>
)

Prefix.story = {
  name: 'prefix',
}

export const Suffix = () => {
  const StatefulButtonUI = ({ children, state = 'default', ...rest }) => (
    <Button className={`is-state-${state}`} {...rest}>
      {children}
    </Button>
  )

  const StatefulButton = styled(Button)`
    &.is-secondary.is-:disabled,
    &.is-secondary[disabled] {
      border-color: ${props =>
        props.state === 'danger' && `${getColor('red.500')} !important`};
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      cursor: not-allowed;
      pointer-events: all;
    }
  `

  return (
    <div>
      <p>
        <Input
          suffix={
            <Button version={2} kind="secondary" size="lg" isLast>
              Suffix
            </Button>
          }
          value="Input Suffix"
        />
      </p>
      <p>
        <Input
          errorMessage="This is incorrect!"
          state="error"
          suffix={
            <StatefulButton
              disabled
              version={2}
              size="lg"
              state="danger"
              kind="secondary"
              isFirst
              isLast
              disabled
            >
              Suffix
            </StatefulButton>
          }
          value="Input Suffix"
        />
      </p>
    </div>
  )
}

Suffix.story = {
  name: 'suffix',
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

export const Value = () => (
  <div>
    <Input autoFocus placeholder="Regular" value="Derek Zoolander" />
  </div>
)

Value.story = {
  name: 'value',
}

let applyCallStopTyping

export const OnStartTyping = () => {
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
}

OnStartTyping.story = {
  name: 'onStartTyping',
}

export const SpecialKeyReturn = () => (
  <div>
    <Input hasInsertCarriageReturns={true} multiline={29} resizable />
  </div>
)

SpecialKeyReturn.story = {
  name: 'special key + return',
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
