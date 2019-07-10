# MessageCard

This component renders a Message Card Notification with (optional) Title, Subtitle, Body, and Action props.

## Example

```jsx
<MessageCard
  title="Need help?"
  subtitle="The J&amp;G Team is here"
  body="The J&amp;G Support Team are always happy to answer..."
  action={() => <Button>Click me!</Button>}
/>
```

## Props

| Prop              | Type       | Default   | Description                                                          |
| ----------------- | ---------- | --------- | -------------------------------------------------------------------- |
| action            | `function` |           | Render-prop that is placed in the CTA section of the Message.        |
| align             | `string`   | `"right"` | Apply styles for left or right-aligned Message.                      |
| animationSequence | `string`   |           | [Animation](../Animate) style for this component. Default `fade up`. |
| body              | `string`   |           | Main text of the Message.                                            |
| className         | `string`   |           | The className of the component.                                      |
| isWithBoxShadow   | `boolean`  | `true`    | Adds a box shadow.                                                   |
| subtitle          | `string`   |           | Title of the Message.                                                |
| title             | `string`   |           | Subtitle of the Message.                                             |

### Align

| Prop    | Description                             |
| ------- | --------------------------------------- |
| `left`  | Apply styles for left-aligned Message.  |
| `right` | Apply styles for right-aligned Message. |
