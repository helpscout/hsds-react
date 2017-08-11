# Portal

A Portal component provides the ability to mount components at the root `<body>` level of the DOM, regardless of their current location in the DOM tree. This is useful for interactions like [Modals](../Modal) or Popovers.


## Example

```html
<Portal>
  <Card>
    Happy! Happy! Ha ha ha ha!
  </Card>
</Portal>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| id | string | The ID for the component. |
| timeout | number | Delay before the Portal'ed component is unmounted from the DOM. Default is `0`. |
