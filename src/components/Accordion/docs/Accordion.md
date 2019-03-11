# Accordion

This component is a graphical control element comprised of one or more
vertically stacked sections where each `Section` has a `Title` and `Body`.
The `Title` is always visible for each `Section`. Any `Title` can be clicked
to expand the adjacent `Body` in the same section. By default, the `Accordion`
is similar to a tabbed interface; only one section can have its body expanded
at a time. The `Accordion` can be configured to allow multiple sections to the
inner `Body` expanded simultaneously.

## Example

```jsx
<Accordion>
  <Accordion.Section>
    <Accordion.Title>Section 1</Accordion.Title>
    <Accordion.Body>
      <p>Ut eiusmod id eu culpa amet esse minim quis nostrud Lorem.</p>
      <Button>Click me</Button>
    </Accordion.Body>
  </Accordion.Section>
  <Accordion.Section>
    <Accordtion.Title>Section 2</Accordion.Title>
    <Accordion.Body>
      Duis sint sunt quis id nulla ad qui consectetur eiusmod et pariatur.
    </Accordion.Body>
  </Accordion.Section>
</Accordion>
```

## Props

| Prop           | Type                  | Description                                                          |
| -------------- | --------------------- | -------------------------------------------------------------------- |
| allowMultiple  | `boolean`             | Allows multiple sections to have their body revealed simultaneously. |
| children       | `Accordion.Section[]` | Sections to be stacked and controlled.                               |
| className      | `string`              | Custom class names to be added to the component.                     |
| isSeamless     | `boolean`             | Exclude borders and horizontal padding.                              |
| onOpen         | `function`            | Callback to be invoked when the body of a section is revealed.       |
| onClose        | `function`            | Callback to be invoked when the body of a section is concealed.      |
| openSectionIds | `array`               | An array of ids corresponding to sections that should be open.       |
| size           | `string`              | The amount of padding. Valid sizes are `xs`, `sm`, `md`, and `lg`.   |
