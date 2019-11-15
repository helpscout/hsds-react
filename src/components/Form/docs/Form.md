# Form

This component is a presentational wrapper used to render content, typically form inputs and action buttons.

## Example

```jsx
<Form>
  <FormGroup>
    <FormLabel label="Site Name">
      <Input value="Dashing Dash" />
    </FormLabel>
  </FormGroup>
  <Form.Actions primary={<Button>Save Changes</Button>} />
</Form>
```

## Props

| Prop      | Type     | Description                                      |
| --------- | -------- | ------------------------------------------------ |
| children  | `any`    | Content to render.                               |
| className | `string` | Custom class names to be added to the component. |
