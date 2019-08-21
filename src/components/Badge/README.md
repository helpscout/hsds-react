# Badge

A Badge component is a UI element that helps indicate the count, state, or status of something.

## Example

```jsx
<Badge status="info">Jazz Flute</Badge>
```

## Props

| Prop      | Type     | Description                                                           |
| --------- | -------- | --------------------------------------------------------------------- |
| color     | `string` | A custom color value that can be passed in                            |
| className | `string` | Custom class names to be added to the component.                      |
| display   | `string` | Determines the CSS `display` of the component. Default `inlineBlock`. |
| invert    | `string` | Inverts the colors of the background and text.                        |
| status    | `string` | Changes the color of the component to the corresponding status.       |
| size      | `number` | Adjust component size.                                                |
| white     | `bool`   | Applies a white style to the component.                               |

### Status

| Value     | Description              |
| --------- | ------------------------ |
| `error`   | Colors the badge red.    |
| `info`    | Colors the badge blue.   |
| `success` | Colors the badge green.  |
| `warning` | Colors the badge yellow. |
