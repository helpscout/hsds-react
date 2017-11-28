# Menu

A Menu component contains the series of [Item](../Item) components used within a [Dropdown](./Dropdown.md). This component is composed using the [Drop](../../Drop) higher-order component.


## Example

```jsx
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
| className | `string` | Custom class names to be added to the component. |
| closeMenuOnClick | `bool` | Closes component when item is clicked. Default is `true`. |
| enableCycling | `bool` | Cycles item selection in a when up/down arrows are pressed. Default is `false.` |
| isOpen | `bool` | Determines if component is open/rendered. |
| onSelect | `function` | Callback when [Item](./Item.md) is selected. |
| selectedIndex | `number` | Pre-select an item based on it's index number. |


### Render hooks

This component has special callback props tied into it's mounting cycle.

| Prop | Type | Description |
| --- | --- | --- |
| onBeforeOpen | `function` | Fires when the component is mounted, but not rendered. |
| onOpen | `function` | Fires as soon as the component has rendered. |
| onBeforeClose | `function` | Fires when the component is about to unmount. |
| onClose | `function` | Fires after the component is unmounted. |

See [Portal's documentation](../Portal#render-hooks) for more details.
