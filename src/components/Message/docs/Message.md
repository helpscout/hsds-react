# Message

A Message component provides a wrapper for smaller sub-components that create the content for an individual chat-based message.

## Example

```jsx
<Message from avatar={<Avatar name="Buddy" />}>
  <Message.Chat read timestamp="9:41am">
    <strong>*NOT NOW ARCTIC PUFFIN!*</strong>
  </Message.Chat>
</Message>
```

## Props

| Prop       | Type          | Description                                                    |
| ---------- | ------------- | -------------------------------------------------------------- |
| avatar     | Element       | An [Avatar](../../Avatar) component containing author details. |
| className  | `string`      | Custom class names to be added to the component.               |
| from       | `node`/`bool` | Provides author information and applies "From" styles.         |
| isNote     | `bool`        | Applies the "Note" theme styles.                               |
| ltr        | `bool`        | Applies left-to-right text styles.                             |
| rtl        | `bool`        | Applies right-to-left text styles.                             |
| showAvatar | `bool`        | Renders a space for the Avatar to appear. Default is `true`.   |
| to         | `node`/`bool` | Provides author information and applies "To" styles.           |
