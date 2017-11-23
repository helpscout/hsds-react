# KeypressListener

A KeypressListener is a helper component that automatically handles the binding and unbinding of key events (`keyup`).

KeypressListener is used as a child component, as it's `document` on/off bindings happen automatically as the parent component mounts and unmounts.


## Example

```jsx
<MyComponent>
  <KeypressListener keyCode={Keys.ENTER} handler={surprise} />
  ...
</MyComponent>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| keyCode | `number` | Number corresponding to the keyCode. We recommend you reference the [Keys constant](../../constants/Keys.js). |
| handler | `function` | Callback when the keyCode is pressed. |
| modifier | `string` | Keyboard modifier to listen to in addition to `keyCode`. |
| noModifier | `bool` | Listen for `keyCode` only. |
| scope | `element` | Node element to capture the event. Default is `window`. |
| type | `string` | Type of key event: `keyup`, `keydown`, `keypress`. Default is `keyup` .|
