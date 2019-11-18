# Actions

This component is a presentational wrapper used to render action buttons within a [`Form`](./Form.md).

## Example

```jsx
<Form.Actions
  direction="left"
  save={<Button>Save Changes</Button>}
  cancel={<Button>Discard Changes</Button>}
  delete={<Button>Delete</Button>}
/>
```

## Props

| Prop      | Type     | Description                                      |
| --------- | -------- | ------------------------------------------------ |
| className | `string` | Custom class names to be added to the component. |
| direction | `string` | The alignment of the actions. Default `right`.   |
| save      | `any`    | A render slot for the save action.               |
| cancel    | `any`    | A render slot for the cancel action.             |
| delete    | `any`    | A render slot for the delete action.             |
