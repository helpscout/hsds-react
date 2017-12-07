# Item

A Inline.Item component is a layout-based component used within [Inline](./Inline.md). This component provide uniform margin spacing between sibling Inline.Item components.

For more information on the Inline design pattern, check out [`seed-inline`](https://developer.helpscout.com/seed/packs/seed-inline/).

## Example

```jsx
<Inline>
  <Inline.Item>
    <Icon name='chat' />
  </Inline.Item>
  <Inline.Item>
    <Icon name='tick' />
  </Inline.Item>
  <Inline.Item>
    <Icon name='meatball' />
  </Inline.Item>
</Inline>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |
| extendChild | `bool` | Combines the component's classNames and props with the child component. |
