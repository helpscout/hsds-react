# Bubble

A Bubble component provides the visual container for the primary text-based content within a [Message](./Message.md).

## Example

```jsx
<Bubble from>Not now Arctic Puffin!</Bubble>
```

## Props

| Prop      | Type          | Description                                                  |
| --------- | ------------- | ------------------------------------------------------------ |
| className | `string`      | Custom class names to be added to the component.             |
| from      | `node`/`bool` | Provides author information and applies "From" styles.       |
| isNote    | `bool`        | Applies "note" styles.                                       |
| ltr       | `bool`        | Applies left-to-right text styles.                           |
| read      | `bool`        | Determines if the Message is read.                           |
| rtl       | `bool`        | Applies right-to-left text styles.                           |
| size      | `string`      | Determines the size of the component.                        |
| timestamp | `string`      | Timestamp for the Message.                                   |
| title     | `string`      | Renders a [Heading](../../Heading) title in the component.   |
| to        | `node`/`bool` | Provides author information and applies "To" styles.         |
| typing    | `bool`        | Renders [TypingDots](../../TypingDots) within the component. |
