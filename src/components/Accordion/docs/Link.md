# Link

This component is an enhanced variant of [`Accordion.Section`](./Section.md) that renders a [`Link`](../../Link).

This component is to be used within an [`Accordion`](./Accordion.md).

## Example

```jsx
<Accordion>
  <Accordion.Link to="/">...</Accordion.Link>
  ...
</Accordion>
```

## Props

| Prop      | Type                             | Description                                         |
| --------- | -------------------------------- | --------------------------------------------------- |
| children  | `Accordion.Title|Accordion.Body` | Content to render.                                  |
| className | `string`                         | Custom class names to be added to the component.    |
| href      | `string`                         | Renders a [Link](../../Link) with an href.          |
| to        | `string`                         | Renders a routable [Link](../../Link) with an href. |

For additional props, see [`Accordion.Section`](./Section.md).
