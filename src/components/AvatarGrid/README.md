# AvatarGrid

An AvatarGrid component displays an array of [Avatars](../Avatar). This component has a max number of Avatars it will render. Any additional Avatars will be consolidated into a `+` counter that appears at the end.

This component is similar to [AvatarList](../AvatarList) with minor UI and animation differences.

## Example

```jsx
<AvatarGrid>
  <Avatar />
  <Avatar />
  <Avatar />
</AvatarGrid>
```

## Props

| Prop                  | Type                            | Description                                                                  |
| --------------------- | ------------------------------- | ---------------------------------------------------------------------------- |
| animationEasing       | `string`                        | Easing of [animation](../Animate) applied to the child [Avatars](../Avatar). |
| animationSequence     | `string`                        | Style of [animation](../Animate) applied to the child [Avatars](../Avatar).  |
| borderColor           | `string`                        | Color for the Avatar border.                                                 |
| center                | `bool`                          | Center aligns the component.                                                 |
| children              | `array`/[`<Avatar>`](../Avatar) | An [Avatar](../Avatar) component or an array of Avatars.                     |
| className             | `string`                        | Custom class names to be added to the component.                             |
| max                   | `number`                        | Number of avatars to display before truncating.                              |
| outerBorderColor      | `string`                        | Color for the Avatar's outer border.                                         |
| shape                 | `string`                        | Shape of the avatars.                                                        |
| showStatusBorderColor | `bool`                          | Renders the [StatusDot](../StatusDot) border.                                |
| size                  | `string`                        | Size of the avatars.                                                         |
