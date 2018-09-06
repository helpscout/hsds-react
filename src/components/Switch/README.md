# Switch

A Switch component is an alternative to a [Checkbox](../Checkbox) that provides a switch-toggle UI.

## Example

```jsx
<Switch />
```

## Props

| Prop      | Type              | Description                                         |
| --------- | ----------------- | --------------------------------------------------- |
| checked   | `bool`            | Determines if the component is checked.             |
| className | `string`          | Custom class names to be added to the component.    |
| id        | `string`          | Sets a custom ID for the component.                 |
| isLoading | `bool`            | Activates the loading state.                        |
| inputRef  | `function`        | Callback to retrieve the `input` node.              |
| name      | `string`          | Name attribute for the component's `input` node.    |
| onBlur    | `function`        | Callback function when component blurs.             |
| onClick   | `function`        | Callback function when component is clicked.        |
| onChange  | `function`        | Callback function when component `checked` changes. |
| onFocus   | `function`        | Callback function when component focuses.           |
| size      | `string`          | Adjusts the size of the component.                  |
| state     | `string`          | Applies state-based styling.                        |
| value     | `string`/`number` | Value for the component.                            |
