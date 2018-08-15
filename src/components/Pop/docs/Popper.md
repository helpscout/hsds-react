# Popper

A Pop.Popper is a tiny wrapper that renders the content UI, powered by [Popper.js](https://popper.js.org/).

This component is powered by [Popper.js](https://popper.js.org/) the evolution of [Drop](../Drop).

## Example

```jsx
<Pop>
  ...
  <Pop.Popper>Content!</Pop.Popper>
</Pop>
```

## Props

| Prop              | Type      | Description                                                |
| ----------------- | --------- | ---------------------------------------------------------- |
| animationDelay    | `number`  | Delay (ms) for Popper to appear when triggered.            |
| animationDuration | `number`  | Duration (ms) for Popper to animate when triggered.        |
| animationEasing   | `string`  | Animation easing preference for Popper when animating.     |
| animationSequence | `string`  | Animation style for Popper.                                |
| arrowClassName    | `string`  | ClassName for the [Arrow component](./Arrow.md).           |
| arrowSize         | `number`  | The size of the [Arrow component](./Arrow.md).             |
| placement         | `string`  | Determines the alignment of the component's content.       |
| positionFixed     | `boolean` | Positioning strategy for Popper.js. Default `false`.       |
| showArrow         | `boolean` | Renders the [Arrow component](./Arrow.md). Default `true`. |
| zIndex            | `number`  | The CSS `z-index` of the component.                        |
