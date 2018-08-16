# Item

This component renders a Control-based component within a [`ControlGroup`](./ControlGroup.md). It is used to combine several Control-based components together.

This component's width expands to be as wide as possible.

## Example

```jsx
<ControlGroup>
  <ControlGroup.Block>
    <Input />
  </ControlGroup.Block>
  <ControlGroup.Item>
    <Button />
  </ControlGroup.Item>
</ControlGroup>
```

## Props

| Prop      | Type      | Description                                        |
| --------- | --------- | -------------------------------------------------- |
| children  | `any`     | Content to render.                                 |
| className | `string`  | Custom class names to be added to the component.   |
| isFirst   | `boolean` | Helps render component without right borders.      |
| isNotOnly | `boolean` | Helps render component without left/right borders. |
| isLast    | `boolean` | Helps render component without left borders.       |
