# Actions

This component is a presentational wrapper used to render action buttons within a [`Form`](./Form.md).

## Example

```jsx
<Form>
  <FormGroup>
    <FormLabel label="Site Name">
      <Input value="Dashing Dash" />
    </FormLabel>
  </FormGroup>
  <Form.Actions
    direction="left"
    primary={<Button>Save Changes</Button>}
    secondary={<Button>Discard Changes</Button>}
    serious={<Button>Something serious!</Button>}
  />
</Form>
```

## Props

| Prop      | Type     | Description                                                  |
| --------- | -------- | ------------------------------------------------------------ |
| className | `string` | Custom class names to be added to the component.             |
| direction | `string` | The alignment of the actions. Default `right`.               |
| primary   | `any`    | A render slot for the primary action.                        |
| secondary | `any`    | A render slot for the secondary action.                      |
| serious   | `any`    | A render slot for the serious (probably destructive) action. |
