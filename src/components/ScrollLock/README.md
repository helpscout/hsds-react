# ScrollLock

ScrollLock is an event handling component which prevents scrolling past the top or bottom of a container. Wrap your scrollable element in a ScrollLock to use it.


## Example

```jsx
<ScrollLock>
  <div style={{overflow: 'auto', height: '200px' }}>
    ...
  </div>
</ScrollLock>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| isDisabled | `bool` | Disable the scroll locking behaviour, making the component a no-op. |
| direction | `string` | Determines the scroll lock direction. Default is `y`. |
| onWheel | `function` | Callback function when component is scrolled. |
| stopPropagation | `bool` | Fires `event.stopPropagation()`. Default is `false`. |
