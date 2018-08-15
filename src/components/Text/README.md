# Text

A Text component is a light-weight text wrapper enhanced with a collection of aesthetic modifiers.

## Example

```jsx
<Text>News team, assemble!</Text>
```

## Props

| Prop          | Type              | Description                                      |
| ------------- | ----------------- | ------------------------------------------------ |
| className     | `string`          | Custom class names to be added to the component. |
| center        | `bool`            | Center aligns text.                              |
| disableSelect | `bool`            | Disables text selection.                         |
| faint         | `bool`            | Changes text color to a very light grey.         |
| muted         | `bool`            | Changes text color to a light grey.              |
| linkStyle     | `bool`            | Applies [Link](../Link) styles.                  |
| shade         | `string`          | Changes text color shade.                        |
| size          | `string`          | Adjust text size.                                |
| state         | `string`          | Changes the text color based on state.           |
| subtle        | `bool`            | Changes text color to a lighter grey.            |
| truncate      | `bool`            | Enables CSS truncation for text.                 |
| weight        | `number`/`string` | Adjust text weight.                              |
| wordWrap      | `bool`            | Enables CSS `word-break` for text.               |

### Shades

| Prop         | Description        |
| ------------ | ------------------ |
| `subtle`     | Medium-light grey. |
| `muted`      | Lighter grey.      |
| `faint`      | Very lighter grey. |
| `extraMuted` | Extra light grey.  |

### States

| Prop      | Description              |
| --------- | ------------------------ |
| `error`   | Changes color to red.    |
| `success` | Changes color to green.  |
| `warning` | Changes color to yellow. |
