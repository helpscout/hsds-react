# Tag

A Tag component is a UI element that provide contextual labels for categories/tags.

## Example

```jsx
<Tag color='red'>important</Badge>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| allCaps | `bool` | Custom class names to be added to the component. |
| className | `string` | Custom class names to be added to the component. |
| color | `string` | Determines the color of the component. |
| id | `string`/`number` | ID of the component. |
| isRemovable | `bool` | Renders an `x` [Icon](../Icon), which can remove this component from the DOM. |
| filled | `bool` | Applies a filled in color style to the component. |
| pulsing | `bool` | Applies a pulsing animation. |
| `onRemove({id, value})` | `func` | Callback function when component is removed and unmounted. |
| value | `string`/`number` | Value of the tag. Renders in place of `children`, if specified. |


### Colors

| Value | Description |
| --- | --- |
| `blue` | Colors the tag blue. |
| `green` | Colors the tag green. |
| `grey` | Colors the tag grey. |
| `orange` | Colors the tag orange. |
| `purple` | Colors the tag purple. |
| `red` | Colors the tag red. |
