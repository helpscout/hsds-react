# DropdownHeader

A SideNavigation.DropdownHeader component is a dropdown-based component used within [SideNavigation.Header](./Header.md).
The goal of this component is to wrap the dropdown trigger with a [SideNavigation.Heading](./Heading.md) reducing the friction to setup a dropdown inside the [SideNavigation.Header](./Header.md).
The component is also responsible to generate an unique id, that will be use to track which dropdown is opened inside the SideNavigation

## Example

```jsx
<SideNavigation>
  <SideNavigation.Header>
    <SideNavigation.DropdownHeader>
      dropdown trigger
    </SideNavigation.DropdownHeader>
  </SideNavigation.Header>
</SideNavigation>
```

## Props

| Prop      | Type     | Description                                              |
| --------- | -------- | -------------------------------------------------------- |
| className | `string` | Custom class names to be added to the component.         |
| children  | `any`    | What will be pass to be rendered as the dropdown trigger |
