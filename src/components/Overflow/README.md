# Overflow

An Overflow component is a wrapper that handle horizontal overflow for UI (typically a collection of components). Overflow automatically renders a "fade" effect for overflowing content.


## Example

```jsx
<Overflow>
  <List>
    <List.Item>...</List.Item>
    <List.Item>...</List.Item>
    <List.Item>...</List.Item>
  </List>
</Overflow>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| backgroundColor | `string` | Background color for the fade elements. |
| className | `string` | Custom class names to be added to the component. |
| isScrollable | `bool` | Enables horizontal scrolling on overflow. Default is `true`. |
| onScroll | `function` | Callback function when component is scrolled. |
| scrollableRef | `function` | Retrieves the scrollable node. |
