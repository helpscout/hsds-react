# Label

A Label component is a light-weight wrapper for the native HTML `<label>` selector.

## Example

```html
<Label>News Team:</Label>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| for | string | Determines what the label is associated with. |
| state | string | Changes the text color based on state. |


### States

| Prop | Description |
| --- | --- |
| `error` | Changes color to red. |
| `success` | Changes color to green. |
| `warning` | Changes color to yellow. |