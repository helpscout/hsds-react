# Stepper

This component visually guides users through the steps of a task.

## Example

```jsx
<Stepper steps={[...]} currentIndex={0} />
```

## Props

| Prop         | Type          | Default | Description                                                |
| ------------ | ------------- | ------- | ---------------------------------------------------------- |
| className    | `string`      |         | The className of the component.                            |
| currentIndex | `number`      | `0`     | The current step.                                          |
| isClickable  | `boolean`     | `false` | Enables clicking for the steps.                            |
| onChange     | `Function`    |         | Callback when a step completes.                            |
| onComplete   | `Function`    |         | Callback when all steps are completed.                     |
| onStepClick  | `Function`    |         | Callback when a step is clicked. Enabled by `isClickable`. |
| steps        | `Array<Step>` | `[]`    | Collection of steps.                                       |

### Step

| Prop    | Type     | Description                           |
| ------- | -------- | ------------------------------------- |
| `title` | `string` | The title of the Step.                |
| `id?`   | `string` | The ID of the Step. Used for mapping. |
