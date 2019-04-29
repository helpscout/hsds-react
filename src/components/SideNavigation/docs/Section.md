# Header

A SideNavigation.Section component is a layout-based component used within [SideNavigation](../README.md) that wraps all [SideNavigation.Item](./Item.md).

## Example

```jsx
<SideNavigation>
  <SideNavigation.Section>
    <SideNavigation.Item icon={<Icon name="user" />} count={25}>
      Item #1
    </SideNavigation.Item>
    <SideNavigation.Item href="https://google.com/">
      Item #2
    </SideNavigation.Item>
  </SideNavigation.Section>
</SideNavigation>
```

## Props

| Prop        | Type      | Description                                                  |
| ----------- | --------- | ------------------------------------------------------------ |
| main        | `boolean` | It keep the section visible when SideNavigation is collapsed |
| className   | `string`  | Custom class names to be added to the component.             |
| withPadding | `boolean` | It add the same padding as the Item inside the section       |
| title       | `string`  | If it exists, it will add a heading to the section           |
