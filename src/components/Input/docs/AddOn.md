## Input.AddOn

This component renders a "prefix"/"suffix" UI when combined with an [`Input`](./Input.md) when used within a [`ControlGroup`](../../ControlGroup/).

### Example

```jsx
<ControlGroup>
  <ControlGroup.Item>
    <Input.AddOn>Prefix</Input.AddOn>
  </ControlGroup.Item>
  <ControlGroup.Item>
    <Input />
  </ControlGroup.Item>
  <ControlGroup.Item>
    <Input.AddOn>Suffix</Input.AddOn>
  </ControlGroup.Item>
</ControlGroup>
```

### Props

| Prop      | Type      | Description                                        |
| --------- | --------- | -------------------------------------------------- |
| children  | `any`     | Content to render.                                 |
| className | `string`  | Custom class names to be added to the component.   |
| isFirst   | `boolean` | Helps render component without right borders.      |
| isNotOnly | `boolean` | Helps render component without left/right borders. |
| isLast    | `boolean` | Helps render component without left borders.       |
