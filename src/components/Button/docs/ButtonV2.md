# Button (V2)

Actionable HTML buttons with basic styling.

This component's API varies slightly compared to [Button V1](./ButtonV1.md).

## Examples

The V2 Button can be rendered by using the `version` prop with the value of `2`.

```jsx
<Button version={2}>Assemble News Team</Button>
```

Alternatively, [PropProvider](../../PropProvider) can be used to set this prop at a higher scope leve.

```jsx
<PropProvider value={{ Button: { version: 2 } }}>
  ...
  <Button>Assemble News Team</Button>
  ...
</PropProvider>
```

## Props

| Prop                         | Type       | Description                                                                     |
| ---------------------------- | ---------- | ------------------------------------------------------------------------------- |
| allowContentEventPropogation | `boolean`  | Enables child events to pass through to Button. Default `true`.                 |
| className                    | `string`   | Custom class names to be added to the component.                                |
| disabled                     | `boolean`  | Disable the button so it can't be clicked.                                      |
| disabledOnLoading            | `boolean`  | Disables the button when `isLoading` is true. Default `true`.                   |
| fetch                        | `function` | function which returns a promise, will be invoked before routing the `to` route |
| href                         | `string`   | Hyperlink for the button. This transforms the button to a `<a>` selector.       |
| innerRef                     | `function` | Retrieves the `button` DOM node.                                                |
| isFocused                    | `boolean`  | Renders the focused style.                                                      |
| isLoading                    | `boolean`  | Renders a loading [Spinner](../../Spinner).                                     |
| isSuffix                     | `boolean`  | Renders suffix styles.                                                          |
| onBlur                       | `function` | `onBlur` event handler.                                                         |
| onClick                      | `function` | `onClick` event handler.                                                        |
| onFocus                      | `function` | `onFocus` event handler.                                                        |
| kind                         | `string`   | Applies the specified style to the button.                                      |
| size                         | `string`   | Sets the size of the button. Can be one of `"sm"`, `"md"` or `"lg"`.            |
| spinButtonOnLoading          | `boolean`  | A special property that... spins the button if `isLoading`.                     |
| state                        | `string`   | Applies state styles to the button.                                             |
| submit                       | `boolean`  | Sets the `type` of the button to `"submit"`.                                    |
| version                      | `number`   | Applies the version `2` variant of the button.                                  |
| theme                        | `string`   | Applies a theme based style to the button.                                      |
| to                           | `string`   | React Router path to navigate on click.                                         |

## Kinds

| Value          | Description                                                                              |
| -------------- | ---------------------------------------------------------------------------------------- |
| `primary`      | Renders a blue button. Used for primary actions.                                         |
| `primaryAlt`   | Renders a purple button. Used for primary actions.                                       |
| `secondary`    | Renders a white button with a border. Used for secondary actions.                        |
| `secondaryAlt` | Renders a white button with a green border. Used for secondary actions.                  |
| `default`      | Renders a borderless button. Used for subtle/tertiary actions.                           |
| `link`         | Renders a button that looks like a [Link](../../Link). Used for subtle/tertiary actions. |

## States

These states can be used with `primary` or `default` kinds.

| Value     | Description                   |
| --------- | ----------------------------- |
| `danger`  | Renders error red color.      |
| `success` | Renders success green color.  |
| `gray`    | Renders gray color.           |
| `warning` | Renders warning orange color. |
