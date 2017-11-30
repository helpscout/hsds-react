# Icon

An Icon component renders an SVG icon.

## Example

```jsx
<Icon name='emoji' />
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |
| clickable | `bool` | Enables the component to be clickable. |
| ignoreClick | `bool` | Ignores click events. Bubbles click event to parent component. |
| muted | `bool` | Applies muted styles. |
| name | `string` | Determines the SVG image. Required. |
| onClick | `function` | Callback function when component is clicked. |
| size | `number`/`string` | Adjusts the size of the component. |
| title | `string` | Provides a name for the component. |
| withCaret | `bool` | Renders a caret icon, next to the component's SVG icon. |
