# Media

A Media component provides the UI to render media-based content within a [Message](./Message.md).


## Example

```jsx
<Message from avatar={<Avatar name='Arctic Puffin' />}>
  <Message.Chat read timestamp='9:41am'>
    Hey Buddy!
  </Message.Chat>
  <Message.Media imageUrl='https://img.buzzfeed.com/buzzfeed-static/static/2014-12/5/11/enhanced/webdr06/longform-original-7538-1417798667-22.jpg?downsize=715:*&output-format=auto&output-quality=auto' caption='image.jpg' timestamp='9:41am' read />
</Message>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| caption | string | Description of the media. |
| className | string | Custom class names to be added to the component. |
| from | node/boolean | Provides author information and applies "From" styles. |
| imageUrl | string | URL of the media image. |
| ltr | boolean | Applies left-to-right text styles. |
| rtl | boolean | Applies right-to-left text styles. |
| read | boolean | Determines if the Message is read. |
| ltr | boolean | Applies left-to-right text styles. |
| timestamp | string | Timestamp for the Message. |
| to | node/boolean | Provides author information and applies "To" styles. |
