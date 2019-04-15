# TabBar

This component is provides navigation interactions with support for [react-router](https://github.com/ReactTraining/react-router). The [TabBar.Item](./Item.md) component is a simple link to the [Nav.Item](../Nav/docs/Item.md) component.

## Example

```jsx
<TabBar>
  <TabBar.Item exact to="/">
    Home
  </TabBar.Item>
  <TabBar.Item exact to="/about">
    About
  </TabBar.Item>
  <TabBar.Item exact to="/contact">
    Contact
  </TabBar.Item>
</TabBar>
```

## Props

| Prop      | Type     | Default | Description                     |
| --------- | -------- | ------- | ------------------------------- |
| className | `string` |         | The className of the component. |
