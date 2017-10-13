# Card

A Card component is used to encapsulate pieces of UI that share a common concept or action.


## Example

```html
<Card>
  You're my boy, Blue!
</Card>
```


## Link

If a `to` or `href` prop is passed into the Card component, it will render the [Link](../../../Link) component, which provides additional link-based props.

```html
<Card href='https://www.helpscout.net/'>
  You're my boy, Blue!
</Card>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| onBlur | function | Callback when the component is blurred. |
| onClick | boolean or function | Callback when the component is clicked. |
| onFocus | function | Callback when the component is focused. |
| onScroll | function | Callback function when inner Scrollable is scrolled. |
| borderless | boolean | Removes the border from the component. |
| className | string | Custom class names to be added to the component. |
| flex | boolean | Adds flexbox styles to the component. |
| hover | boolean | Adds a hover style to the component. |
| href | string | Adds an `href` to the component. Transforms it into an `<a>` tag. |
| scrollableRef | function | Retrieves the scrollable node. |
| seamless | boolean | Removes the padding within the component. |
| selector | string | Determines the HTML tag for the component. Default is `div`. |
