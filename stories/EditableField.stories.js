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

const InputUI = styled('input')`
  background-color: white;
  border: 0;
  padding: 5px 0;
  font-size: 14px;
  margin-bottom: 30px;
  border-bottom: 1px dashed transparent;

  &:hover {
    cursor: pointer;
    border-bottom: 1px dashed slategray;
  }

  &:focus {
    cursor: initial;
  }
`

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
          <EditableField
            label="Country"
            name="country"
            placeholder="Add a country name"
            type="text"
            value="Mexico"
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

/* <Field
            label="city"
            value={city}
            isEditing={editingField === "city"}
            onFieldFocus={this.handleFieldFocus}
            onKeyUp={this.handleFieldKeyUp}
          />
          <Field
            label="phone"
            value={phone}
            isEditing={editingField === "phone"}
            onFieldFocus={this.handleFieldFocus}
            onKeyUp={this.handleFieldKeyUp}
          />
          <Field
            label="website"
            value={website}
            valueType="link"
            isEditing={editingField === "website"}
            onFieldFocus={this.handleFieldFocus}
            onKeyUp={this.handleFieldKeyUp}
          /> */
