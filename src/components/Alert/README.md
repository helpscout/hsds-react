# Alert

An Alert component provides contextual feedback messages for user actions with the ability to provide additional actions.


## Example

```jsx
<Alert dismissable icon>
  Not now Arctic Puffin!
</Alert>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| actionRight | `element` | Renders an action-based element on the right side of the content. Typically [Buttons](../Button). |
| badge | `string` | Renders a [Badge](../Badge) component. |
| onDismiss | `function` | Callback function when this component is dismissed. |
| className | `string` | Custom class names to be added to the component. |
| dismissible | `bool` | Allows this component to be dismissed by clicking a [CloseButton](../CloseButton). |
| icon | `bool` | Renders an alert [Icon](../Icon). |
| noMargin | `bool` | Removes margin from the bottom of the component. |
| status | `string` | Changes the color of the component to the corresponding status. |


### Status

| Value | Description |
| --- | --- |
| `error` | Colors the badge red. |
| `info` | Colors the badge blue. |
| `success` | Colors the badge green. |
| `warning` | Colors the badge yellow. |
