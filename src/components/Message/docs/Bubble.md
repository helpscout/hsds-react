# Bubble

A Bubble component provides the visual container for the primary text-based content within a [Message](./Message.md).


## Example

```jsx
<Bubble from>
  Not now Arctic Puffin!
</Bubble>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| from | node/boolean | Provides author information and applies "From" styles. |
| isNote | boolean | Applies "note" styles. |
| ltr | boolean | Applies left-to-right text styles. |
| rtl | boolean | Applies right-to-left text styles. |
| read | boolean | Determines if the Message is read. |
| primary | boolean | Applies "primary" styles. |
| ltr | boolean | Applies left-to-right text styles. |
| size | string | Determines the size of the component. |
| title | string | Renders a [Heading](../../Heading) title in the component. |
| timestamp | string | Timestamp for the Message. |
| to | node/boolean | Provides author information and applies "To" styles. |
| typing | boolean | Renders [LoadingDots](../../LoadingDots) within the component. |
