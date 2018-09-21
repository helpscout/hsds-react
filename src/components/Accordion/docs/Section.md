# Section

This component is part of the graphical control element that is the `Accordion`.
The `Section` houses a `Title` and `Body`. When the `Section` is open its
`Body` is expanded, otherwise its `Body` is collapsed.

This component is to be used within an [`Accordion`](./Accordion.md).

## Example

```jsx
<Accordion>
  <Accordion.Section>...</Accordion.Section>
  ...
</Accordion>
```

## Props

| Prop      | Type                             | Description                                        |
| --------- | -------------------------------- | -------------------------------------------------- |
| children  | `Accordion.Title|Accordion.Body` | Content to render.                                 |
| className | `string`                         | Custom class names to be added to the component.   |
| onOpen    | `function`                       | Callback to be invoked when the section is opened. |
| onClose   | `function`                       | Callback to be invoked when the section is closed. |
