# Question

A Question component is an enhanced version of [Bubble](./Bubble.md) used to represent a question within a [Message](./Message.md).

## Example

```jsx
<Message from avatar={<Avatar name="Arctic Puffin" />}>
  <Message.Question read timestamp="9:41am">
    How's it goin'?
  </Message.Question>
</Message>
```

## Props

| Prop      | Type          | Description                                                    |
| --------- | ------------- | -------------------------------------------------------------- |
| className | `string`      | Custom class names to be added to the component.               |
| from      | `node`/`bool` | Provides author information and applies "From" styles.         |
| isNote    | `bool`        | Applies "note" styles.                                         |
| ltr       | `bool`        | Applies left-to-right text styles.                             |
| ltr       | `bool`        | Applies left-to-right text styles.                             |
| primary   | `bool`        | Applies "primary" styles.                                      |
| read      | `bool`        | Determines if the Message is read.                             |
| rtl       | `bool`        | Applies right-to-left text styles.                             |
| size      | `string`      | Determines the size of the component.                          |
| timestamp | `string`      | Timestamp for the Message.                                     |
| title     | `string`      | Renders a [Heading](../../Heading) title in the component.     |
| to        | `node`/`bool` | Provides author information and applies "To" styles.           |
| typing    | `bool`        | Renders [LoadingDots](../../LoadingDots) within the component. |
