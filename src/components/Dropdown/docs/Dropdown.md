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

| Prop | Type | Description |
| --- | --- | --- |
| onClose | function | Callback when component is closed. |
| onSelect | function | Callback when item is selected. |
| closeMenuOnClick | boolean | Closes component when item is clicked. Default is `true`. |
| direction | string | Determines the preferred "drop" direction. Accepts `left`, `right`, `up`, `down`, or a combination of horizontal/vertical directions. |
| isOpen | boolean | Determines if component is open/rendered. |
| selectedIndex | number | Pre-select an item based on it's index number. |
