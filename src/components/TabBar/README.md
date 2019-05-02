# TabBar

This component is provides a Tab-like component with support for [react-router](https://github.com/ReactTraining/react-router). The [TabBar.Item](./Item.md) component is a simple link to the [Nav.Item](../Nav/docs/Item.md) component.

TabBar is a wrapper containing a [Toolbar](../Toolbar/README.md), a [Nav](../Nav/README.md) and a secondary (left or right aligned) content placeholder.

## Example

```jsx
<TabBar secContent="13,333 items">
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

| Prop       | Type     | Default | Description                                                                                         |
| ---------- | -------- | ------- | --------------------------------------------------------------------------------------------------- |
| className  | `string` |         | The className of the component.                                                                     |
| secContent | `any`    |         | A right or left aligned placeholder that will be render inside the toolbar as the secondary content |
