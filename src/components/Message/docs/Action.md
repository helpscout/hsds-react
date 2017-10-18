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
| className | string | Custom class names to be added to the component. |
| from | node/boolean | Provides author information and applies "From" styles. |
| ltr | boolean | Applies left-to-right text styles. |
| rtl | boolean | Applies right-to-left text styles. |
| read | boolean | Determines if the Message is read. |
| showAvatar | boolean | Renders a space for the Avatar to appear. Default is `true`. |
| timestamp | string | Timestamp for the Message. |
| to | node/boolean | Provides author information and applies "To" styles. |
