import React from 'react'
import styled from 'styled-components'
import { boolean, select, text } from '@storybook/addon-knobs'
import {
  Button,
  ControlGroup,
  Flexy,
  FormGroup,
  Heading,
  Icon,
  Text,
} from '../index'

export default {
  component: Button,
  title: 'Components/Buttons/Button',
}

const ContainerUI = styled('div')`
  background: #f1f3f5;
  padding: 40px;
`

const makeButtonVariations = (props = {}) => {
  return (
    <div>
      <FormGroup>
        <h4>
          {props.kind}.{props.state}
        </h4>
        <h5>Base</h5>
        <Flexy just="left">
          <Button {...props}>Button</Button>
          <Button {...props} isHovered>
            Hover
          </Button>
          <Button {...props} isActive>
            Active
          </Button>
          <Button {...props} isFocused>
            Focused
          </Button>
          <Button {...props} disabled>
            Disabled
          </Button>
        </Flexy>
        <h5>Sizes</h5>
        <Flexy just="left">
          <Button {...props} size="xl">
            Button
          </Button>
          <Button {...props} size="lg">
            Button
          </Button>
          <Button {...props} size="md">
            Button
          </Button>
          <Button {...props} size="sm">
            Button
          </Button>
        </Flexy>
      </FormGroup>
      <br />
      <hr />
      <br />
    </div>
  )
}

export const Default = () => {
  const props = {
    children: text('children', 'Button'),
    disabled: boolean('disabled', false),
    disableOnLoading: boolean('disableOnLoading', true),
    isActive: boolean('isActive', false),
    isBlock: boolean('isBlock', false),
    isLoading: boolean('isLoading', false),
    kind: select(
      'kind',
      {
        primary: 'primary',
        secondary: 'secondary',
        tertiary: 'tertiary',
        default: 'default',
        link: 'link',
      },
      'secondary'
    ),
    size: select(
      'size',
      {
        xl: 'xl',
        lgxl: 'lgxl',
        lg: 'lg',
        md: 'md',
        sm: 'sm',
        xs: 'xs',
      },
      'lg'
    ),
    spinButtonOnLoading: boolean('spinButtonOnLoading', false),
  }
  return <Button {...props} />
}

Default.story = {
  name: 'default',
}

export const Everything = () => (
  <ContainerUI>
    {makeButtonVariations({ kind: 'primary' })}
    {makeButtonVariations({ kind: 'secondary' })}
    {makeButtonVariations({ kind: 'tertiary' })}
    {makeButtonVariations({ kind: 'default' })}
    {makeButtonVariations({ kind: 'link' })}
    {makeButtonVariations({ kind: 'default', state: 'danger' })}
    {makeButtonVariations({ kind: 'primary', state: 'danger' })}
    {makeButtonVariations({ kind: 'primary', state: 'success' })}
    {makeButtonVariations({ kind: 'primary', state: 'warning' })}
  </ContainerUI>
)

Everything.story = {
  name: 'everything',
}

export const ButtonGroup = () => (
  <ContainerUI>
    <ControlGroup>
      <ControlGroup.Item>
        <Button kind="secondary">Button</Button>
      </ControlGroup.Item>
      <ControlGroup.Item>
        <Button kind="secondary">Button</Button>
      </ControlGroup.Item>
      <ControlGroup.Item>
        <Button kind="secondary">Button</Button>
      </ControlGroup.Item>
    </ControlGroup>
  </ContainerUI>
)

ButtonGroup.story = {
  name: 'button-group',
}

export const EndChat = () => (
  <ContainerUI>
    <Flexy>
      <Button kind="primary" shape="rounded" size="sm" state="gray">
        <Text size="11">CLOSED</Text>
        <Icon name="caret-up" size="14" style={{ marginRight: -6 }} />
      </Button>
      <Button kind="primary" shape="rounded" size="sm" state="success">
        <Text size="11">ACTIVE</Text>
        <Icon name="caret-up" size="14" style={{ marginRight: -6 }} />
      </Button>
      <Button kind="primary" shape="rounded" size="sm" state="pending">
        <Text size="11">PENDING</Text>
        <Icon name="caret-up" size="14" style={{ marginRight: -6 }} />
      </Button>
      <Button kind="primary" shape="rounded" size="sm" state="danger">
        <Text size="11">SPAM</Text>
        <Icon name="caret-up" size="14" style={{ marginRight: -6 }} />
      </Button>
    </Flexy>
  </ContainerUI>
)

EndChat.story = {
  name: 'end chat',
}

export const Selector = () => {
  const props = {
    href: select(
      'selector',
      {
        button: '',
        link: '/',
      },
      ''
    ),
  }

  return (
    <Button {...props} size="lg" kind="primary">
      {props.href ? 'Link' : 'Button'}
    </Button>
  )
}

Selector.story = {
  name: 'selector',
}
