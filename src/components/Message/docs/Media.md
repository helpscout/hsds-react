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
| error | `bool`/`string` | Renders the error caption. Default `false`. |
| errorMessage | `string` | Customizes the error caption. |
| imageAlt | `string` | Alt/title of the media image. |
| imageUrl | `string` | URL of the media image. |
| isUploading | `bool` | Renders the uploading spinner UI. Default `false`. |

| onMediaClick | `func` | Callback when the media image is clicked. |
| openMediaInModal | `bool` | Opens the media image in a Modal when clicked. Default `true`. |
| ltr | `bool` | Applies left-to-right text styles. |
| ltr | `bool` | Applies left-to-right text styles. |
| read | `bool` | Determines if the Message is read. |
| rtl | `bool` | Applies right-to-left text styles. |
| timestamp | `string` | Timestamp for the Message. |
| to | `node`/`bool` | Provides author information and applies "To" styles. |
