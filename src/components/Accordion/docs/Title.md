# Title

This component is part of the graphical control element that is the `Accordion`.
The `Title` enhances the presentation of its children by wrapping them in a
padded element with a directional caret that indicates if the adjacent `Body`
is expanded or collapsed. Clicking the `Title` expands or contracts the adjacent
`Body` in the same `Section` of the `Accordion`.

This component is to be used within a [`Section`](./Section.md).

## Example

```jsx
<Accordion>
  <Accordion.Section>
    <Accordion.Title>
      <Text>Section 1</Text>
    </Accordion.Title>
    ...
  </Accordion.Section>
  ...
</Accordion>
```

## Props

| Prop      | Type     | Description                                         |
| --------- | -------- | --------------------------------------------------- |
| children  | `any`    | Content to render.                                  |
| className | `string` | Custom class names to be added to the component.    |
| href      | `string` | Renders a [Link](../../Link) with an href.          |
| to        | `string` | Renders a routable [Link](../../Link) with an href. |
