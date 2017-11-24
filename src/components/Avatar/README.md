# Avatar

An Avatar component displays a user's avatar image, or their initials if an image isn't available.


## Example

```jsx
<Avatar name="Will Ferrell" image="will.png" />
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| borderColor | `string` | Color for the Avatar border. |
| className | `string` | Custom class names to be added to the component. |
| count | `number`/`string` | Used to display an additional avatar count. |
| image | `string` | URL of the image to display. |
| light | `bool` | Applies a "light" style to the component. |
| initials | `string` | Custom initials to display. |
| name | `string` | Name of the user. Required. |
| shape | `string` | Shape of the avatar. |
| size | `string` | Size of the avatar. |
| title | `string` | Text for the image `alt` and `title` attributes. |
| status | `string` | Renders a [StatusDot](../StatusDot) with the status type. |
