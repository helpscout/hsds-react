# ChatBlock

A ChatBlock component provides the structure for various sub-components within a [Message](./Message.md).


## Example

```jsx
<ChatBlock from>
  <Bubble typing />
</ChatBlock>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| from | node/boolean | Provides author information and applies "From" styles. |
| ltr | boolean | Applies left-to-right text styles. |
| rtl | boolean | Applies right-to-left text styles. |
| read | boolean | Determines if the Message is read. |
| ltr | boolean | Applies left-to-right text styles. |
| timestamp | string | Timestamp for the Message. |
| to | node/boolean | Provides author information and applies "To" styles. |
