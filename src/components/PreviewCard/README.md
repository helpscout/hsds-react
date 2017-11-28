# PreviewCard

A PreviewCard component is an enhanced [Card](../Card), with slight adjustments to presentation UI.


## Example

```js
<PreviewCard title='Not Now, Arctic Puffin!'>
  **SOBS**
</PreviewCard>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| borderless | `bool` | Removes the border from the component. |
| className | `string` | Custom class names to be added to the component. |
| flex | `bool` | Adds flexbox styles to the component. |
| hover | `bool` | Adds a hover style to the component. |
| href | `string` | Adds an `href` to the component. Transforms it into an `<a>` tag. |
| onBlur | `function` | Callback when the component is blurred. |
| onClick | `bool`/`function` | Callback when the component is clicked. |
| onFocus | `function` | Callback when the component is focused. |
| seamless | `bool` | Removes the padding within the component. |
| selector | `string` | Determines the HTML tag for the component. Default is `div`. |
| title | `string` | Title text to render into the component. |
