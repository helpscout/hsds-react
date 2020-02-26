# ChatInbox

A ChatInbox component is wrapper that provides additional context and [collapsing](../Collapsible) interactions to [ChatList](../ChatList) UI.

## Example

```jsx
<ChatInbox>
  <ChatInbox.Header>Chats</ChatInbox.Header>
  <ChatInbox.Content>
    <ChatList>...</ChatList>
  </ChatInbox.Content>
</ChatInbox>
```

## Props

| Prop          | Type     | Description                                                               |
| ------------- | -------- | ------------------------------------------------------------------------- |
| className     | `string` | Custom class names to be added to the component.                          |
| isCollapsed   | `bool`   | Determines the collapse state.                                            |
| isCollapsible | `bool`   | Enables [collapsing](../../Collapsible) interactions. Default is `false`. |
