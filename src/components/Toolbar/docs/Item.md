# Item

A Toolbar.Item component is a layout-based component used within [Toolbar](./Toolbar.md). This component takes up as much space as it's content requires.

This component is a wrapper for [Flexy.Block](../../Flexy/docs/Block.md).


## Example

```jsx
<Toolbar>
  <Toolbar.Item>
    <Icon name='chat' />
  </Toolbar.Item>
  <Toolbar.Block>
    <Heading>News Team!</Heading>
  </Toolbar.Block>
</Toolbar>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |
| inline | `bool` | Typically not necessary, but can remedy nested flexbox layout issues. |
