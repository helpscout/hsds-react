# Spinner

A Spinner component provides the UI to indicate a loading state.

## Example

```jsx
<div>
  <Spinner />
  Loading...
</div>
```

## Props

| Prop      | Type              | Description                                                |
| --------- | ----------------- | ---------------------------------------------------------- |
| className | `string`          | Custom class names to be added to the component.           |
| color     | `string`          | Color of the spinner. Default `currentColor`.              |
| isRounded | `boolean`         | Rounds the stroke ends of the spinner SVG. Default `true`. |
| shade     | `string`          | Determines the opacity of the spinner.                     |
| size      | `number`/`string` | Determines the size of the spinner. Default `16`.          |
| speed     | `number`          | Speed of the spinning animation (in `ms`). Default `1400`. |
