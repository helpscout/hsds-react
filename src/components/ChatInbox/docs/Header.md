# Header

A ChatInbox.Headers component provides additional context for [ChatList](../ChatList) UI. [Collapsing](../Collapsible) interactions are enhanced by [ChatInbox](./ChatInbox).


## Example

```jsx
<ChatInbox>
  <ChatInbox.Header avatars={avatars} count={2}>
    Chats
  </ChatInbox.Header>
  <ChatInbox.Content>
    <ChatList>
      ...
    </ChatList>
  </ChatInbox.Content>
</ChatInbox>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| avatars | `node` | [AvatarList](../../AvatarList) UI to render into the component. |
| className | `string` | Custom class names to be added to the component. |
| count | `number` | A new [ChatList.Item](../../ChatList/docs/Item.md) count. |
| isCollapsed | `bool` | Determines the collapse state. |
| isCollapsible | `bool` | Renders the collapsible trigger, if enabled. |
| onClick | `function` | Callback function component is clicked. |
