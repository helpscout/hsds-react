## Card.Block

A Card.Block component is used to section content within a [`<Card>`](../Card).

Note: It is highly recommended the `seamless` prop is used for the container `<Card>`. This allows for the `<Card.Block>` components to flow all the way to the inner-edges of `<Card>`.


## Example

```jsx
<Card seamless>
  <Card.Block>
    Frank "The Tank"
  </Card.Block>
  <Card.Block>
    You're my boy, Blue!
  </Card.Block>
</Card>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| bgMuted | `bool` | Applies a muted background to the component. |
| className | `string` | Custom class names to be added to the component. |
| flex | `bool` | Adds flexbox styles to the component. |
| onScroll | `function` | Callback function when inner Scrollable is scrolled. |
| scrollable | `bool` | Integrates [Scrollable](../Scrollable) into the component. |
| scrollableRef | `function` | Retrieves the scrollable node. |
| size | `string` | Adjusts the size of the component. Default is `md`. |
