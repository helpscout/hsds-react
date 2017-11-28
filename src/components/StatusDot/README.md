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
| className | `string` | Custom class names to be added to the component. |
| status | `string` | Status style to render to the component. |
| title | `string` | Custom text for the HTML `title` attributes. |
| isUnread | `bool` | Applies an unread style to the component. |


## Status

| Value | Description |
| --- | --- |
| `online` | Renders a green dot. |
| `offline` | Renders a red dot. |
| `busy` | Renders a yellow dot. |
| `inactive` | Renders a grey dot. |
