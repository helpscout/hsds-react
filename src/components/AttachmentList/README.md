# AttachmentList

An AttachmentList component is a wrapper that renders [Attachment](../Attachment) components.


### Download All

If 2 or more `<Attachment>` components are provided, this component will automatically render a clickable "Download All" attachment UI.


## Example

```jsx
<AttachmentList>
  <Attachment name='file.png' size='52KB' />
  <Attachment name='file.png' size='5KB' />
  <Attachment name='file.png' size='10KB' />
</AttachmentList>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |
| downloadAllLabel | `string` | Text label for the "Download All" attachment. |
| onDownloadAllClick | `function` | The callback when the "Download All" attachment is clicked. |
| showDownloadAll | `bool` | Show/hides the "Download All" attachment. Default `true`. |


### Callbacks

#### `onDownloadAllClick(event)`

| Argument | Type | Description |
| --- | --- | --- |
| `event` | `object` | The (React) event object. |
