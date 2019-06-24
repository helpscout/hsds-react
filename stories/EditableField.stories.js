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

const stories = storiesOf('EditableField', module)
  .addParameters({
    options: { showPanel: false, enableShortcuts: false, isFullscreen: true },
    readme: { sidebar: ReadMe },
    a11y: { element: 'c-EditableField' },
  })
  .addDecorator(jsxDecorator)

const FormUI = styled('form')`
  width: 200px;
  padding: 20px;
  background-color: white;
  margin: 10px auto;
  border: 1px solid rgba(155, 155, 195, 0.4);
  border-radius: 3px;
`

const PHONE_OPTIONS = ['Home', 'Work']

class EditableFieldApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      multipleInputValue: ['Juan', 'Pablo'],
      singleInputValue: 'Help Scout',
    }
  }

  render() {
    const { multipleInputValue, singleInputValue } = this.state

    return (
      <div className="EditableFieldApp">
        <h1>Inline Edit</h1>
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
            value={singleInputValue}
            actions={{
              name: 'delete',
              callback(obj) {
                // console.log('HSDS: EditableFieldApp -> callback -> obj', obj)
              },
            }}
          />
          {/* <EditableField
            label="Country"
            name="country"
            placeholder="Add a country name"
            type="text"
            value="Mexico"
          /> */}
          <EditableField
            label="Mobile Phone"
            name="mobile"
            placeholder="Add mobile phone"
            type="tel"
            valueOptions={PHONE_OPTIONS}
            defaultOption={PHONE_OPTIONS[0]}
            value={{ option: 'Home', value: '938438383' }}
          />
          <EditableField
            label="Phone"
            name="Phone"
            placeholder="Add phone"
            type="tel"
            valueOptions={PHONE_OPTIONS}
            defaultOption={PHONE_OPTIONS[1]}
            value={[{ option: 'Home', value: '123456789' }]}
          />
          <EditableField
            label="Website"
            name="website"
            placeholder="Add a city name"
            type="url"
            value="http://mysite.net"
            actions={{
              name: 'link',
              callback(obj) {
                console.log('HSDS: EditableFieldApp -> callback -> obj', obj)
              },
            }}
          />
          <EditableField
            label="Names"
            name="names"
            type="text"
            placeholder="Add a name"
            value={multipleInputValue}
            actions={[
              {
                name: 'delete',
                callback(obj) {
                  // console.log('HSDS: EditableFieldApp -> callback -> obj', obj)
                },
              },
            ]}
          />
        </FormUI>
      </div>
    )
  }
}

stories.add('Default', () => <EditableFieldApp />)
