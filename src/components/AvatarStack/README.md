# AvatarStack

An AvatarStack component displays an array of [Avatars](../Avatar). This component has a max number of Avatars it will render. Any additional Avatars will be consolidated into a `+` counter that appears at the end.

## Example

```jsx
<AvatarStack avatars={listOfAvatars} />
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| avatars | `array` | A list of [Avatars](../Avatar).]
| borderColor | `string` | Color for the Avatar border. |
| className | `string` | Custom class names to be added to the component. |
| max | `number` | Number of avatars to display before truncating. |
| shape | `string` | Shape of the avatars. |
| size | `string` | Size of the avatars. |
