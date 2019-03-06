# GreeterRow

This component renders the a link to a Greeter, which is displayed in the main Greeters settings page.

## Example

```jsx
<GreeterRow name="Buddy Greeter" />
```

## Props

| Prop          | Type      | Default | Description                                                              |
| ------------- | --------- | ------- | ------------------------------------------------------------------------ |
| className     | `string`  |         | The className of the component.                                          |
| errorMessage  | `string`  |         | The message to display in the [Tooltip](../Tooltip) in the error state.  |
| isError       | `boolean` |         | Renders the error UI for the component.                                  |
| isPaused      | `boolean` |         | Renders the paused UI for the component.                                 |
| name          | `string`  |         | The name of the Greeter.                                                 |
| pausedMessage | `string`  |         | The message to display in the [Tooltip](../Tooltip) in the paused state. |

For addition props, see [Accordion.Link](../Accordion/docs/Link.md)
