# Menu

A Menu component contains the series of [Item](../Item) components used within a [Dropdown](./Dropdown.md). This component is composed using the [Drop](../Drop) higher-order component.


## Example

```html
<Dropdown>
  <Dropdown.Trigger>Choose…</Dropdown.Trigger>
  <Dropdown.Menu>
    <Dropdown.Item />
    <Dropdown.Item />
    <Dropdown.Item />
  </Dropdown.Menu>
</Dropdown>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| closeMenuOnClick | boolean | Closes component when item is clicked. Default is `true`. |
| enableCycling | boolean | Cycles item selection in a when up/down arrows are pressed. Default is `false.` |
| isOpen | boolean | Determines if component is open/rendered. |
| parentMenu | boolean | Determines if component is a parent menu or sub-menu. |
| selectedIndex | number | Pre-select an item based on it's index number. |
