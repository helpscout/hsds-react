# Card

A Card component is used to encapsulate pieces of UI that share a common concept or action.


## Example

```html
<Card>
  Not new, Arctic Puffin!
</Card>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| onBlur | function | Callback when the component is blurred. |
| onClick | boolean or function | Callback when the component is clicked. |
| onFocus | function | Callback when the component is focused. |
| className | string | Custom class names to be added to the component. |
| hover | boolean | Adds a hover style to the component. |
| href | string | Adds an `href` to the component. Transforms it into an `<a>` tag. |
| seamless | boolean | Removes the padding within the component. |
| selector | string | Determines the HTML tag for the component. Default is `div`. |
