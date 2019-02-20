# Pop

A Pop component is a Component that abstracts logic related to mounting and auto-positioning the child component to the DOM, relative to it's original target element.

This component is powered by [Popper.js](https://popper.js.org/) the evolution of [Drop](../Drop).

## Example

```jsx
<Pop>
  <Pop.Reference>...</Pop.Reference>
  <Pop.Popper>...</Pop.Popper>
</Pop>
```

## Props

| Prop                | Type       | Description                                                        |
| ------------------- | ---------- | ------------------------------------------------------------------ |
| animationDelay      | `number`   | Delay (ms) for Popper to appear when triggered.                    |
| animationDuration   | `number`   | Duration (ms) for Popper to animate when triggered.                |
| animationEasing     | `string`   | Animation easing preference for Popper when animating.             |
| animationSequence   | `string`   | Animation style for Popper.                                        |
| arrowClassName      | `string`   | ClassName for the [Arrow component](./Arrow.md).                   |
| className           | `string`   | Custom class names to be added to the component.                   |
| closeOnBodyClick    | `boolean`  | Closes component on `body` click. Default `false`.                 |
| closeOnContentClick | `boolean`  | Closes component on inner content click. Default `false`.          |
| closeOnMouseLeave   | `boolean`  | Closes component when the mouse leaves component . Default `true`. |
| closeOnEscPress     | `boolean`  | Closes component on `ESC` key press. Default `true`.               |
| display             | `string`   | The CSS `display` of the component.                                |
| isOpen              | `boolean`  | Open/close the component.                                          |
| onBeforeClose       | `Function` | Callback before component opens. Returns a `Promise`.              |
| onBeforeOpen        | `Function` | Callback before component opens. Returns a `Promise`.              |
| onClose             | `Function` | Callback when component closes.                                    |
| onOpen              | `Function` | Callback when component opens.                                     |
| onContentClick      | `Function` | Callback when inner content is clicked.                            |
| placement           | `string`   | Determines the alignment of the component's content.               |
| triggerOn           | `string`   | Determines how to engage the component.                            |
| showArrow           | `boolean`  | Renders the [Arrow component](./Arrow.md). Default `true`.         |
