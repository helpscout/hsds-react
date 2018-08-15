# Item

An Item component is a list-item wrapper for individual actions or links that appear within a Dropdown [Menu](./Menu.md)

## Example

```jsx
<Dropdown.Menu>
  <Dropdown.Item onClick={saySignOff}>
    Ron
  </Dropdown.Item />
</Dropdown.Menu>
```

## Props

| Prop                | Type              | Description                                                               |
| ------------------- | ----------------- | ------------------------------------------------------------------------- |
| className           | `string`          | Custom class names to be added to the component.                          |
| enableTabNavigation | `bool`            | Enables `tab` keypress to navigation up/down the menu. Default `false`.   |
| isFocused           | `bool`            | Determines the focus state/style of the component.                        |
| isHover             | `bool`            | Determines the hover state/style of the component.                        |
| isOpen              | `bool`            | Determines if the nested Menu is open/closed.                             |
| itemIndex           | `number`          | Used by [Menu](./Menu.md) to identify/track the component.                |
| onBlur              | `function`        | Callback when select is blurred.                                          |
| onClick             | `function`        | Callback when select is focused.                                          |
| onFocus             | `function`        | Callback when select is focused.                                          |
| onMenuClose         | `function`        | Callback when nested Menu is closed.                                      |
| onMouseEnter        | `function`        | Callback when mouse enters the component.                                 |
| onMouseLeave        | `function`        | Callback when mouse leaves the component.                                 |
| onParentMenuClose   | `function`        | Callback from parent [Menu](./Menu.md) to recursively close parent Menus. |
| onSelect            | `function`        | Callback when component is selected.                                      |
| value               | `string`/`number` | The value of this item.                                                   |
