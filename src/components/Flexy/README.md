# Flexy

A Flexy component is a layout-based component that uses Flexbox to intelligently align elements together. Flexy can be helpful to vertically align UI elements of varying heights.

For more information on the Flexy design patter, check out [`seed-flexy`](http://developer.helpscout.net/seed/packs/seed-flexy/).


## Example

```html
<Flexy>
  <Flexy.Item>
    <Icon name='chat' />
  </Flexy.Item>
  <Flexy.Block>
    <Heading>News Team!</Heading>
  </Flexy.Block>
</Flexy>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| align | string | Determines the vertical alignment of Flexy child elements. Default is `middle`. |
| className | string | Custom class names to be added to the component. |
| gap | string | Determines the amount of spacing between Flexy child elements. |
| just | string | Determines the horizontal alignment of Flexy child elements. |
