# EditableTextarea

A EditableTextarea it's a sibling of the EditableField, but a textarea...

- It autoresizes it's height based on content to a maximum number of rows (maxRows)
- Use Enter to save the note
- Use Shift + Enter to add line breaks
- Use Escape to discard changes
- When the content is larger than the height of the teaxtarea, we add a visual cue (gradient)
- The visual cure disappears when scrolling to the bottom of the textarea
- Number of rows (max height of the textarea) is configurable (default 5)
- Styles follow EditableFields as close as possible

## Example

```jsx
<EditableTextarea
  id="some_id"
  maxRows={10}
  value={`
This text
  has some
        indentation
`}
/>
```

## Props

| Prop        | Type                                                          | Default            | Description                                                         |
| ----------- | ------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------- |
| className   | `string`                                                      |                    | The className of the component.                                     |
| id          | `string`                                                      | 'editabletextarea' | The id to assign to the component.                                  |
| maxRows     | `number`                                                      | 5                  | The maximum number of lines the textarea will grow to (max height). |
| placeholder | `string`                                                      | 'Enter your notes' | The placeholder of the textarea.                                    |
| value       | `string`                                                      | 'Enter your notes' | The value of the textarea.                                          |
| innerRef    | `Function`                                                    |                    | Retrieve the inner DOM node.                                        |
| onChange:   | (args: { name: string; value: Value; event?: Event }) => void | `noop function`    | Fires when either the input or an option is changed                 |
| onEnter:    | (args: { name: string; value: Value; event: Event }) => void  | `noop function`    | Fires when Enter is pressed on the input                            |
| onEscape:   | (args: { name: string; value: Value; event: Event }) => void  | `noop function`    | Fires when Escape is pressed on the input                           |
| onCommit:   | (args: { name: string; value: Value }) => void                | `noop function`    | Fires when a change is “saved” (see below)                          |
