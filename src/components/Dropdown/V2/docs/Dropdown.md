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

| Prop                | Type                     | Default      | Description                                                                     |
| ------------------- | ------------------------ | ------------ | ------------------------------------------------------------------------------- |
| activeClassName     | `string`                 | `is-active`  | ClassName for an active item.                                                   |
| clearOnSelect       | `boolean`                | `true`       | Removes selected item on select.                                                |
| closeOnSelect       | `boolean`                | `true`       | Closes Dropdown on select.                                                      |
| children            | `Function`               |              | Render prop to customize the Dropdown contents.                                 |
| direction           | `string`                 | `down`       | Preferred for the menu to drop.                                                 |
| dropUp              | `boolean`                | `false`      | Changes the dropdown to drop upwards.                                           |
| enableTabNavigation | `boolean`                | `true`       | Enables Tab keypresses to navigate through items.                               |
| envNode             | `Document`/`HTMLElement` | `document`   | Node to bind global events.                                                     |
| focusClassName      | `string`                 | `is-focused` | ClassName for a focused item.                                                   |
| index               | `string`                 |              | Current selected item index.                                                    |
| inputValue          | `string`                 |              |                                                                                 | Used when constructing a filterable Dropdown. |
| id                  | `string`                 |              | ID of the component.                                                            |
| innerRef            | `Function`               |              | Retrieves the Dropdown DOM node.                                                |
| items               | `Array<Object>`          | `[]`         | Items to render.                                                                |
| isLoading           | `boolean`                | `false`      | Renders the loading UI.                                                         |
| onBlur              | `Function`               |              | Callback when the Trigger blurs.                                                |
| onFocus             | `Function`               |              | Callback when the Trigger focuses.                                              |
| onOpen              | `Function`               |              | Callback when the dropdown opens.                                               |
| onClose             | `Function`               |              | Callback when the dropdown closes.                                              |
| onSelect            | `Function`               |              | Callback an item is selected.                                                   |
| maxHeight           | `number`                 | `320`        | Maximum height for the menu.                                                    |
| maxWidth            | `number`                 | `360`        | Maximum width for the menu.                                                     |
| minHeight           | `number`                 | `48`         | Minimum width for the menu.                                                     |
| minWidth            | `number`                 | `180`        | Minimum width for the menu.                                                     |
| menuRef             | `Function`               |              | Retrieves the Dropdown Menu DOM node.                                           |
| openClassName       | `string`                 | `is-open`    | ClassName for an open item (with a sub menu).                                   |
| renderEmpty         | `Function`               |              | Callback to render the empty UI.                                                |
| renderLoading       | `Function`               |              | Callback to render the loading UI.                                              |
| renderItem          | `Function`               |              | Callback to customize how an item renders.                                      |
| renderTrigger       | `Function`               |              | Callback to customize how an trigger renders.                                   |
| selectedItem        | `string`/`Object`        |              | Controls the dropdown and sets the "active" item.                               |
| stateReducer        | `Function`               |              | Callback when the store state changes. Can be used to customize Dropdown state. |
| subscribe           | `Function`               |              | Subscribes to internal Dropdown state changes.                                  |
| trigger             | `string`                 | `Dropdown`   | The text to render into the trigger.                                            |
| triggerRef          | `Function`               |              | Retrieves the Dropdown Trigger DOM node.                                        |
| triggerStyle        | `Object`                 |              | Inline styles for the Trigger wrapper.                                          |
| withScrollLock      | `boolean`                | `true`       | Scroll locks the Dropdown menu.                                                 |
| zIndex              | `number`                 | `1080`       | CSS `z-index` for the menu.                                                     |

### Types

| Prop      | Types         |
| --------- | ------------- |
| direction | `up` / `down` |
