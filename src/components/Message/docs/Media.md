# Media

A Media component provides the UI to render media-based content within a [Message](./Message.md).


## Example

```jsx
<Message from avatar={<Avatar name='Arctic Puffin' />}>
  <Message.Chat read timestamp='9:41am'>
    Hey Buddy!
  </Message.Chat>
  <Message.Media imageUrl='...' caption='image.jpg' timestamp='9:41am' read />
</Message>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| caption | `string` | Description of the media. |
| className | `string` | Custom class names to be added to the component. |
| from | `node`/`bool` | Provides author information and applies "From" styles. |
| imageUrl | `string` | URL of the media image. |
| ltr | `bool` | Applies left-to-right text styles. |
| ltr | `bool` | Applies left-to-right text styles. |
| read | `bool` | Determines if the Message is read. |
| rtl | `bool` | Applies right-to-left text styles. |
| timestamp | `string` | Timestamp for the Message. |
| to | `node`/`bool` | Provides author information and applies "To" styles. |
