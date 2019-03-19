# Scrollable

A Scrollable component is light-weight wrapper that enables scrolling for content overflow.
Enable vertically by using: `fade` or `fadeBottom`
Enable horizontally by using: `fadeLeft` or `fadeRight`, this mode is responsive

## Example

```jsx
<Scrollable>
  <div>...</div>
</Scrollable>
```

## Props

| Prop             | Type       | Description                                                                      |
| ---------------- | ---------- | -------------------------------------------------------------------------------- |
| backgroundColor  | `string`   | Background color for the fade elements.                                          |
| className        | `string`   | Custom class names to be added to the component.                                 |
| contentClassName | `string`   | Custom class names for the component's content DOM node.                         |
| fade             | `bool`     | Adds a "fade-to-white" visual experience while scrolling. Appears at the top.    |
| fadeBottom       | `bool`     | Adds a "fade-to-white" visual experience while scrolling. Appears at the bottom. |
| fadeLeft         | `bool`     | Adds a "fade-to-white" visual experience while scrolling. Appears at the Left.   |
| fadeRight        | `bool`     | Adds a "fade-to-white" visual experience while scrolling. Appears at the Right.  |
| onScroll         | `function` | Callback function when component is scrolled.                                    |
| rounded          | `bool`     | Enables rounded corners for the top fade element.                                |
| scrollableRef    | `function` | Retrieves the scrollable node.                                                   |
