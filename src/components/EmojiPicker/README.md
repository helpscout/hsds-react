# EmojiPicker

The EmojiPicker component contains the logic to present a set of emoji in a menu for selection.

## Example

```jsx
const trigger = <button>Some Emoji!</button>

<EmojiPicker trigger={trigger} onSelect={(selectedEmoji) => console.log(selectedEmoji) }/>
```

## Props

| Prop          | Type       | Default   | Description                                  |
| ------------- | ---------- | --------- | -------------------------------------------- |
| className     | `string`   |           | The className of the component.              |
| emojiSet      | `Array`    |           | An array of emoji objects.                   |
| innerRef      | `Function` |           | Retrieves the `Emoji` DOM node.              |
| onSelect      | `Function` |           | Callback when item is selected.              |
| renderTrigger | `Function` |           | Callback to customize how a trigger renders. |
| size          | `string`   | `default` | The size of the emoji.                       |
