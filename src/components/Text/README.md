# Text

A Text component is a light-weight text wrapper enhanced with a collection of aesthetic modifiers.

## Example

```jsx
<Text>News team, assemble!</Text>
```

## Props

| Prop              | Type              | Description                                      |
| ----------------- | ----------------- | ------------------------------------------------ |
| className         | `string`          | Custom class names to be added to the component. |
| center            | `boolean`         | Center aligns text.                              |
| disableSelect     | `boolean`         | Disables text selection.                         |
| faint             | `boolean`         | Changes text color to a very light grey.         |
| linkStyle         | `boolean`         | Applies [Link](../Link) styles.                  |
| lineHeightInherit | `boolean`         | Inherit the line-height from a parent selector.  |
| lineHeightReset   | `boolean`         | Resets the line-height to `1`.                   |
| muted             | `boolean`         | Changes text color to a light grey.              |
| noWrap            | `boolean`         | Prevents text from wrapping.                     |
| shade             | `string`          | Changes text color shade.                        |
| size              | `string`          | Adjust text size.                                |
| state             | `string`          | Changes the text color based on state.           |
| subtle            | `boolean`         | Changes text color to a lighter grey.            |
| truncate          | `boolean`         | Enables CSS truncation for text.                 |
| weight            | `number`/`string` | Adjust text weight.                              |
| wordWrap          | `boolean`         | Enables CSS `word-break` for text.               |

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
