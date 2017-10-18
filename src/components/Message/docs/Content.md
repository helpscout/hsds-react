# Content

A Content component provides the UI to render non text-based content within a [Message](./Message.md).


## Example

```jsx
<Message to avatar={<Avatar name='Buddy' />}>
  <Message.Chat read timestamp='9:41am'>
    <Link href='https://en.wikipedia.org/wiki/Elf_(film)'>https://en.wikipedia.org/wiki/Elf_(film)</Link>
  </Message.Chat>
  <Message.Content>
    <PreviewCard
      href='https://en.wikipedia.org/wiki/Elf_(film)'
      title='Wikipedia: Elf (film)'
      target='_blank'
    >Elf is a 2003 American Christmas fantasy comedy film directed by Jon Favreau and written by David Berenbaum. It stars Will Ferrell, James Caan, Zooey Deschanel, Mary Steenburgen, Daniel Tay, Edward Asner, and Bob Newhart...</PreviewCard>
  </Message.Content>
</Message>
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
