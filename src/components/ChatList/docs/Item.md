# Item

A ChatList.Item component renders the UI that represents the state of a Chat converstation. This component is added as a child of [ChatList](./ChatList.md).


## Example

```jsx
<ChatList>
  <ChatList.Item
    avatar={item.avatar}
    isAssigned={item.isAssigned}
    isFocused={item.isFocused}
    isTyping={item.isTyping}
    isViewing={item.isViewing}
    isWaiting={item.isWaiting}
    onClick={handleOnClick}
    message={item.message}
    name={item.name}
    newMessageCount={item.newMessageCount}
    tags={item.tags}
    timestamp={item.timestamp}
  />
</ChatList>
```


### Loading state

This component will automatically render [Skeleton UI](../../Skeleton) if the `name` or `message` prop is missing.


## Props

| Prop | Type | Description |
| --- | --- | --- |
| avatar | `string` | Custom class names to be added to the component. |
| className | `string` | Custom class names to be added to the component. |
| isAssigned | `bool` | Applies the assigned styles to the component. |
| isFocused | `bool` | Applies the focused styles to the component. |
| isTyping | `bool` | Renders [LoadingDots](../../LoadingDots) in the content area. |
| isViewing | `bool` | Applies the viewing styles to the component. |
| isWaiting | `bool` | Applies the waiting styles to the component. |
| message | `string` | Text to render into the content area. |
| messageLimit | `number` | Amount of characters to truncate the `message`. |
| name | `string` | Name of the chat recipient. |
| newMessageCount | `number` | Number of new/unread chat messages. |
| tags | `array` | A collection of [Tags](../../Tag). |
| timestamp | `string` | [Timestamp](../../Timestamp) to render. |
| timestampFormatter | `function` | A function to format the timestamp, defaults to returning the timestamp string. |

This component renders using [Link](../../Link) as a container. Check out [Link's documentation](../../Link) for additional prop details.
