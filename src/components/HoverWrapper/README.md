# HoverWrapper

A HoverWrapper component is a High-Order Component that passes a `isHovered` prop to it's ComposedComponent during a `mouseenter`/`mouseleave` event. This is useful when defining JS-based hover interactions.


## Example

```js
const MyComponent = props => {
  const {
    children,
    isHovered,
  } = props

  const hoveredMarkup = isHovered ? (
    <div>Relax!</div>
  ) : null

  return (
    <div>
      {children}
      {hoveredMarkup}
    </div>
  )
}

export default HoverWrapper(MyComponent)
```


## ComposedProps

| Prop | Type | Description |
| --- | --- | --- |
| isHovered | `boolean` | Whether the node is in a hovered-state. |
