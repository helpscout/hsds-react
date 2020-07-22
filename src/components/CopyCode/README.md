# CopyCode

This component renders a code snippet with the ability to copy to clipboard, powered by [CopyButton](../CopyButton).

## Example

```jsx
<CopyCode code="..." language="javascript" />
```

## Props

| Prop            | Type       | Description                                                          |
| --------------- | ---------- | -------------------------------------------------------------------- |
| autoFocus       | `boolean`  | Automatically select `code` when component mounts.                   |
| buttonSize      | `string`   | Sets the size of the button. Can be one of `"sm"`, `"md"` or `"lg"`. |
| code            | `string`   | The code to be displayed within the container.                       |
| copyToClipboard | `boolean`  | Enables copying to clipboard.                                        |
| innerRef        | `function` | Retrieves the DOM node.                                              |
| language        | `string`   | Can be one of `c`, `java`, `javascript`, `objectivec`, `swift`       |
| maxWidth        | `number`   | Sets the max width of the container.                                 |
| onCopy          | `function` | Callback function when the copy button is clicked.                   |
