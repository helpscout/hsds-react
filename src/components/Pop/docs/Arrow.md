# Arrow

A Pop.Arrow is a tiny wrapper that renders an "arrow" UI, powered by [Popper.js](https://popper.js.org/). It is an internal component that renders within a [Pop.Popper](./Popper.md).

## Example

```jsx
<Pop>
  ...
  <Pop.Popper>
    <Pop.Arrow />
  </Pop.Popper>
  ...
</Pop>
```

## Props

| Prop      | Type     | Description                                      |
| --------- | -------- | ------------------------------------------------ |
| className | `string` | Custom class names to be added to the component. |
| offset    | `number` | Adjusts offset margins for the component.        |
| placement | `string` | Determines the alignment of the componemt.       |
| size      | `number` | The size of the component.                       |
