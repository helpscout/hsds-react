# Actions

This component is a presentational wrapper used to render action buttons within a [`Form`](./Form.md).

## Example

```jsx
<Form.Actions
  cancel={<Button>Discard Changes</Button>}
  className="Entry Form"
  delete={<Button>Delete</Button>}
  direction="left"
  save={<Button>Save Changes</Button>}
/>
```

## Props

| Prop      | Type     | Description                                      |
| --------- | -------- | ------------------------------------------------ |
| cancel    | `any`    | A render slot for the cancel action.             |
| className | `string` | Custom class names to be added to the component. |
| delete    | `any`    | A render slot for the delete action.             |
| direction | `string` | The alignment of the actions. Default `right`.   |
| save      | `any`    | A render slot for the save action.               |
