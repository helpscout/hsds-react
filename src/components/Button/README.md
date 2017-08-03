# Button

Actionable HTML buttons with basic styling

## Example

```html
<Button primary onClick={() => console.log('Hello world')>Click me!</Button>
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| disabled | boolean | Disable the button so it can't be clicked. |
| onBlur | function | `onBlur` event handler. |
| onClick | function | `onClick` event handler. |
| onFocus | function | `onFocus` event handler. |
| plain | boolean | Applies a plain style to the button. |
| primary | boolean | Applies a primary style to the button using the brand color. |
| size | string | Sets the size of the button. Can be one of `"sm"`, `"md"` or `"lg"`. |
| state | string | Applies state styles to the button. Can be one of `"success"`, `"error"` or `"warning"`. |
| submit | boolean | Sets the `type` of the button to `"submit"`. |
