# Button

Actionable HTML buttons with basic styling

## RouteWrapper

This component is extended by the `RouteWrapper` higher order component, and can be used similarly to a [`react-router` `<Link>`](https://reacttraining.com/react-router/web/api/Link) component by using the `to` prop. It also has an optional `fetch` property which can specify a promise-returning function which will be invoked before the `to` route is navigated


## Examples

```jsx
<Button primary onClick={() => console.log('Hello world')>Click me!</Button>
```

```jsx
<Button primary to="path/to/route">Click me!</Button>
```

```jsx
<Button primary fetch={fetchData} to="path/to/route">Click me!</Button>
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| accessibilityLabel | `string` | Visually hidden text for screen readers. |
| className | `string` | Custom class names to be added to the component. |
| disabled | `bool` | Disable the button so it can't be clicked. |
| fetch | `function`| function which returns a promise, will be invoked before routing the `to` route |
| onBlur | `function` | `onBlur` event handler. |
| onClick | `function` | `onClick` event handler. |
| onFocus | `function` | `onFocus` event handler. |
| plain | `bool` | Applies a plain style to the button. |
| primary | `bool` | Applies a primary style to the button using the brand color. |
| size | `string` | Sets the size of the button. Can be one of `"sm"`, `"md"` or `"lg"`. |
| state | `string` | Applies state styles to the button. Can be one of `"success"`, `"error"` or `"warning"`. |
| submit | `bool` | Sets the `type` of the button to `"submit"`. |
| to | `string` | React Router path to navigate on click. |
