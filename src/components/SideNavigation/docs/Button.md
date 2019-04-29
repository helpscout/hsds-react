# Button

A SideNavigation.Button component is a button-based component used within [SideNavigation.Footer](./Footer.md).
Different style could be applied to this button depending of the context of the SideNavigation component (if it's a floating menu).

## Example

```jsx
<SideNavigation>
  <SideNavigation.Footer>
    <SideNavigation.Button>New conversation</SideNavigation.Button>
  </SideNavigation.Footer>
</SideNavigation>
```

## Props

| Prop      | Type     | Description                                         |
| --------- | -------- | --------------------------------------------------- |
| className | `string` | Custom class names to be added to the component.    |
| icon      | `Icon`   | Render an icon to the beginning of the button.      |
| iconName  | `string` | Add an icon to the beginning of the button by name. |
