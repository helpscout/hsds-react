import React from 'react'
import { storiesOf } from '@storybook/react'
import EditableField from '../src/components/EditableField'
import ReadMe from '../src/components/EditableField/README.md'

import {
  withKnobs,
  boolean,
  number,
  text,
  select,
} from '@storybook/addon-knobs'
import { jsxDecorator } from 'storybook-addon-jsx'

import styled from '../src/components/styled'
import baseStyles from '../src/styles/resets/baseStyles.css'

const stories = storiesOf('EditableField', module)
  .addParameters({
    options: { showPanel: false, enableShortcuts: false, isFullscreen: false },
    readme: { sidebar: ReadMe },
    a11y: { element: 'c-EditableField' },
  })
  .addDecorator(jsxDecorator)

const FormUI = styled('form')`
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
  <FormUI
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
  </FormUI>
))

stories.add('Text Multiple', () => (
  <FormUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
      label="Films"
      name="films"
      type="text"
      placeholder="Add a film name"
    />
    <EditableField
      label="Musicians"
      name="musicians"
      type="text"
      placeholder="Add a musician name"
      value={['George Harrison', 'Neil Young']}
    />
  </FormUI>
))

stories.add('Email Multiple', () => (
  <FormUI
    onSubmit={e => {
      e.preventDefault()
    }}
  >
    <EditableField
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
  </FormUI>
))

stories.add('Url', () => (
  <FormUI
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
  </FormUI>
))

stories.add('Number', () => (
  <FormUI
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
  </FormUI>
))

stories.add('With options', () => (
  <FormUI
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
  </FormUI>
))

stories.add('With options multiple', () => (
  <FormUI
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
  </FormUI>
))
