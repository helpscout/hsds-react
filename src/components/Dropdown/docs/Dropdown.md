# Dropdown

A Dropdown component is provides the UI to contain a series of actions, presented in a menu overlay.

## Example

```jsx
<Dropdown>
  <Dropdown.Trigger>Action</Dropdown.Trigger>
  <Dropdown.Menu>
    <Dropdown.Item>Ron</Dropdown.Item>
    <Dropdown.Item>Champ</Dropdown.Item>
    <Dropdown.Item>Brian</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item>Brick</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
```

## Props

| Prop                | Type       | Description                                                                                                                           |
| ------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| className           | `string`   | Custom class names to be added to the component.                                                                                      |
| closeMenuOnClick    | `bool`     | Closes component when item is clicked. Default is `true`.                                                                             |
| direction           | `string`   | Determines the preferred "drop" direction. Accepts `left`, `right`, `up`, `down`, or a combination of horizontal/vertical directions. |
| enableTabNavigation | `bool`     | Enables `tab` keypress to navigation up/down the menu. Default `false`.                                                               |
| isOpen              | `bool`     | Determines if component is open/rendered.                                                                                             |
| onClose             | `function` | Callback when component is closed.                                                                                                    |
| onSelect            | `function` | Callback when item is selected.                                                                                                       |
| selectedIndex       | `number`   | Pre-select an item based on it's index number.                                                                                        |
