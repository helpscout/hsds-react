# Chat

A Chat component provides the UI for the primary content within a [Message](./Message.md).

## Example

```jsx
<Message to avatar={<Avatar name="Buddy" />}>
  <Message.Chat read timestamp="9:41am">
    :sob:
    <br />
    omgomgomg
    {1}
  </Message.Chat>
  <Message.Chat read timestamp="9:41am">
    <strong>*Frantically running through North pole*</strong>
  </Message.Chat>
</Message>
```

## Props

| Prop            | Type          | Description                                                       |
| --------------- | ------------- | ----------------------------------------------------------------- |
| bubbleClassName | `string`      | Custom class names for the child [Bubble](./Bubble.md) component. |
| caption         | `string`      | Renders a [Caption](./Caption.md).                                |
| captionSize     | `string`      | Adjusts the size of the [Caption](./Caption.md) text.             |
| className       | `string`      | Custom class names to be added to the component.                  |
| from            | `node`/`bool` | Provides author information and applies "From" styles.            |
| isNote          | `bool`        | Applies "note" styles.                                            |
| ltr             | `bool`        | Applies left-to-right text styles.                                |
| onBubbleClick   | `func`        | Callback when the Bubble is clicked.                              |
| read            | `bool`        | Determines if the Message is read.                                |
| rtl             | `bool`        | Applies right-to-left text styles.                                |
| size            | `string`      | Determines the size of the component.                             |
| timestamp       | `string`      | Timestamp for the Message.                                        |
| title           | `string`      | Renders a [Heading](../../Heading) title in the component.        |
| to              | `node`/`bool` | Provides author information and applies "To" styles.              |
| typing          | `bool`        | Renders [TypingDots](../../TypingDots) within the component.      |
