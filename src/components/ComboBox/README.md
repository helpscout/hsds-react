# ComboBox

A ComboBox component renders a filterable list of items, presented in a [Dropdown V2](../Dropdown/V2/docs/Dropdown.md).

## Example

```jsx
<ComboBox items={[...]} />
```

### Customizing the filter

This component uses a very simple filter algorithm to match items. You can use your own custom method for finer-grain control.

#### `customFilter({ hasGroups, items, inputValue }, defaultFilter)`

| Prop          | Type         | Description                                   |
| ------------- | ------------ | --------------------------------------------- |
| hasGroups     | `boolean`    | Determines if the provided items are grouped. |
| items         | `Array<any>` | Collection of initial (unfiltered) items.     |
| inputValue    | `string`     | The search query from the `Input`.            |
| defaultFilter | `Function`   | The default filter algorithm.                 |

In the example below, we'll return an empty collection (`Array`) if there are no `inputValue`. Otherwise, we'll just use the default filter algorithm.

```jsx
const customFilter = ({ hasGroups, items, inputValue }, defaultFilter) => {
  if (!inputValue) return []

  return defaultFilter({hasGroups, items, inputValue})
}

...

<ComboBox items={[...]} customFilter={customFilter} />
```

## Props

| Prop            | Type                                                | Default      | Description                                |
| --------------- | --------------------------------------------------- | ------------ | ------------------------------------------ |
| customFilter    | `Function`                                          |              | Customize the item search filter results.  |
| onInputChange   | `Functoin | | Callback when the inputValue changes. |
| inputProps      | `Object`                                            |              |                                            | Custom props for the inner `Input` component. |
| itemFilterKey   | `string`                                            | `value`      | Key to filter the results against.         |
| noResultsLabel  | `string`                                            | `No results` | Text to display when there are no results. |
| renderMenuStart | `Function`                                          |              |                                            | Custom UI to render before the `Menu`. |
| renderMenuEnd   | `Function`                                          |              |                                            | Custom UI to render after the `Menu`. |
| renderFooter    | `Function`                                          |              |                                            | Custom UI to render in the `Dropdown` footer. |

For additional props, check out [Dropdown V2](../Dropdown/V2/docs/Dropdown.md).
