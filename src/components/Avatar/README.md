# Avatar

An Avatar component displays a user's avatar image, or their initials if an image isn't available.

## Example

```jsx
<Avatar name="Will Ferrell" image="will.png" />
```

## Theming

This component can be themed using a [ThemeProvider](../styled).

```jsx
<ThemeProvier theme={myTheme}>
  ...
  <Avatar name="Will Ferrell" />
  ...
</ThemeProvider>
```

## Props

| Prop                  | Type              | Description                                                               |
| --------------------- | ----------------- | ------------------------------------------------------------------------- |
| borderColor           | `string`          | Color for the Avatar border.                                              |
| className             | `string`          | Custom class names to be added to the component.                          |
| count                 | `number`/`string` | Used to display an additional avatar count.                               |
| image                 | `string`          | URL of the image to display.                                              |
| light                 | `bool`            | Applies a "light" style to the component.                                 |
| initials              | `string`          | Custom initials to display.                                               |
| name                  | `string`          | Name of the user. Required.                                               |
| onError               | `function`        | Callback when avatar image fails to load.                                 |
| onLoad                | `function`        | Callback when avatar image loads.                                         |
| outerBorderColor      | `string`          | Color for the Avatar's outer border.                                      |
| shape                 | `string`          | Shape of the avatar.                                                      |
| size                  | `string`          | Size of the avatar.                                                       |
| title                 | `string`          | Text for the image `alt` and `title` attributes.                          |
| showStatusBorderColor | `bool`            | Renders the [StatusDot](../StatusDot) border.                             |
| status                | `string`          | Renders a [StatusDot](../StatusDot) with the status type.                 |
| statusIcon            | `string`          | Name of the [Icon](../Icon) to render into the [StatusDot](../StatusDot). |
