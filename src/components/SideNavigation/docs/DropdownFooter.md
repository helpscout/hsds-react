# DropdownFooter

A SideNavigation.DropdownFooter component is a dropdown-based component used within [SideNavigation.Footer](./Footer.md).
The goal of this component is to wrap the dropdown trigger with a [SideNavigation.Button](./Button.md) reducing the friction to setup a dropdown inside the [SideNavigation.Header](./Header.md).
The component is also responsible to generate an unique id, that will be use to track which dropdown is opened inside the SideNavigation

## Example

```jsx
<SideNavigation>
  <SideNavigation.Footer>
    <SideNavigation.DropdownFooter iconName="user">
      dropdown trigger
    </SideNavigation.DropdownFooter>
  </SideNavigation.Footer>
</SideNavigation>
```

## Props

| Prop      | Type     | Description                                              |
| --------- | -------- | -------------------------------------------------------- |
| className | `string` | Custom class names to be added to the component.         |
| iconName  | `string` | Name of the icon inside the dropdown trigger             |
| children  | `any`    | What will be pass to be rendered as the dropdown trigger |
