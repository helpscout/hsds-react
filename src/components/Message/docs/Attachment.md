# Attachment

An Attachment component provides the UI to render caption text within a [Message](./Message.md). This component is typically used within other Message sub-components.


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
| error | `bool`/`string` | Renders the error caption. Default `false`. |
| errorMessage | `string` | Customizes the error caption. |
| filename | `string` | The name of the file. |
| from | `node`/`bool` | Provides author information and applies "From" styles. |
| isUploading | `bool` | Renders the uploading spinner UI. Default `false`. |
| ltr | `bool` | Applies left-to-right text styles. |
| ltr | `bool` | Applies left-to-right text styles. |
| onClick | `func` | Callback when the file is clicked. |
| openDownloadInNewTab | `bool` | Opens downloadable links in new tab. Default `true`. |
| read | `bool` | Determines if the Message is read. |
| rtl | `bool` | Applies right-to-left text styles. |
| timestamp | `string` | Timestamp for the Message. |
| to | `node`/`bool` | Provides author information and applies "To" styles. |
| uploadingMessage | `string` | Customizes the uploading message text. |
| url | `string` | The URL of the file. |
