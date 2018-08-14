## Input.Static

`Input.Static` components are plain-text components with adjusted height properties to allow them to be aligned with Input components. `Input.Static` is typically used to contain horizontal-style form labels.

```jsx
<Input.Static>Catch-phrase</Input.Static>
<Input multiline={3} placeholder="Please enter sign-off catch-phrase." autoFocus />
```

### Props

| Prop  | Type     | Description                                |
| ----- | -------- | ------------------------------------------ |
| align | `string` | Determines the alignment of the component. |
| size  | `string` | Determines the size of the component.      |
