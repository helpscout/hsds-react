# Text

A Text component is a light-weight text wrapper enhanced with a collection of aesthetic modifiers.

## Example

```html
<Text>News team, assemble!</Text>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| disableSelect | boolean | Disables text selection. |
| faint | boolean | Changes text color to a very light grey. |
| muted | boolean  | Changes text color to a light grey. |
| size | number | Adjust text size. |
| subtle | boolean | Changes text color to a lighter grey. |
| state | string | Changes the text color based on state. |
| truncate | boolean | Enables CSS truncation for text. |


### States

| Prop | Description |
| --- | --- |
| `error` | Changes color to red. |
| `success` | Changes color to green. |
| `warning` | Changes color to yellow. |