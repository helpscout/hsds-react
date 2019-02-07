# RateAction

This component is a `button` used for ratings, visualized with an [Emoticon](../Emoticon).

## Example

```jsx
<RateAction name="happy" onClick={submitFeedback} />
```

## Props

| Prop          | Type      | Description                                               |
| ------------- | --------- | --------------------------------------------------------- |
| className     | `string`  | Custom class names to be added to the component.          |
| isActive      | `bool`    | Determines the emoticon color. Default `true`.            |
| disabled      | `bool`    | Disables the emoticon from interactions. Default `false`. |
| name          | `string`  | Determines the Emoticon image.                            |
| size          | `string`  | Adjusts the size of the component.                        |
| withAnimation | `boolean` | Enables animations on hover. Default `true`.              |

For additional props, check out [Emoticon](../Emoticon).
