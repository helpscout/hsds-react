# ProgressBar

A ProgressBar component visualizes the progression of a task. This component is typically used to illustrate loading progress.


## Example

```html
<ProgressBar value={50} />
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| description | string | Description of the progress bar (for accessibility). |
| onChange | function | Callback when component value updates. Returns value as percent. |
| size | string | Determines the size of the input. |
| value | number/string | Progress value to visualize in component. |