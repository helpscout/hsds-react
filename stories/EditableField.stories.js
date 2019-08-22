import React from 'react'
import { storiesOf } from '@storybook/react'
import EditableField from '../src/components/EditableField'

import { action } from '@storybook/addon-actions'
import { jsxDecorator } from 'storybook-addon-jsx'
import ReadMe from '../src/components/EditableField/docs/README.md'

import styled from '../src/components/styled'
import baseStyles from '../src/styles/resets/baseStyles.css'
import { withAktiv } from './utils'

const stories = storiesOf('EditableField', module)
  .addParameters({
    options: { showPanel: false, enableShortcuts: false, isFullscreen: false },
    readme: { sidebar: ReadMe },
    a11y: { element: 'c-EditableField' },
  })
  .addDecorator(withAktiv)
  .addDecorator(jsxDecorator)

export const ContainerUI = styled('div')`
  ${baseStyles};
  width: 300px;
  padding: 20px;
  background-color: white;
  margin: 10px auto;
  border: 1px solid rgba(155, 155, 195, 0.4);
  border-radius: 3px;
`

const NoteUI = styled('div')`
  width: 100%;
  padding: 20px;
  background-color: rgba(155, 155, 195, 0.1);
  margin: 20px auto;
  border: 1px solid #6bc0ff;
  border-radius: 3px;
  color: rgba(155, 155, 195, 1);

  p {
    margin: 0 0 20px 0;

    &:last-child {
      margin: 0;
    }
  }
`

const PHONE_OPTIONS = ['Home', 'Work', 'Other']
const PAINT_OPTIONS = ['Acrylics', 'Oil', 'Pastels', 'Watercolour', 'Other']

stories.add('Text', () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Company"
      name="company"
      placeholder="Add a company name"
      type="text"
    />
    <EditableField
      label="Team"
      name="team"
      placeholder="Add a sports team name"
      type="text"
      value="Atlas"
    />
  </ContainerUI>
))

stories.add('Text large', () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Team"
      name="team"
      placeholder="Add a sports team name"
      size="lg"
      type="text"
      value="Barcelona FC"
    />
  </ContainerUI>
))

stories.add('Text Multiple', () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Films"
      name="films"
      type="text"
      multipleValues
      placeholder="Add a film name"
    />
    <EditableField
      label="Musicians"
      name="musicians"
      type="text"
      placeholder="Add a musician name"
      value={['George Harrison', 'Neil Young']}
    />
  </ContainerUI>
))

stories.add('Text Multiple Large', () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Musicians"
      name="musicians"
      type="text"
      placeholder="Add a musician name"
      size="lg"
      value={['George Harrison', 'Neil Young']}
    />
  </ContainerUI>
))

stories.add('Email Multiple', () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      emphasizeTopValue
      label="Emails"
      name="email"
      placeholder="Add your email"
      type="email"
      value={[
        'art_vandelay@vandelayindustries.com',
        'john_locke@dharma.org',
        'pennypacker@kramerica.com',
        'this_is_kind_of_long@annoyingemails.com',
        'this_is_kind_of_long@evenmoreannoyingemails.com',
      ]}
    />
  </ContainerUI>
))

stories.add('Url', () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Website"
      name="website"
      placeholder="Add a website address"
      type="url"
      value="http://mysite.net"
      actions={{
        name: 'link',
        callback(obj) {
          console.log('HSDS: EditableFieldApp -> callback -> obj', obj)
        },
      }}
    />
  </ContainerUI>
))

stories.add('Number', () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <NoteUI>
      <p>
        There is no special handling of inputs of type "number", other than
        removing the little up/down buttons that browsers add.
      </p>
      <p>Using the up/down keys and scrolling still work as expected</p>
    </NoteUI>
    <EditableField
      label="Amount"
      name="amount"
      placeholder="Add the amount"
      type="number"
      value="166"
    />
  </ContainerUI>
))

