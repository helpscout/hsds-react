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

| Prop | Type | Description |
| --- | --- | --- |
| animationSequence | `string` | Style of [animation](../Animate) applied to the child [Avatars](../Avatar). |
| animationStagger | `number` | Amount (in `ms`) to stagger the [animations](../Animate) of the [Avatars](../Avatar). |
| center | `bool` | Center aligns the component. |
| children | `array`/[`<Avatar>`](../Avatar) | An [Avatar](../Avatar) component or an array of Avatars. |
| className | `string` | Custom class names to be added to the component. |
| max | `number` | Number of avatars to display before truncating. |
| shape | `string` | Shape of the avatars. |
| size | `string` | Size of the avatars. |
