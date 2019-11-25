# Dropdown

A Dropdown component is provides the UI to contain a series of actions, presented in a menu overlay.

## Example

```jsx
<Dropdown items={[...]} />
```

### Custom Trigger

To customize the dropdown trigger, pass any component into the `renderTrigger` prop.

```jsx
<Dropdown items={[...]} renderTrigger={<div>My Trigger!</div>} />
```

### Customizing the Menu/Items

The `children` prop renders with an `Object` containing an **enhanced** listing of the original `item`. These enhanced items have special click handlers and other props that allow for the dropdowns to work.

```jsx
<Dropdown items={...}>
  {({ items }) => (
    <Dropdown.Menu>
      <CustomComponent />
      {items.map(item => <MyCustomItem {...item} />)}
    </Dropdown.Menu>
  )}
</Dropdown>
```

### Async

This component supports async rendering of items. Render the `Dropdown` as you would normally. Provide the component with a `renderLoading` and `isLoading`. Adjust `isLoading` and `items` from your source of state as required.

```jsx
<Dropdown items={[...]} isLoading={true} renderLoading={() => <div>Loading...</div>} />
```

## Props

| Prop                      | Type                     | Default      | Description                                                                                                  |
| ------------------------- | ------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------ |
| activeClassName           | `string`                 | `is-active`  | ClassName for an active item.                                                                                |
| cardBorderColor           | `string`                 |              | Customize the Dropdown Card border color.                                                                    |
| clearOnSelect             | `boolean`                | `true`       | Removes selected item on select.                                                                             |
| closeOnSelect             | `boolean`                | `true`       | Closes Dropdown on select.                                                                                   |
| contentWindow             | `window/object`          | `window`     | Custom window object (e.g. iframe window object)                                                             |
| children                  | `Function`               |              | Render prop to customize the Dropdown contents.                                                              |
| direction                 | `string`                 | `right`      | Preferred horizontal drop direction for the menu.                                                            |
| disabled                  | `bool`                   | `false`      | Disable the dropdown trigger so it can't be clicked.                                                         |
| dropUp                    | `boolean`                | `false`      | Changes the dropdown to drop upwards.                                                                        |
| enableTabNavigation       | `boolean`                | `true`       | Enables Tab keypresses to navigate through items.                                                            |
| envNode                   | `Document`/`HTMLElement` | `document`   | Node to bind global events.                                                                                  |
| focusClassName            | `string`                 | `is-focused` | ClassName for a focused item.                                                                                |
| forceDropDown             | `boolean`                | `false`      | Forces the dropdown to always drop downwards. Overrides `dropUp`.                                            |
| index                     | `string`                 |              | Current selected item index.                                                                                 |
| inputValue                | `string`                 |              | Used when constructing a filterable Dropdown.                                                                |
| id                        | `string`                 |              | ID of the component.                                                                                         |
| innerRef                  | `Function`               |              | Retrieves the Dropdown DOM node.                                                                             |
| items                     | `Array<Object>`          | `[]`         | Items to render.                                                                                             |
| isLoading                 | `boolean`                | `false`      | Renders the loading UI.                                                                                      |
| isFocusSelectedItemOnOpen | `boolean`                | `false`      | Focuses the selected item when the dropdown opens.                                                           |
| isSelectFirstItemOnOpen   | `boolean`                | `false`      | Selects the first item when the dropdown opens.                                                              |
| onBlur                    | `Function`               |              | Callback when the Trigger blurs.                                                                             |
| onFocus                   | `Function`               |              | Callback when the Trigger focuses.                                                                           |
| onOpen                    | `Function`               |              | Callback when the dropdown opens.                                                                            |
| onClose                   | `Function`               |              | Callback when the dropdown closes.                                                                           |
| onSelect                  | `Function`               |              | Callback when an item is selected/deselected.                                                                |
| maxHeight                 | `number`                 | `320`        | Maximum height for the menu.                                                                                 |
| maxWidth                  | `number`                 | `360`        | Maximum width for the menu.                                                                                  |
| minHeight                 | `number`                 | `48`         | Minimum width for the menu.                                                                                  |
| minWidth                  | `number`                 | `180`        | Minimum width for the menu.                                                                                  |
| menuRef                   | `Function`               |              | Retrieves the Dropdown Menu DOM node.                                                                        |
| openClassName             | `string`                 | `is-open`    | ClassName for an open item (with a sub menu).                                                                |
| positionFixed             | `boolean`                | `false`      | Renders menu as position `fixed`. Otherwise, it's `absolute`.                                                |
| renderEmpty               | `Function`               |              | Callback to render the empty UI.                                                                             |
| renderLoading             | `Function`               |              | Callback to render the loading UI.                                                                           |
| renderItem                | `Function`               |              | Callback to customize how an item renders.                                                                   |
| renderTrigger             | `Function`               |              | Callback to customize how an trigger renders.                                                                |
| selectedItem              | `string`/`Object`        |              | Controls the dropdown and sets the "active" item.                                                            |
| allowMultipleSelection    | `boolean`                |              | Allows selection of multiple items from the dropdown (when stateful)                                         |
| shouldDropDirectionUpdate | `Function`               |              | Callback to determine if the dropdown should update it's `up`/`down` drop direction. Default returns `true`. |
| shouldRefocusOnClose      | `Function`               |              | Callback to determine if the dropdown refocus the trigger on close. Default returns `true`.                  |
| stateReducer              | `Function`               |              | Callback when the store state changes. Can be used to customize Dropdown state.                              |
| subscribe                 | `Function`               |              | Subscribes to internal Dropdown state changes.                                                               |
| trigger                   | `string`                 | `Dropdown`   | The text to render into the trigger.                                                                         |
| triggerRef                | `Function`               |              | Retrieves the Dropdown Trigger DOM node.                                                                     |
| triggerStyle              | `Object`                 |              | Inline styles for the Trigger wrapper.                                                                       |
| withScrollLock            | `boolean`                | `true`       | Scroll locks the Dropdown menu.                                                                              |
| zIndex                    | `number`                 | `1080`       | CSS `z-index` for the menu.                                                                                  |

### `onSelect`

Arguments: `event`, `item` clicked, `deselected`: whether the item was selected or deselected (in cases where the dropdown is stateful), `dropdownType`

### Types

| Prop      | Types         |
| --------- | ------------- |
| direction | `up` / `down` |

### `shouldUpdateDirection(Position)`

| Prop          | Type          | Description                                                |
| ------------- | ------------- | ---------------------------------------------------------- |
| top           | `number`      | The distance of the Menu node from the top of the window.  |
| left          | `number`      | The distance of the Menu node from the left of the window. |
| position      | `string`      | The position (e.g. `fixed`) defined in props.              |
| triggerNode   | `HTMLElement` | The Trigger DOM node.                                      |
| placementNode | `HTMLElement` | The wrapper DOM node for the Menu.                         |
| menuNode      | `HTMLElement` | The Menu DOM node.                                         |
| zIndex        | `number`      | The z-index value defined in props.                        |
