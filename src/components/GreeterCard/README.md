# GreeterCard

This component renders a Greeter Card Notification with (optional) Title, Subtitle, Body, and Action props.

## Example

```jsx
<GreeterCard
  title="Need help?"
  subtitle="The J&amp;G Team is here"
  body="The J&amp;G Support Team are always happy to answer..."
  action={() => <Button>Click me!</Button>}
/>
```

## Props

| Prop              | Type       | Default   | Description                                                          |
| ----------------- | ---------- | --------- | -------------------------------------------------------------------- |
| action            | `function` |           | Render-prop that is placed in the CTA section of the Greeter.        |
| align             | `string`   | `"right"` | Apply styles for left or right-aligned Greeter.                      |
| animationSequence | `string`   |           | [Animation](../Animate) style for this component. Default `fade up`. |
| body              | `string`   |           | Main text of the Greeter.                                            |
| className         | `string`   |           | The className of the component.                                      |
| isWithBoxShadow   | `boolean`  | `true`    | Removes the box shadow.                                              |
| subtitle          | `string`   |           | Title of the Greeter.                                                |
| title             | `string`   |           | Subtitle of the Greeter.                                             |

### Align

| Prop    | Description                             |
| ------- | --------------------------------------- |
| `left`  | Apply styles for left-aligned Greeter.  |
| `right` | Apply styles for right-aligned Greeter. |
