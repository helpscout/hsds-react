# EditableField

A special type of inputs that allow you to edit it inline

## Example

```jsx
<EditableField
  label="Team"
  name="team"
  placeholder="Add a sports team name"
  type="text"
  value="00001111222233334444555566667777"
/>
```

```jsx
<EditableField
  label="Musicians"
  name="musicians"
  type="text"
  placeholder="Add a musician name"
  value={['George Harrison', 'Neil Young']}
/>
```

```jsx
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
```

```jsx
<EditableField
  label="Musicians"
  name="musicians"
  type="text"
  placeholder="Add a musician name"
  value={['George Harrison', 'Neil Young']}
  onCommit={action('onCommit')}
  validate={({ name, value }) => {
    const isValid = isGoodMusician(value)

    return new Promise(resolve => {
      if (isValid) {
        resolve({ isValid, name, value })
      } else {
        resolve({
          isValid,
          name,
          value,
          type: 'error',
          message: 'That is definitely not right',
        })
      }
    })
  }}
/>
```

## Props

| Prop               | Type                                                           | Default                                    | Description                                                                                                                                                                                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| actions?:          | FieldAction, FieldAction[], null                               | `undefined`                                | See below                                                                                                                                                                                                                                                                                                                                                    |
| className?:        | string                                                         | `"c-EditableField"`                        | The className of the component.                                                                                                                                                                                                                                                                                                                              |
| emphasizeTopValue: | boolean                                                        | `false`                                    | In multi-value fields, bold the first value (to visually denote the default value, on a list of emails for example)                                                                                                                                                                                                                                          |
| defaultOption?:    | string                                                         | `undefined`                                | If the EditableField is “option-enabled” by using the valueOptions array, the user can provide which of the options should be the default, if non provided, EditableField will choose the first option in the valueOptions array.                                                                                                                            |
| disabled:          | boolean                                                        | `false`                                    | Disable the field                                                                                                                                                                                                                                                                                                                                            |
| label?:            | string                                                         | `name` value                               | The text for the EditableField label                                                                                                                                                                                                                                                                                                                         |
| multipleValues:    | boolean                                                        | `false`                                    | If you want to force a multi-value field, set this to `true`                                                                                                                                                                                                                                                                                                 |
| name:              | string                                                         | `undefined`                                | The **unique** identifier for the EditableField - Ties label with input - Used to generate React `keys` - Used to manage correct handling (adding, deleting, editing) of multiple-value fields                                                                                                                                                               |
| placeholder?:      | string                                                         | `""`                                       | Text for the placholder                                                                                                                                                                                                                                                                                                                                      |
| size               | string                                                         | `"md"`                                     | Default is "md", pass "lg" for the large option.                                                                                                                                                                                                                                                                                                             |
| type:              | FieldType                                                      | `"text"`                                   | The type of field, initially one of 'text', 'email', 'url', 'tel' , 'number’                                                                                                                                                                                                                                                                                 |
| value:             | Value                                                          | `""`                                       | Initial value for the EditableField, user will normally provide a string or array of strings (in case multi-value enabled fields) which internally get converted to `FieldValues`                                                                                                                                                                            |
| valueOptions?:     | string[], Option[]                                             | `undefined`                                | When the user wants a field with “options” (like “home”, “work” options for phone numbers) she passes an array of strings with the available options. EditableField will make sure to show the appropriate dropdown. The array of strings internally gets converted to an array of `Option`. `Option` type is the same as what Dropdown V2 accepts as items. |
| validate:          | (args: { value: string; name: string }) => Promise<Validation> | `() => Promise.resolve({ isValid: true })` | Function that validates the value, should always return a Promise that resolves to a Validation type                                                                                                                                                                                                                                                         |
| innerRef:          | (node: HTMLElement) => void                                    | `noop function`                            | Retrieve the inner DOM node.                                                                                                                                                                                                                                                                                                                                 |
| onInputFocus:      | (args: { name: string; value: Value; event: Event }) => void   | `noop function`                            | Fired when the input is focused                                                                                                                                                                                                                                                                                                                              |
| onInputBlur:       | (args: { name: string; value: Value; event: Event }) => void   | `noop function`                            | Fired when the input is blurred                                                                                                                                                                                                                                                                                                                              |
| onInputChange:     | (args: { name: string; value: Value; event: Event }) => void   | `noop function`                            | Fires when the input changes                                                                                                                                                                                                                                                                                                                                 |
| onOptionFocus:     | (args: { name: string; value: Value; event: Event }) => void   | `noop function`                            | Fired when the option trigger is focused                                                                                                                                                                                                                                                                                                                     |
| onOptionChange:    | (args: { name: string; value: Value; event: Event }) => void   | `noop function`                            | Fires when an option is changed/selected                                                                                                                                                                                                                                                                                                                     |
| onChange:          | (args: { name: string; value: Value; event?: Event }) => void  | `noop function`                            | Fires when either the input or an option is changed                                                                                                                                                                                                                                                                                                          |
| onEnter:           | (args: { name: string; value: Value; event: Event }) => void   | `noop function`                            | Fires when Enter is pressed on the input                                                                                                                                                                                                                                                                                                                     |
| onEscape:          | (args: { name: string; value: Value; event: Event }) => void   | `noop function`                            | Fires when Escape is pressed on the input                                                                                                                                                                                                                                                                                                                    |
| onAdd:             | (args: { name: string; value: Value }) => void                 | `noop function`                            | Fires when a value is added on multi-value fields                                                                                                                                                                                                                                                                                                            |
| onCommit:          | (args: { name: string; value: Value }) => void                 | `noop function`                            | Fires when a change is “saved” (see below)                                                                                                                                                                                                                                                                                                                   |
| onDelete:          | (args: { name: string; value: Value; event: Event }) => void   | `noop function`                            | Fires on clearing or deleting a value (see below)                                                                                                                                                                                                                                                                                                            |
| onDiscard:         | (args: { value: Value }) => void                               | `noop function`                            | Fires on discarding a value (see below)                                                                                                                                                                                                                                                                                                                      |

### actions

- Predefined actions:
  - `"delete"`: Clear a field
  - `"link"`: For url types, adds a button to open a new tab/window with the url
- By default `EditableField` incorporates one action: “delete”
- To override either of the predefined actions, pass them in the array using the same action name
- If the user doesn’t want any action, she needs to explicitly pass `null`
- `icon` should be the name of an Icon that is present in HSDS

### onCommit

Fires:

- On pressing Enter on the Input
- On input blur
- On selecting an option
- On deleting/clearing the input value with “x”
- On deleting a value from multi-value fields

### onDelete

Fires:

- On deleting/clearing the input value with “x”
- On deleting a value from multi-value fields

### onDiscard

Fires:

- On pressing ESC on an input
- On adding a value and clicking outside the field and the value is empty

### disabled

To disable the entire field, use the `disabled` prop, to disable a single input in a multi-value
field, add the the `disabled` key to the value object, like:

```jsx
const BARCELONA = {
  value: 'FC Barcelona',
  id: 'TEAM_1',
  someOtherProp: 'the best, Jerry, the best',
}
const ARSENAL = {
  value: 'Arsenal',
  disabled: true,
  id: 'TEAM_2',
  someOtherProp: 'the best, Jerry, the best',
}
const ATLAS = {
  value: 'Atlas',
  disabled: true,
  id: 'TEAM_3',
  someOtherProp: 'the best, Jerry, the best',
}

<EditableField
  label="Teams (individual fields disabled)"
  name="teams"
  type="text"
  placeholder="Add a team name"
  value={[ARSENAL, ATLAS, BARCELONA]}
/>
```
