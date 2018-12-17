# ChatScroller

A ChatScroller component is light-weight wrapper automatically scrolls a Chat body UI based on event chats (with consideration for range and scroll offsets). It is recommended that [Scrollable](../Scrollable) is a child Component (not necessary direct child).

## Example

```jsx
<ChatScroller messages={chatMessages}>
  <Scrollable>...</Scrollable>
</ChatScroller>
```

## Props

| Prop                  | Type       | Description                                            |
| --------------------- | ---------- | ------------------------------------------------------ |
| className             | `string`   | Custom class names to be added to the component.       |
| distanceForAutoScroll | `number`   | A range to enable auto-scrolling.                      |
| isTyping              | `bool`     | A chat-based event used to trigger auto-scrolling.     |
| lastMessageId         | `string`   | Chat data used to trigger auto-scrolling.              |
| messages              | `array`    | Chat data used to trigger auto-scrolling.              |
| messageSelectors      | `string`   | DOM selector(s) for chat message elements.             |
| onScroll              | `function` | Callback function when component is scrolled.          |
| propsToCheck          | `Array`    | A collection of props to check to initiate the scroll. |
| scrollableSelector    | `string`   | DOM selector for the scrollable message container.     |
| smoothScrollDuration  | `number`   | Duration (ms) for smooth scrolling.                    |
