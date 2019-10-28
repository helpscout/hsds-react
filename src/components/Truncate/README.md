# Truncate

A truncate component is a light-weight text wrapper with the ability to truncate text at the start, middle, or end.
It will also allow you to truncate a section of a string based on the presence of a splitter prop, like the `@` in
an email address.

## Example

```jsx
<Truncate>News team, assemble!</Truncate>
```

## Props

| Prop                  | Type      | Description                                                                |
| --------------------- | --------- | -------------------------------------------------------------------------- |
| className             | `string`  | Custom class names to be added to the component.                           |
| ellipsis              | `string`  | Characters to show during truncation.                                      |
| limit                 | `number`  | The amount of characters to keep before truncation.                        |
| showTooltipOnTruncate | `boolean` | Renders a [Tooltip](../Tooltip) if content is truncated. Default `false`.  |
| splitter              | `string`  | Char to split string on for truncating mid-string, `longEma...@email.com`. |
| type                  | `string`  | Location of truncation.                                                    |

### `type`

| Prop     | Description                               |
| -------- | ----------------------------------------- |
| `auto`   | Uses CSS truncation. This is the default. |
| `start`  | Truncates beginning of string.            |
| `middle` | Truncates middle of string.               |
| `end`    | Truncates end of string.                  |
