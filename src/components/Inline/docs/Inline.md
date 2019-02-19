# Inline

A Inline component is a layout-based component that contains [Inline.Item](./Item.md) components. This component properly align adjacent elements together with consideration for overflow. These classes help ensure that UI elements have adequete spacing, even in situations where the layout forces the items to wrap.

For more information on the Inline design pattern, check out [`seed-inline`](https://developer.helpscout.com/seed/packs/seed-inline/).

## Example

```jsx
<Inline>
  <Inline.Item>
    <Icon name="chat" />
  </Inline.Item>
  <Inline.Item>
    <Icon name="tick" />
  </Inline.Item>
  <Inline.Item>
    <Icon name="meatball" />
  </Inline.Item>
</Inline>
```

## Props

| Prop      | Type     | Description                                         |
| --------- | -------- | --------------------------------------------------- |
| className | `string` | Custom class names to be added to the component.    |
| size      | `string` | Determines the horizontal padding of the component. |

## Size

| Value | Description                           |
| ----- | ------------------------------------- |
| `lg`  | Horizontal padding of `10px`.         |
| `md`  | Horizontal padding of `8px`.          |
| `sm`  | Horizontal padding of `4px`. Default. |
| `xs`  | Horizontal padding of `2px`.          |
