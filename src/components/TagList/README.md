# TagList

A TagList component is a UI element that contains [Tag](../Tag) components.

## Example

```jsx
<TagList>
  <Tag color='red'>stay</Tag>
  <Tag color='green'>class</Tag>
  <Tag color='grey' filled>san diego</Tag>
</TagList>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |
| isRemovable | `bool` | Enables the ability to remove child [Tag](../Tag) components. |
| `onRemove({id, value})` | `func` | Callback function when a child [Tag](../Tag) is removed and unmounted. |
| overflowFade | `bool` | Wraps component in an [Overflow](../Overflow) component. |
