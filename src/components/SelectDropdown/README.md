# SelectDropdown

A SelectDropdown component is an enhanced version of the default HTML `<select>` with a stylized menu UI. It differs from the [Select](../Select) component as it uses [Dropdown](../Dropdown/V2/docs/Dropdown.md) for it's UI interactions.

## Example

```jsx
<SelectDropdown items={[...]} />
```

## Props

| Prop         | Type       | Default   | Description                                                           |
| ------------ | ---------- | --------- | --------------------------------------------------------------------- |
| onChange     | `Function` |           | Callback when an item is selected.                                    |
| errorIcon    | `string`   | `alert`   | [Icon](../Icon) to render for an `error` state.                       |
| errorMessage | `string`   |           | Message to display (in a [Tooltip](../Tooltip)) for an `error` state. |
| isFocused    | `boolean`  |           | Renders the focus UI.                                                 |
| placeholder  | `string`   |           | Placeholder text if there are no selected items.                      |
| state        | `string`   | `default` | State to render for the component.                                    |

For additional customization and props, check out [Dropdown](../Dropdown/V2/docs/Dropdown.md).
