# Card

A Card component is used to encapsulate pieces of UI that share a common concept or action.


## Example

```jsx
<Card>
  You're my boy, Blue!
</Card>
```


## Link

If a `to` or `href` prop is passed into the Card component, it will render the [Link](../../Link) component, which provides additional link-based props.

```jsx
<Card href='https://www.helpscout.net/'>
  You're my boy, Blue!
</Card>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| onBlur | `function` | Callback when the component is blurred. |
| onClick | `boolean`/`function` | Callback when the component is clicked. |
| onFocus | `function` | Callback when the component is focused. |
| borderless | `boolean` | Removes the border from the component. |
| className | `string` | Custom class names to be added to the component. |
| flex | `boolean` | Adds flexbox styles to the component. |
| hover | `boolean` | Adds a hover style to the component. |
| href | `string` | Adds an `href` to the component. Transforms it into an `<a>` tag. |
| seamless | `boolean` | Removes the padding within the component. |
| selector | `string` | Determines the HTML tag for the component. Default is `div`. |
