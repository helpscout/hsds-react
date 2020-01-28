# Embed

An embed component provides the UI to render rich-media embed content within a
[Message](./Message.md).

## Example

```jsx
const html = `
  <div style="left: 0;
              width: 100%;
              height: 0;
              position: relative;
              padding-bottom: 56.2493%;"
  >
    <iframe src="https://www.youtube.com/embed/evvzG0Xz69Q?rel=0&showinfo=0"
            style="border: 0;
                   top: 0;
                   left: 0;
                   width: 100%;
                   height: 100%;
                   position: absolute;"
            allowfullscreen
            scrolling="no"
    ></iframe>
  </div>
`
<Message from avatar={<Avatar name="Artic Puffin" />}>
  <Message.Chat read timestamp="9:41am">
    Hey Buddy!
  </Message.Chat>
  <Message.Embed html={html} />
</Message>
```

## Props

| Prop      | Type     | Description                                             |
| --------- | -------- | ------------------------------------------------------- |
| className | `string` | Custom class names to be added to the component.        |
| html      | `string` | HTML markup to be dangerously set inside the component. |
