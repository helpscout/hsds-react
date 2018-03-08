# Notification

A Notification component displays content that requires attention from the user. An example where Notifications may be used would be within the context of new Chat messages.

## Example

```jsx
<Notification id='23d-112351' body='Hi!' />
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| animationSequence | `string` | [Animation](../Animate) style for this component. Default `fade upUp`. |
| body | `string` | Content for the component. |
| from | `string` | The name/label for the component's `body` content. |
| isActive | `bool` | Determines the dismissal state of the component. Default `true`. |
| isDismissable | `bool` | Determines if the component can be dismissed. Default `false`. |
| id | `number`/`string` | The ID of the component. Highly recommended. |
| onClick | `func` | Callback when the [Bubble](../Message/Docs/Bubble.md) UI is clicked. |
| onDismiss | `func` | Callback when component is dismissed and removed from the DOM. |
| timeout | `number` | Amount of time before the component auto-dismisses. Only applicable if `isDismissable`. Default `5000`. |
| type | `string` | Determine the type of content for the component. Default `text`. |


### Types

| Prop | Description |
| --- | --- |
| `image` | Renders the `body ` content as an image link. |
| `link` | Renders the `body` content as a link. |
| `text` | Renders the `body` content as text. Default. |
