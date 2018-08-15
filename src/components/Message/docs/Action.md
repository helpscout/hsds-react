# Action

An Action component provides the UI for action-based content within a [Message](./Message.md).


## Example

```jsx
<Message from>
  <Message.Action read timestamp='9:41am'>
    Buddy became upset. <a href='#'>Find out what happened</a>
  </Message.Action>
</Message>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |
| from | `node`/`bool` | Provides author information and applies "From" styles. |
| ltr | `bool` | Applies left-to-right text styles. |
| read | `bool` | Determines if the Message is read. |
| rtl | `bool` | Applies right-to-left text styles. |
| showAvatar | `bool` | Renders a space for the Avatar to appear. Default is `true`. |
| timestamp | `string` | Timestamp for the Message. |
| to | `node`/`bool` | Provides author information and applies "To" styles. |
