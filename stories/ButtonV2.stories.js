import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Button,
  ControlGroup,
  Flexy,
  FormGroup,
  Icon,
  PropProvider,
} from '../src/index.js'
import styled from '../src/components/styled'

const stories = storiesOf('Button/V2', module)

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
          <Button {...props} isFocused>
            Focused
          </Button>
          <Button {...props} disabled>
            Disabled
          </Button>
        </Flexy>
        <h5>Sizes</h5>
        <Flexy just="left">
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

stories.add('default', () => (
  <Button kind="secondary" version={2}>
    Button
  </Button>
))

stories.add('everything', () => (
  <PropProvider value={{ Button: { version: 2 } }}>
    <ContainerUI>
      {makeButtonVariations({ kind: 'primary' })}
      {makeButtonVariations({ kind: 'secondary' })}
      {makeButtonVariations({ kind: 'secondaryAlt' })}
      {makeButtonVariations({ kind: 'default' })}
      {makeButtonVariations({ kind: 'link' })}
      {makeButtonVariations({ kind: 'default', state: 'danger' })}
      {makeButtonVariations({ kind: 'primary', state: 'danger' })}
      {makeButtonVariations({ kind: 'primary', state: 'success' })}
    </ContainerUI>
  </PropProvider>
))

stories.add('button-group', () => (
  <PropProvider value={{ Button: { version: 2 } }}>
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
  </PropProvider>
))

stories.add('icon', () => (
  <PropProvider value={{ Button: { version: 2 } }}>
    <ContainerUI>
      <Flexy>
        <Button kind="secondary">
          <Icon />
          Words
        </Button>
        <Button kind="secondary">
          Words
          <Icon />
        </Button>
      </Flexy>
    </ContainerUI>
  </PropProvider>
))
