# RateAction

This component is a `button` used for ratings, visualized with an [Emoticon](../Emoticon).

## Example

```jsx
<RateAction name="reaction-happy" onClick={submitFeedback} />
```

## Props

| Prop      | Type     | Description                                                                             |
| --------- | -------- | --------------------------------------------------------------------------------------- |
| className | `string` | Custom class names to be added to the component.                                        |
| isActive  | `bool`   | Determines the emoticon color. Default `true`.                                          |
| disabled  | `bool`   | Disables the emoticon from interactions. Default `false`.                               |
| name      | `string` | Determines the Emoticon image. One of 'reaction-happy', 'reaction-sad', 'reaction-okay' |
| size      | `string` | Adjusts the size of the component. One of 'lg', 'md', 'sm'                              |

For additional props, check out [Emoticon](../Emoticon).
