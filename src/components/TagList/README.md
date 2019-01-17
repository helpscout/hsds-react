# TagList

A TagList component is a UI element that contains [Tag](../Tag) components.

## Example

```jsx
<TagList>
  <Tag color="red">stay</Tag>
  <Tag color="green">class</Tag>
  <Tag color="grey" filled>
    san diego
  </Tag>
</TagList>
```

## Props

| Prop                          | Type       | Description                                                            |
| ----------------------------- | ---------- | ---------------------------------------------------------------------- |
| className                     | `string`   | Custom class names to be added to the component.                       |
| isRemovable                   | `boolean`  | Enables the ability to remove child [Tag](../Tag) components.          |
| `onBeforeRemove({id, value})` | `Promise`  | Function that returns a promise to resolve before removing.            |
| `onRemove({id, value})`       | `Function` | Callback function when a child [Tag](../Tag) is removed and unmounted. |
| overflowFade                  | `boolean`  | Wraps component in an [Overflow](../Overflow) component.               |
