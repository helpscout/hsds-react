# Card

A Card component is used to encapsulate pieces of UI that share a common concept or action.


### Example

```html
<Card>
  You're my boy, Blue!
</Card>
```

### Props

| Prop | Type | Description |
| --- | --- | --- |
| borderless | boolean | Removes the border from the component. |
| onBlur | function | Callback when the component is blurred. |
| onClick | boolean or function | Callback when the component is clicked. |
| onFocus | function | Callback when the component is focused. |
| className | string | Custom class names to be added to the component. |
| flex | boolean | Adds flexbox styles to the component. |
| hover | boolean | Adds a hover style to the component. |
| href | string | Adds an `href` to the component. Transforms it into an `<a>` tag. |
| seamless | boolean | Removes the padding within the component. |
| selector | string | Determines the HTML tag for the component. Default is `div`. |



## Card.Block

A Card.Block component is used to section content within a [`<Card>`](../Card).

Note: It is highly recommended the `seamless` prop is used for the container `<Card>`. This allows for the `<Card.Block>` components to flow all the way to the inner-edges of `<Card>`.


### Example

```html
<Card seamless>
  <Card.Block>
    Frank "The Tank"
  </Card.Block>
  <Card.Block>
    You're my boy, Blue!
  </Card.Block>
</Card>
```


### Props

| Prop | Type | Description |
| --- | --- | --- |
| bgMuted | boolean | Applies a muted background to the component. |
| className | string | Custom class names to be added to the component. |
| flex | boolean | Adds flexbox styles to the component. |
| scrollable | boolean | Integrates [Scrollable](../Scrollable) into the component. |
| size | string | Adjusts the size of the component. Default is `md`. |
