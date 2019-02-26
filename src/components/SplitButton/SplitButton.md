# SplitButton

A SplitButton component is a wrapper component for [Button V2](../Button/docs/ButtonV2.md) and [`Dropdown V2`](../Dropdown/V2/docs/Dropdown.md) components. It provides a primary function of HTML button along with an additional options menu.

## Example

```jsx
<SplitButton options={[...options]}>Submit</SplitButton>
```

## Props

| Prop          | Type       | Default                                    | Description                                 |
| ------------- | ---------- | ------------------------------------------ | ------------------------------------------- |
| className     | `string`   |                                            | The className of the component.             |
| disabled      | `bool`     | Disable the button so it can't be clicked. |
| dropdownProps | `object`   |                                            | Any valid V2 Dropdown props.                |
| buttonRef     | `function` |                                            | Retrieves the `button` DOM node.            |
| options       | `array`    | `[]`                                       | Items to render in Dropdown.                |
| onClick       | `function` |                                            | The callback when the component is clicked. |
