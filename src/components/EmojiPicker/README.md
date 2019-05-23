# EmojiPicker

The EmojiPicker component contains the logic to present a set of emoji in a menu for selection.

## Example

```jsx
const trigger = <button>Some Emoji!</button>

<EmojiPicker trigger={trigger} onSelect={(selectedEmoji) => console.log(selectedEmoji) }/>
```

## Props

| Prop          | Type       | Default | Description                                  |
| ------------- | ---------- | ------- | -------------------------------------------- |
| className     | `string`   |         | The className of the component.              |
| emojiSet      | `array`    |         | An array of emoji objects.                   |
| innerRef      | `function` |         | Retrieves the `Emoji` DOM node.              |
| onSelect      | `function` |         | Callback when item is selected.              |
| renderItem    | `Function` |         | Callback to customize how an item renders.   |
| renderMenu    | `Function` |         | Callback to customize how a menu renders.    |
| renderTrigger | `Function` |         | Callback to customize how a trigger renders. |
| size          | `string`   | default | The size of the emoji.                       |
