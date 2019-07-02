# FilteredList

A FilteredList component will display a list of items based on a limit number. If the number of items goes over the limit, a badge will be displayed after the list.
Hovering on the badge will show all remainder items in a tooltip

## Example

```jsx
const items = ['item1', 'item2', 'item3']
<FilteredList items={items} limit="2" inline />
```

## Props

| Prop      | Type      | Description                                      |
| --------- | --------- | ------------------------------------------------ |
| className | `string`  | Custom class names to be added to the component. |
| items     | `array`   | List of items that need to be filtered           |
| limit     | `integer` | Number of items visible                          |
| inline    | `bool`    | Display the item inline                          |
