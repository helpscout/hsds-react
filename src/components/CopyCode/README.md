# CopyCode

This component renders a [Highlighted](../Highlight) code snippet with the ability to copy to clipboard, powered by [CopyButton](../CopyButton).

## Example

```jsx
<CopyCode code="..." language="javascript" />
```

## Props

| Prop            | Type       | Description                                                                                                                                                     |
| --------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoFocus       | `boolean`  | Automatically select `code` when component mounts.                                                                                                              |
| className       | `string`   | Custom class names to be added to the component.                                                                                                                |
| code            | `string`   | The code to be displayed within the container.                                                                                                                  |
| copyToClipboard | `boolean`  | Enables copying to clipboard.                                                                                                                                   |
| innerRef        | `function` | Retrieves the DOM node.                                                                                                                                         |
| language        | `string`   | The language of the code for syntax highlighting ([available languages in highlight.js](https://github.com/highlightjs/highlight.js/tree/master/src/languages)) |
| onCopy          | `function` | Callback function when the copy button is clicked.                                                                                                              |
