# Item

A ChatTranscript.Item component is a list-item component for a [ChatTranscript](./ChatTranscript.md). It renders individual items of various types.

## Example

```jsx
<ChatTranscript
  author={{ name: 'Mugatu' }}
  createdAt='9:41pm'
  body=`I feel like I'm taking crazy pills!`
/>
```

## Props

| Prop                         | Type              | Description                                                                          |
| ---------------------------- | ----------------- | ------------------------------------------------------------------------------------ |
| action                       | `string`          | The action-type of the chat item.                                                    |
| attachments                  | `array`           | [Attachments](../../Attachment) associated with the chat item.                       |
| author                       | `object`          | The author of the chat item.                                                         |
| body                         | `string`          | The content of the chat item. Can contain HTML.                                      |
| chatId                       | `number`/`string` | The ID of the associated chat.                                                       |
| className                    | `string`          | Custom class names to be added to the component.                                     |
| createdAt                    | `string`          | The timestamp of the chat item.                                                      |
| id                           | `number`/`string` | The ID of the chat item.                                                             |
| isBodySafe                   | `boolean`         | Whether the body has already been sanitized and is safe for output                   |
| onAttachmentClick            | `function`        | The callback when an [Attachment](../../Attachment) is clicked.                      |
| onDownloadAllAttachmentClick | `function`        | The callback when the [Download All attachment](../../AttachmentList) UI is clicked. |
| params                       | `any`             | Param data of the chat item.                                                         |
| showDownloadAllAttachments   | `bool`            | Show/hide the "Download All" attachment UI. Default `true`.                          |
| timestamp                    | `string`          | The timestamp to show when hovering the `createdAt` UI.                              |
| type                         | `string`          | The type of chat item.                                                               |

### Types

| Prop        | Description                      |
| ----------- | -------------------------------- |
| `line_item` | Renders a action/event-based UI. |
| `message`   | Renders a standard message UI.   |
| `note`      | Renders a note-based UI.         |
