**_DEPRECATED COMPONENT_**
**_DEPRECATED COMPONENT_**
**_DEPRECATED COMPONENT_**

Use `SelectDropdown` instead

# Select

A Select component is an enhanced version of the default HTML `<select>`.

## Example

```jsx
<Select
  placeholder="Pick one"
  options={['You sit on a throne of lies!', 'Son of a nutcracker!']}
  autoFocus
/>
```

### Option groups

```jsx
<Select
  options={[
    {
      label: 'Quotes',
      value: ['You sit on a throne of lies!', 'Son of a nutcracker!'],
    },
  ]}
  autoFocus
/>
```

### Children options

This component also accepts regular `<option>` elements as children.

```jsx
<Select placeholder="Pick one">
  <option>...</option>
  <option>...</option>
  <option>...</option>
</Select>
```

## Props

| Prop                     | Type                 | Description                                                               |
| ------------------------ | -------------------- | ------------------------------------------------------------------------- |
| autoFocus                | `bool`               | Automatically focuses the select.                                         |
| className                | `string`             | Custom class names to be added to the component.                          |
| disabled                 | `bool`               | Disable the select.                                                       |
| errorIcon                | `string`             | Icon that renders when the state is `error`.                              |
| errorMessage             | `string`             | Error message that renders into a Tooltip.                                |
| forceAutoFocusTimeout    | `bool`               | Determines the amount of time (`ms`) for the component to focus on mount. |
| helpText                 | `string`/`component` | Displays text underneath select.                                          |
| hintText                 | `string`/`component` | Displays text above select.                                               |
| id                       | `string`             | ID for the select.                                                        |
| ref                      | `function`           | Retrieves the `input` DOM node.                                           |
| isFocused                | `string`             | Determines if the component is focused.                                   |
| label                    | `string`/`component` | Label for the select.                                                     |
| name                     | `string`             | Name for the select.                                                      |
| onBlur                   | `function`           | Callback when select is blurred.                                          |
| onChange                 | `function`           | Callback when select value is changed.                                    |
| onFocus                  | `function`           | Callback when select is focused.                                          |
| placeholder              | `string`             | Placeholder text for the select.                                          |
| prefix                   | `string`             | Text to appear before the select.                                         |
| readOnly                 | `bool`               | Disable editing of the select.                                            |
| removeStateStylesOnFocus | `bool`               | Removes the `state` styles on input focus. Default `false`.               |
| seamless                 | `bool`               | Removes the border around the select.                                     |
| size                     | `bool`               | Determines the size of the select.                                        |
| state                    | `string`             | Change select to state color.                                             |
| suffix                   | `string`             | Text to appear after the select.                                          |
| value                    | `string`             | Initial value of the select.                                              |

### States

| Prop      | Description              |
| --------- | ------------------------ |
| `error`   | Changes color to red.    |
| `success` | Changes color to green.  |
| `warning` | Changes color to yellow. |
