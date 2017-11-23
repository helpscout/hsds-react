# Collapsible

A Collapsible component provides content with the ability to collapse or expand.


## Example

```jsx
<Collapsible>
  <div>By the beard of Zeus!</div>
</Collapsible>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |
| duration | `number` | Time (ms) for the expand/collapse animation. |
| durationOpen | `number` | Time (ms) for the expand animation. |
| durationClose | `number` | Time (ms) for the collapse animation. |
| isOpen | `boolean` | Opens/collapses the component. |
| onClose | `function` | Callback function when the component closes. |
| onOpen | `function` | Callback function when the component opens. |
| style | `string` | Custom styles to be added to the component. |
