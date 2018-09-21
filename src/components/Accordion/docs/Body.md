# Body

This component is part of the graphical control element that is the `Accordion`.
The `Body` enhances the presentation of its children by wrapping them in a
padded element. By default the `Body` is collapsed and can be expanded by
clicking on its adjacent `Title` in the same `Section` of the `Accordion`.

This component is to be used within a [`Section`](./Section.md).

## Example

```jsx
<Accordion>
  <Accordion.Section>
    ...
    <Accordion.Body>
      <p>
        Eu nisi culpa exercitation commodo laboris commodo dolore voluptate est.
      </p>
    </Accordion.Body>
    ...
  </Accordion.Section>
  ...
</Accordion>
```

## Props

| Prop      | Type     | Description                                      |
| --------- | -------- | ------------------------------------------------ |
| children  | `any`    | Content to render.                               |
| className | `string` | Custom class names to be added to the component. |
