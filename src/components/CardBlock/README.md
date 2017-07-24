# CardBlock

A CardBlock component is used to section content within a [`<Card>`](../Card).

Note: It is highly recommended the `seamless` prop is used for the container `<Card>`. This allows for the `<CardBlock>` components to flow all the way to the inner-edges of `<Card>`.


## Example

```js
<Card seamless>
  <CardBlock>
    Block One
  </CardBlock>
  <CardBlock>
    Block Two
  </CardBlock>
</Card>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| size | string | Adjusts the size of the component. Default is `md`. |