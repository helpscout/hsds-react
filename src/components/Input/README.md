# Input

An Input component is an enhanced version of the default HTML `<input>`. Input can be transformed into a `<textarea>` if the `multiline` prop is defined.

## Example

### Input

```jsx
<Input
  value="Stay classy San Diego"
  placeholder="Please enter sign-off catch-phrase"
  autoFocus
/>
```

### Textarea

```jsx
<Input
  multiline={3}
  placeholder="Please enter sign-off catch-phrase."
  autoFocus
/>
```

### Action

Actions (typically [Buttons](../Button)) can be embedded within the `Input` using the `action` prop:

```jsx
<Input
  action={
    <Button version={2} size="sm">
      Submit
    </Button>
  }
/>
```

The `Button` should be one step smaller compared to the `Input`.

Example:

If the `Input` is `md` (default), then the `Button` should be `sm`.

If the `Input` is `sm`, then the `Button` should be `xs`.

Note: Be sure the version for `Button` is at least version 2.

## Props

| Prop                     | Type                       | Description                                                                |
| ------------------------ | -------------------------- | -------------------------------------------------------------------------- |
| action                   | `React.Component`          | Embedded actions for the Input.                                            |
| autoFocus                | `boolean`                  | Automatically focuses the input.                                           |
| className                | `string`                   | Custom class names to be added to the component.                           |
| disabled                 | `boolean`                  | Disable the input.                                                         |
| errorIcon                | `string`                   | Icon that renders when the state is `error`.                               |
| errorMessage             | `string`                   | Error message that renders into a Tooltip.                                 |
| forceAutoFocusTimeout    | `boolean`                  | Determines the amount of time (`ms`) for the component to focus on mount.  |
| hasCarriageReturns       | `boolean`                  | If `true` and `enter + special` key is pressed, a return will be inserted  |
| helpText                 | `string`/`React.Component` | Displays text underneath input.                                            |
| hintText                 | `string`/`React.Component` | Displays text above input.                                                 |
| id                       | `string`                   | ID for the input.                                                          |
| inlinePrefix             | `string`                   | Text to appear before the input.                                           |
| inlineSuffix             | `string`                   | Text to after before the input.                                            |
| innerRef                 | `Function`                 | Retrieves the `input` DOM node.                                            |
| isFirst                  | `boolean`                  | Helps render component without right borders.                              |
| isFocused                | `string`                   | Determines if the component is focused.                                    |
| isLast                   | `boolean`                  | Helps render component without left borders.                               |
| isNotOnly                | `boolean`                  | Helps render component without left/right borders.                         |
| label                    | `string`/`React.Component` | Label for the input.                                                       |
| maxHeight                | `number`/`string`          | Sets the `max-height` for the input. Used with `multiline`.                |
| moveCursorToEnd          | `boolean`                  | Moves the selection cursor to the end, on focus. Default `false`.          |
| multiline                | `boolean`/`number`         | Transforms input into an auto-expanding textarea.                          |
| name                     | `string`                   | Name for the input.                                                        |
| offsetAmount             | `number`                   | Number of characters to offset (bottom-right) for multiline resizing.      |
| onBlur                   | `Function`                 | Callback when input is blurred.                                            |
| onChange                 | `Function`                 | Callback when input value is changed.                                      |
| onEnterDown              | `Function`                 | Callback when `Enter` is pressed down.                                     |
| onEnterUp                | `Function`                 | Callback when `Enter` is pressed up.                                       |
| onFocus                  | `Function`                 | Callback when input is focused.                                            |
| onResize                 | `Function`                 | Callback when input is resized.                                            |
| onStartTyping            | `Function`                 | Callback when user starts typing, rate limited by `typingThrottleInterval` |
| onStopTyping             | `Function`                 | Callback when user stops typing after delay of `typingTimeoutDelay`.       |
| placeholder              | `string`                   | Placeholder text for the input.                                            |
| prefix                   | `any`                      | Component to render before the input.                                      |
| readOnly                 | `boolean`                  | Disable editing of the input.                                              |
| refApplyCallStopTyping   | `Function`                 | Exposes `CallStopTyping`, so that it can be called outside itself.         |
| removeStateStylesOnFocus | `boolean`                  | Removes the `state` styles on input focus. Default `false`.                |
| resizable                | `boolean`                  | Enables resizing for the textarea (only enabled for `multiline`).          |
| scrollLock               | `boolean`                  | Enables scrollLock for component. Default `false`.                         |
| seamless                 | `boolean`                  | Removes the border around the input.                                       |
| size                     | `string`                   | Determines the size of the input.                                          |
| state                    | `string`                   | Change input to state color.                                               |
| suffix                   | `any`                      | Component to render after the input.                                       |
| type                     | `string`                   | Determines the input type.                                                 |
| typingThrottleInterval   | `number`                   | Determines the rate limiting interval for firing `onStartTyping`.          |
| typingTimeoutDelay       | `number`                   | Determines the delay of when `onStopTyping` fires after typing stops.      |
| value                    | `string`                   | Initial value of the input.                                                |
| withTypingEvent          | `boolean`                  | Enables typing `onStartTyping` and `onStopTyping` event callbacks.         |

### States

| Prop      | Description              |
| --------- | ------------------------ |
| `error`   | Changes color to red.    |
| `success` | Changes color to green.  |
| `warning` | Changes color to yellow. |

---

# Input.AddOn

This component renders a "prefix"/"suffix" UI when combined with an [`Input`](./Input.md) when used within a [`ControlGroup`](../../ControlGroup/).

## Example

```jsx
<ControlGroup>
  <ControlGroup.Item>
    <Input.AddOn>Prefix</Input.AddOn>
  </ControlGroup.Item>
  <ControlGroup.Item>
    <Input />
  </ControlGroup.Item>
  <ControlGroup.Item>
    <Input.AddOn>Suffix</Input.AddOn>
  </ControlGroup.Item>
</ControlGroup>
```

## Props

| Prop      | Type      | Description                                        |
| --------- | --------- | -------------------------------------------------- |
| children  | `any`     | Content to render.                                 |
| className | `string`  | Custom class names to be added to the component.   |
| isFirst   | `boolean` | Helps render component without right borders.      |
| isNotOnly | `boolean` | Helps render component without left/right borders. |
| isLast    | `boolean` | Helps render component without left borders.       |

---

# Input.Static

`Input.Static` components are plain-text components with adjusted height properties to allow them to be aligned with Input components. `Input.Static` is typically used to contain horizontal-style form labels.

```jsx
<Input.Static>Catch-phrase</Input.Static>
<Input multiline={3} placeholder="Please enter sign-off catch-phrase." autoFocus />
```

## Props

| Prop  | Type     | Description                                |
| ----- | -------- | ------------------------------------------ |
| align | `string` | Determines the alignment of the component. |
| size  | `string` | Determines the size of the component.      |
