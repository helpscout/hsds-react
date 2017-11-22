# StatusBar

A StatusBar component provides contextual feedback messages for user actions.


## Example

```jsx
<StatusBar>
  Buddy! You have 3 new messages.
</StatusBar>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |
| duration | `number` | Time (ms) for the expand/collapse animation. |
| durationOpen | `number` | Time (ms) for the expand animation. |
| durationClose | `number` | Time (ms) for the collapse animation. |
| isOpen | `boolean` | Opens/collapses the component. Default `false`. |
| onClose | `function` | Callback function when the component closes. |
| onOpen | `function` | Callback function when the component opens. |
| style | `string` | Custom styles to be added to the component. |
