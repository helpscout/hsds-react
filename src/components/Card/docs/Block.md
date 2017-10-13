## Card.Block

A Card.Block component is used to section content within a [`<Card>`](../Card).

Note: It is highly recommended the `seamless` prop is used for the container `<Card>`. This allows for the `<Card.Block>` components to flow all the way to the inner-edges of `<Card>`.


## Example

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


## Props

| Prop | Type | Description |
| --- | --- | --- |
| bgMuted | boolean | Applies a muted background to the component. |
| className | string | Custom class names to be added to the component. |
| flex | boolean | Adds flexbox styles to the component. |
| scrollable | boolean | Integrates [Scrollable](../Scrollable) into the component. |
| size | string | Adjusts the size of the component. Default is `md`. |
