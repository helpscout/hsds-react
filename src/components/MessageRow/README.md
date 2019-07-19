# MessageRow

This component renders the a link to a Message, which is displayed in the main Messages settings page.

## Example

```jsx
<MessageRow name="Buddy Message" />
```

## Props

| Prop          | Type      | Default | Description                                                              |
| ------------- | --------- | ------- | ------------------------------------------------------------------------ |
| className     | `string`  |         | The className of the component.                                          |
| errorMessage  | `string`  |         | The message to display in the [Tooltip](../Tooltip) in the error state.  |
| isError       | `boolean` |         | Renders the error UI for the component.                                  |
| isPaused      | `boolean` |         | Renders the paused UI for the component.                                 |
| name          | `string`  |         | The name of the Message.                                                 |
| pausedMessage | `string`  |         | The message to display in the [Tooltip](../Tooltip) in the paused state. |

For addition props, see [Accordion.Link](../Accordion/docs/Link.md)
