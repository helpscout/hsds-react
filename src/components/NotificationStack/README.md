# NotificationStack

A NotificationStack component displays an array of [Notifications](../Notification). This component acts as a container for child Notifications, and provides extra functionality such as limiting and dismissal paushing.

## Example

```jsx
<NotificationStack>
  <Notification />
  <Notification />
  <Notification />
</NotificationStack>
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| autoDismiss | `bool` | Enables the auto-dismissal timers for [Notification](../Notification) components. Default `false`. |
| onClick | `func` | Callback when a child Notification is clicked. |
| limit | `number` | Maximum number of Notifications to display. Default `5`. |
| theme | `string` | Theme of notifications. Default `chat`. |
