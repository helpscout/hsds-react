# Content

A Content component provides the UI to render non text-based content within a [Message](./Message.md).

## Example

```jsx
<Message to avatar={<Avatar name="Buddy" />}>
  <Message.Chat read timestamp="9:41am">
    <Link href="https://en.wikipedia.org/wiki/Elf_(film)">
      https://en.wikipedia.org/wiki/Elf_(film)
    </Link>
  </Message.Chat>
  <Message.Content>
    <PreviewCard
      href="https://en.wikipedia.org/wiki/Elf_(film)"
      title="Wikipedia: Elf (film)"
      target="_blank"
    >
      Elf is a 2003 American Christmas fantasy comedy film directed by Jon
      Favreau and written by David Berenbaum. It stars Will Ferrell, James Caan,
      Zooey Deschanel, Mary Steenburgen, Daniel Tay, Edward Asner, and Bob
      Newhart...
    </PreviewCard>
  </Message.Content>
</Message>
```

## Props

| Prop      | Type          | Description                                            |
| --------- | ------------- | ------------------------------------------------------ |
| className | `string`      | Custom class names to be added to the component.       |
| from      | `node`/`bool` | Provides author information and applies "From" styles. |
| isNote    | `bool`        | Applies the "Note" theme styles.                       |
| ltr       | `bool`        | Applies left-to-right text styles.                     |
| read      | `bool`        | Determines if the Message is read.                     |
| rtl       | `bool`        | Applies right-to-left text styles.                     |
| timestamp | `string`      | Timestamp for the Message.                             |
| to        | `node`/`bool` | Provides author information and applies "To" styles.   |
