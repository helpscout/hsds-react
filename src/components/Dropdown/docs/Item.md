# Item

An Item component is a list-item wrapper for individual actions or links that appear within a Dropdown [Menu](./Menu.md)


## Example

```html
<Dropdown.Menu>
  <Dropdown.Item onClick={saySignOff} />
    Ron
  </Dropdown.Item />
</Dropdown.Menu>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| onBlur | function | Callback when select is blurred. |
| onClick | function | Callback when select is focused. |
| onFocus | function | Callback when select is focused. |
| onMouseEnter | function | Callback when mouse enters the component. |
| onMouseLeave | function | Callback when mouse leaves the component. |
| onMenuClose | function | Callback when nested Menu is closed. |
| onParentMenuClose | function | Callback from parent [Menu](./Menu.md) to recursively close parent Menus. |
| onSelect | function | Callback when component is selected. |
| className | string | Custom class names to be added to the component. |
| isFocused | boolean | Determines the focus state/style of the component. |
| isHover | boolean | Determines the hover state/style of the component. |
| isOpen | boolean | Determines if the nested Menu is open/closed. |
| itemIndex | number | Used by [Menu](./Menu.md) to identify/track the component. |
| value | string/number | The value of this item. |
