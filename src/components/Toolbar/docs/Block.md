# Block

A Toolbar.Block component is a layout-based component used within [Toolbar](./Toolbar.md). This component fills up space between or around [Toolbar.Item](./Item.md) components.

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
