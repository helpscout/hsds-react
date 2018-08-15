# StatusBadge

An StatusBadge component is a UI element that helps indicate the [status](../StatusDot) of something with a [Badge](../Badge) count.


## Example

```jsx
<StatusBadge count={123} status='new' />
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| borderColor | `string` | Color for the StatusDot border. |
| className | `string` | Custom class names to be added to the component.  |
| count | `number` | Count to display within the Badge. |
| outerBorderColor | `string` | Color for the StatusDot's outer border. |
| status | `string` | Status style to render to the StatusDot. |
| title | `string` | Custom text for the HTML `title` attributes. |


## Status

| Value | Description |
| --- | --- |
| `online` | Renders a green dot. |
| `offline` | Renders a red dot. |
| `busy` | Renders a yellow dot. |
| `new` | Renders a yellow dot. |
| `active` | Renders a green dot. |
| `inactive` | Renders a grey dot. |
| `''` | Does not render a StatusDot. |
