# Attachment

An Attachment component provides UI for file attachments, typically found in [Chat-based](../ChatTranscript) components.


## Example

```jsx
<Attachment name='file.png' size='52KB' />
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |
| id | `number`/`string` | The id of the attachment. |
| imageUrl | `string` | The URL of the an image attachment to render. |
| mime | `string` | The file type of the attachment. |
| name | `string` | The name of the attachment. |
| onClick | `function` | The callback when the component is clicked. |
| onRemoveClick | `function` | The callback when the component's [CloseButton](../../CloseButton) UI is clicked. |
| size | `string` | The size of the attachment. |
| truncateLimit | `number` | The amount of characters to truncate the file name. |
| type | `string` | The type of UI for the component. |
| url | `string` | The URL of the attachment. |


### Types

| Prop | Description |
| --- | --- |
| `action` | Provides a button-based UI. |
| `link` | Provides a link-based UI. Default. |


### Callbacks

#### `onClick(event, props)`

| Argument | Type | Description |
| --- | --- | --- |
| `event` | `object` | The (React) event object. |
| `props` | `object` | Data object with all of the component's props. |
