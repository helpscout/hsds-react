# Switch

A Switch component is an alternative to a [Checkbox](../Checkbox) that provides a switch-toggle UI.

## Example

```jsx
<Switch />
```

## Props

| Prop      | Type              | Description                                                                 |
| --------- | ----------------- | --------------------------------------------------------------------------- |
| checked   | `bool`            | Determines if the component is checked.                                     |
| className | `string`          | Custom class names to be added to the component.                            |
| id        | `string`          | Sets a custom ID for the component.                                         |
| isLoading | `bool`            | Activates the loading state.                                                |
| inputRef  | `function`        | Callback to retrieve the `input` node.                                      |
| name      | `string`          | Name attribute for the component's `input` node.                            |
| onBlur    | `function`        | Callback function when component blurs.                                     |
| onClick   | `function`        | Callback function when component is clicked.                                |
| onChange  | `function`        | Callback function when component `checked` changes. Returns switched state. |
| onFocus   | `function`        | Callback function when component focuses.                                   |
| size      | `string`          | Adjusts the size of the component.                                          |
| state     | `string`          | Applies state-based styling.                                                |
| value     | `string`/`number` | Value for the component.                                                    |

### `onChange(nextValue, { event, value })`

The `onChange` callback returns the next switch state. Additionally, the `onChange` and `value` props are provided as an Object as a second argument.

| Prop      | Type    | Description                             |
| --------- | ------- | --------------------------------------- |
| nextValue | `bool`  | The next switch state value.            |
| event     | `Event` | The `onChange` event.                   |
| value     | `any`   | The specified `value` of the component. |
