# Attachment

A Attachment component provides the UI to render caption text within a [Message](./Message.md). This component is typically used within other Message sub-components.


## Example

```jsx
<Message from avatar={<Avatar name='Arctic Puffin' />}>
  <Message.Attachment
    filename='image.png'
    url='https://.../image.png'
  />
</Message>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |
| download | `bool` | Determines if the file can be downloaded on click. Default `true`. |
| filename | `string` | The name of the file. |
| from | `node`/`bool` | Provides author information and applies "From" styles. |
| onClick | `func` | Callback when the file is clicked. |
| ltr | `bool` | Applies left-to-right text styles. |
| ltr | `bool` | Applies left-to-right text styles. |
| read | `bool` | Determines if the Message is read. |
| rtl | `bool` | Applies right-to-left text styles. |
| timestamp | `string` | Timestamp for the Message. |
| to | `node`/`bool` | Provides author information and applies "To" styles. |
| url | `string` | The URL of the file. |
