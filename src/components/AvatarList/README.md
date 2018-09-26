# AvatarList

An AvatarList component displays an array of [Avatars](../Avatar). This component has a max number of Avatars it will render. Any additional Avatars will be consolidated into a `+` counter that appears at the end.

This component is similar to [AvatarStack](../AvatarStack) with minor UI and animation differences.

## Example

```jsx
<AvatarList>
  <Avatar />
  <Avatar />
  <Avatar />
</AvatarList>
```

## Props

| Prop                  | Type     | Description                                                                           |
| --------------------- | -------- | ------------------------------------------------------------------------------------- |
| animationEasing       | `string` | Easing of [animation](../Animate) applied to the child [Avatars](../Avatar).          |
| animationSequence     | `string` | Style of [animation](../Animate) applied to the child [Avatars](../Avatar).           |
| animationStagger      | `number` | Amount (in `ms`) to stagger the [animations](../Animate) of the [Avatars](../Avatar). |
| avatarsClassName      | `string` | Custom className to pass to [Avatars](../Avatar).                                     |
| borderColor           | `string` | Color for the Avatar border.                                                          |
| className             | `string` | Custom class names to be added to the component.                                      |
| max                   | `number` | Number of avatars to display before truncating.                                       |
| outerBorderColor      | `string` | Color for the Avatar's outer border.                                                  |
| shape                 | `string` | Shape of the avatars.                                                                 |
| showStatusBorderColor | `bool`   | Renders the [StatusDot](../StatusDot) border.                                         |
| size                  | `string` | Size of the avatars.                                                                  |
