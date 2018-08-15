# Emoticion

An Emoticon component renders an SVG emoticon icon.

## Example

```jsx
<Emoticon name='happy' />
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| center | `bool` | Center aligns component. |
| className | `string` | Custom class names to be added to the component. |
| clickable | `bool` | Enables the component to be clickable. Default `true`. |
| inline | `bool` | Displays the component as `inline-block`. |
| isActive | `bool` | Determines the emoticon color. Default `true`. |
| name | `string` | Determines the SVG image. Required. |
| onClick | `function` | Callback function when component is clicked. |
| size | `number`/`string` | Adjusts the size of the component. |
| title | `string` | Provides a name for the component. |
