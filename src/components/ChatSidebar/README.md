# ChatSidebar

A ChatSidebar is a larger component that helps manage the presentation, interactions, and state for [ChatInbox](../ChatInbox) and [ChatList](../ChatList) components. Ideally, state for ChatSidebar should be managed externally (via a parent component), and passed in as props.


## Example

```jsx
class MyComponent extends Component {
  ...
  render() {
    const {
      handleOnHideStatusBar,
      isShowStatusBar,
      newMessageCount,
    } = this.state

    return (
      <ChatSidebar
        newMessageCount={newMessageCount}
        onHideStatusBar={handleOnHideStatusBar}
        isShowStatusBar={isShowStatusBar}
      >
        <ChatInbox>
          ...
        </ChatInbox>
      </ChatSidebar>
    );
  }
}
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| isShowStatusBar | `bool` | Determines if the [StatusBar](../StatusBar) can be shown. |
| newMessageCount | `number` | Determines the message count that renders into the [StatusBar](../StatusBar) text copy. |
| onHideStatusBar | `function` | Callback function when the [StatusBar](../StatusBar) is hidden. |
| onShowStatusBar | `function` | Callback function when the [StatusBar](../StatusBar) is shown. |
| onScroll | `function` | Callback function when component is scrolled. |
| statusBarScrollTopOffset | `number` | Amount of `px` before the [StatusBar](../StatusBar) can show. Default is `100`. |
