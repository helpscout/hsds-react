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
| formatter | `function` | A function to format the timestamp string. Defaults to a function that returns the timestamp. |
| read | `bool` | Determines if the Message is read. |
| timestamp | `string` | Timestamp for the Message. |
