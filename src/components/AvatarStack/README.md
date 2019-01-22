# AvatarStack

An AvatarStack component displays an array of [Avatars](../Avatar). This component has a max number of Avatars it will render. Any additional Avatars will be consolidated into a `+` counter that appears at the end.

## Example

```jsx
<AvatarStack>
  <Avatar />
  <Avatar />
  <Avatar />
</AvatarStack>
```

## Props

| Prop                  | Type     | Description                                                                  |
| --------------------- | -------- | ---------------------------------------------------------------------------- |
| animationEasing       | `string` | Easing of [animation](../Animate) applied to the child [Avatars](../Avatar). |
| animationSequence     | `string` | Style of [animation](../Animate) applied to the child [Avatars](../Avatar).  |
| avatarsClassName      | `string` | Custom className to pass to [Avatars](../Avatar).                            |
| borderColor           | `string` | Color for the Avatar border.                                                 |
| className             | `string` | Custom class names to be added to the component.                             |
| max                   | `number` | Number of avatars to display before truncating.                              |
| outerBorderColor      | `string` | Color for the Avatar's outer border.                                         |
| shape                 | `string` | Shape of the avatars.                                                        |
| showStatusBorderColor | `bool`   | Renders the [StatusDot](../StatusDot) border.                                |
| size                  | `string` | Size of the avatars.                                                         |
| version               | `number` | Specifies the component version to render.                                   |
