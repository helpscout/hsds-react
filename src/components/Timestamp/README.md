# Timestamp

A Timestamp component renders the UI for the time and read status, typicaly used within a [Message](../Message) component.


## Example

```jsx
<Timestamp timestamp='9:41am' read />
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |
| formatter | `function` | A function to format the timestamp, which defaults to returning the timestamp string. |
| live | `bool` | Enables the internal ticking mechanism to live update the timestamp. Default `false`. |
| read | `bool` | Determines if the Message is read. |
| timestamp | `string` | Timestamp for the Message. |
