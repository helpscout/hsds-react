# Media

A Media component provides the UI to render media-based content within a [Message](./Message.md).

## Example

```jsx
<Message from avatar={<Avatar name="Arctic Puffin" />}>
  <Message.Chat read timestamp="9:41am">
    Hey Buddy!
  </Message.Chat>
  <Message.Media imageUrl="..." caption="image.jpg" timestamp="9:41am" read />
</Message>
```

## Props

| Prop                     | Type             | Description                                                                            |
| ------------------------ | ---------------- | -------------------------------------------------------------------------------------- |
| caption                  | `string`         | Description of the media.                                                              |
| className                | `string`         | Custom class names to be added to the component.                                       |
| error                    | `bool`/`string`  | Renders the error caption. Default `false`.                                            |
| errorMessage             | `string`         | Customizes the error caption.                                                          |
| from                     | `node`/`bool`    | Provides author information and applies "From" styles.                                 |
| height                   | `number`         | Height of the image.                                                                   |
| imageAlt                 | `string`         | Alt/title of the media image.                                                          |
| imageUrl                 | `string`         | URL of the media image.                                                                |
| isUploading              | `bool`           | Renders the uploading spinner UI. Default `false`.                                     |
| ltr                      | `bool`           | Applies left-to-right text styles.                                                     |
| maxHeight                | `number`         | Max-height of the media content.                                                       |
| maxWidth                 | `number`         | Max-width of the media content.                                                        |
| modalAnimationDuration   | `number`         | Custom [animation](../Animate) duration for the child [Card](../Card) component.       |
| modalAnimationEasing     | `string`         | Custom [animation](../Animate) easing for the child [Card](../Card) component.         |
| modalAnimationSequence   | `array`/`string` | Custom [animation](../Animate) sequence for the child [Card](../Card) component.       |
| modalCardClassName       | `string`         | Custom class names for the [Modal](../Modal) card.                                     |
| modalClassName           | `string`         | Custom class names for the [Modal](../Modal).                                          |
| modalWrapperClassName    | `string`         | Custom class names for the [Modal](../Modal) wrapper.                                  |
| onErrorTryAgainClick     | `Function`       | Callback when "Try again" action is clicked.                                           |
| onMediaClick             | `Function`       | Callback when the media image is clicked.                                              |
| onMediaLoad              | `Function`       | Callback when the media image is loaded.                                               |
| openMediaInModal         | `bool`           | Opens the media image in a Modal when clicked. Default `true`.                         |
| overlayAnimationDuration | `number`         | Custom [animation](../Animate) duration for the child [Overlay](../Overlay) component. |
| read                     | `bool`           | Determines if the Message is read.                                                     |
| rtl                      | `bool`           | Applies right-to-left text styles.                                                     |
| showErrorTryAgainLink    | `bool`           | Shows the "Try again" action, if error. Default `true`.                                |
| thumbnailImage           | `string`         | URL of the media image (thumbnail).                                                    |
| timestamp                | `string`         | Timestamp for the Message.                                                             |
| to                       | `node`/`bool`    | Provides author information and applies "To" styles.                                   |
| tryAgainLabel            | `string`         | Label for the "Try Again" action, on error.                                            |
| width                    | `number`         | Width of the image.                                                                    |
