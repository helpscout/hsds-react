# Emoticon

An Emoticon component renders an SVG emoticon icon.

## Example

```jsx
<Emoticon name="reaction-happy" />
```

## Props

| Prop       | Type     | Description                                                               |
| ---------- | -------- | ------------------------------------------------------------------------- |
| center     | `bool`   | Center aligns component.                                                  |
| className  | `string` | Custom class names to be added to the component.                          |
| clickable  | `bool`   | Enables the component to be clickable. Default `true`.                    |
| inline     | `bool`   | Displays the component as `inline-block`.                                 |
| isActive   | `bool`   | Determines the emoticon color. Default `true`. (false is monochrome grey) |
| isDisabled | `bool`   | Disables the emoticon from interactions. Default `false`.                 |
| name       | `string` | Determines the SVG image. Required.                                       |
| size       | `string` | Adjusts the size of the component. One of 'lg', 'md', 'sm'                |
| title      | `string` | Provides a title on the icon.                                             |

## Emoticons available

- reaction-happy (large, medium, small)
- reaction-okay (large, medium, small)
- reaction-sad (large, medium, small)
