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
