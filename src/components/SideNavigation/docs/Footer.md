# Footer

A SideNavigation.Footer component is a layout-based component used within [SideNavigation](../README.md).

## Example

```jsx
<SideNavigation>
  <SideNavigation.Footer>
    <SideNavigation.Button>New conversation</SideNavigation.Button>
  </SideNavigation.Footer>
</SideNavigation>
```

## Props

| Prop         | Type      | Description                                                |
| ------------ | --------- | ---------------------------------------------------------- |
| className    | `string`  | Custom class names to be added to the component.           |
| collapsed    | `boolean` | When active, it replaces the footer with a three dots icon |
| floatingMenu | `boolean` | When active it adds a border on top of the footer          |
