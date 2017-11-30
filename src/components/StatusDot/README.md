# StatusDot

An StatusDot component is a UI element that helps indicate the status of something.


## Example

```jsx
<StatusDot status='offline' />
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| borderColor | `string` | Color for the component border. |
| className | `string` | Custom class names to be added to the component.  |
| icon | `string` | Renders an [Icon](../Icon) into the component. |
| inline | `bool` | Applies a display inline style to the component.|
| outerBorderColor | `string` | Color for the component's outer border. |
| size | `string` | Adjusts the size of the component. |
| status | `string` | Status style to render to the component. |
| title | `string` | Custom text for the HTML `title` attributes. |
| isUnread | `bool` | Applies an unread style to the component. |


## Sizes

| Value | Description |
| --- | --- |
| `md` | Renders a slightly larger dot. |
| `sm` | Renders a smaller dot. Default. |


## Status

| Value | Description |
| --- | --- |
| `online` | Renders a green dot. |
| `offline` | Renders a red dot. |
| `busy` | Renders a yellow dot. |
| `active` | Renders a green dot. |
| `inactive` | Renders a grey dot. |
