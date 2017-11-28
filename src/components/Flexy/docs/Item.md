# Item

A Flexy.Item component is a layout-based component used within [Flexy](./Flexy.md). This component takes up as much space as it's content requires.

For more information on the Flexy design pattern, check out [`seed-flexy`](http://developer.helpscout.net/seed/packs/seed-flexy/).

## Example

```jsx
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
| className | `string` | Custom class names to be added to the component. |
| inline | `bool` | Typically not necessary, but can remedy nested flexbox layout issues. |