stories.add('With options', () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Mobile Phone"
      name="mobilephone"
      placeholder="Add a mobile phone"
      type="tel"
      valueOptions={PHONE_OPTIONS}
    />

    <EditableField
      label="Phone"
      name="Phone"
      placeholder="Add phone"
      type="tel"
      valueOptions={PHONE_OPTIONS}
      defaultOption={PHONE_OPTIONS[2]}
      value={{ option: 'Work', value: '123456789' }}
    />
  </ContainerUI>
))

stories.add('With options large', () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Phone"
      name="Phone"
      placeholder="Add phone"
      size="lg"
      type="tel"
      valueOptions={PHONE_OPTIONS}
      defaultOption={PHONE_OPTIONS[2]}
      value={{ option: 'Work', value: '123456789' }}
    />
  </ContainerUI>
))

stories.add('With options multiple', () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Favourite Paint Colour"
      name="paint"
      placeholder="Add a colour"
      type="text"
      valueOptions={PAINT_OPTIONS}
      value={[
        { option: PAINT_OPTIONS[0], value: 'Anthraquinone Blue PB60' },
        { option: PAINT_OPTIONS[3], value: 'Ultramarine Violet' },
        { option: PAINT_OPTIONS[1], value: 'Bismuth Yellow' },
      ]}
    />
  </ContainerUI>
))

stories.add('Disabled', () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Film"
      name="film"
      placeholder="Add a film name"
      type="text"
      disabled
    />
    <EditableField
      label="Company"
      name="company"
      placeholder="Add a company name"
      type="text"
      value="Help Scout"
      disabled
    />
    <EditableField
      label="Musicians"
      name="musicians"
      type="text"
      placeholder="Add a musician name"
      value={['George Harrison', 'Neil Young']}
      disabled
    />
    <EditableField
      label="Phone"
      name="Phone"
      placeholder="Add phone"
      type="tel"
      valueOptions={PHONE_OPTIONS}
      defaultOption={PHONE_OPTIONS[2]}
      value={{ option: 'Work', value: '123456789' }}
      disabled
    />
  </ContainerUI>
))

stories
  .addParameters({
    options: { showPanel: true },
  })
  .add('Events', () => (
    <ContainerUI
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <NoteUI>
        This is pretty slow because all the event callbacks in the world are
        being passed...! This would be <strong>extremely</strong> rare, and it
        might mean that most likely something is wrong
      </NoteUI>
      <EditableField
        label="Favourite Paint Colour"
        name="paint"
        placeholder="Add a colour"
        type="text"
        valueOptions={PAINT_OPTIONS}
        value={[
          { option: PAINT_OPTIONS[0], value: 'Anthraquinone Blue PB60' },
          { option: PAINT_OPTIONS[3], value: 'Ultramarine Violet' },
          { option: PAINT_OPTIONS[1], value: 'Bismuth Yellow' },
        ]}
        onInputFocus={action('onInputFocus')}
        onInputBlur={action('onInputBlur')}
        onInputChange={action('onInputChange')}
        onOptionFocus={action('onOptionFocus')}
        onChange={action('onChange')}
        onCommit={action('onCommit')}
        onEnter={action('onEnter')}
        onEscape={action('onEscape')}
        onDelete={action('onDelete')}
        onAdd={action('onAdd')}
        onDiscard={action('onDiscard')}
        onOptionChange={action('onOptionChange')}
      />
    </ContainerUI>
  ))

stories.add('Validation', () => (
  <ContainerUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Company"
      name="company"
      placeholder="Add a company name"
      type="text"
      validate={validateFieldValue}
    />
    <EditableField
      label="Films"
      name="films"
      type="text"
      multipleValues
      placeholder="Add a film name"
      validate={validateFieldValue}
    />
  </ContainerUI>
))

function validateFieldValue({ name, value }) {
  console.log('Validating')

  let isValid = value === 'help scout'

  return new Promise(resolve => {
    setTimeout(function() {
      if (isValid) {
        resolve({ isValid, name, value })
      } else {
        resolve({
          isValid,
          name,
          value,
          type: 'error',
          message:
            value === ''
              ? "The company name can't be empty"
              : 'That is definitely not right',
          color: value === '' ? 'rebeccapurple' : 'salmon',
          icon: value === '' ? 'activity' : 'alert',
        })
      }
    }, 500)
  })
}
