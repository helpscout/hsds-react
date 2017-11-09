# Truncate

A truncate component is a light-weight text wrapper with the ability to truncate text at the start, middle, or end.

## Example

```jsx
<Truncate>News team, assemble!</Truncate>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| ellipsis | string | Characters to show during truncation. |
| limit | number | The amount of characters to keep before truncation. |
| type | string | Location of truncation. |


### `type`

| Prop | Description |
| --- | --- |
| `auto` | Uses CSS truncation. This is the default. |
| `start` | Truncates beginning of string. |
| `middle` | Truncates middle of string. |
| `end` | Truncates end of string. |
