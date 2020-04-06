# ChatBlock

A ChatBlock component provides the structure for various sub-components within a [Message](./Message.md).

## Example

```jsx
<ChatBlock from>
  <Bubble typing />
</ChatBlock>
```

## Props

| Prop      | Type            | Description                                            |
| --------- | --------------- | ------------------------------------------------------ |
| className | `string`        | Custom class names to be added to the component.       |
| from      | `node`/`bool`   | Provides author information and applies "From" styles. |
| meta      | `node`/`string` | Meta content that renders under the Chat bubble.       |
| ltr       | `bool`          | Applies left-to-right text styles.                     |
| read      | `bool`          | Determines if the Message is read.                     |
| rtl       | `bool`          | Applies right-to-left text styles.                     |
| timestamp | `string`        | Timestamp for the Message.                             |
| to        | `node`/`bool`   | Provides author information and applies "To" styles.   |
