# ActionSelect

This component renders extends the UI of a [SelectDropdown](../SelectDropdown), allowing it to render contextual content within, based on the selected item.

## Example

```jsx
<ActionSelect items={[...]}>
  <Content>
    ...
  </Content>
</ActionSelect>
```

## Props

| Prop                    | Type       | Default | Description                                                        |
| ----------------------- | ---------- | ------- | ------------------------------------------------------------------ |
| animationDuration       | `number`   | `160`   | The animation duration of the height transition.                   |
| animationEasing         | `string`   | `ease`  | The animation easing curve of the height transition.               |
| children                | `any`      |         | Contextual content to render.                                      |
| className               | `string`   |         | The className of the component.                                    |
| ref                     | `Function` |         | Retrieve the inner DOM node.                                       |
| isAutoFocusNodeOnSelect | `boolean`  | `true`  | Autofocuses the first focusable node when an item is selected.     |
| isFadeContentOnOpen     | `boolean`  | `true`  | Fades the content when the dropdown is open.                       |
| onResize                | `Function` |         | Callback when the component's content resizes.                     |
| shouldRefocusOnClose    | `Function` |         | Determines if the trigger should refocus when the dropdown closes. |
| shouldScrollIntoView    | `Function` |         | Determines the component should scroll into view on select.        |

For additional customization and props, check out [SelectDropdown](../SelectDropdown).
