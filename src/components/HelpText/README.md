# HelpText

A HelpText component is a light-weight text wrapper enhanced with a collection of aesthetic modifiers. HelpText is typically used with form elements / components.

## Example

```html
<HelpText>News team, assemble!</Text>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| muted | boolean  | Changes text color to a light grey. |
| size | string | Adjust text size. |
| state | string | Changes the text color based on state. |


### States

| Prop | Description |
| --- | --- |
| `error` | Changes color to red. |
| `success` | Changes color to green. |
| `warning` | Changes color to yellow. |
