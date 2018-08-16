# FormLabel

This component is a wrapper for Control components, such as [`Input`](../../Input). It can render [`Label`](../../Label) and [`HelpText`](../../HelpText) UI, and is automatically connected to the child Control component.

## Example

```jsx
<FormLabel label="First name">
  <Input />
</FormLabel>
```

## Props

| Prop      | Type     | Description                                                          |
| --------- | -------- | -------------------------------------------------------------------- |
| children  | `any`    | Content to render.                                                   |
| className | `string` | Custom class names to be added to the component.                     |
| for       | `string` | Determines what the `label` is associated with. Preferred over `id`. |
| helpText  | `string` | Content to render a [`HelpText`](../../HelpText).                    |
| id        | `string` | Custom ID to bind the `label` with the Control component.            |
| label     | `string` | Content to render a [`Label`](../../Label).                          |
