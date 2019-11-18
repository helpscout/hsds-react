# Form

This component is a presentational wrapper used to render content, typically form inputs and action buttons.

## Example

```jsx
<Form
  cancelText="Cancel"
  deleteText="Delete"
  className="entry-form"
  actionDirection="left"
>
  <FormGroup>
    <FormLabel label="Site Name">
      <Input value="Dashing Dash" />
    </FormLabel>
  </FormGroup>
</Form>
```

## Props

| Prop                               | Type     | Description                                       |
| ---------------------------------- | -------- | ------------------------------------------------- |
| actionDirection                    | `string` | Optional. Direction in which buttons render,      |
| right or left. Defaults to "right" |
| cancelText                         | `string` | Optional. Text for the cancel button. Button will |
| not render without text.           |
| children                           | `any`    | Content to render.                                |
| className                          | `string` | Optional. Custom class names to be added to the   |

| component.
| destroyText | `string` | Optional. Text for the delete button. Button will |
| not render without text. |
| onSave | `string` | Callback for when the form is submitted |
| onCancel | `string` | Callback for the cancel button |
| onDestroy | `string` | Callback for the delete button |
| saveText | `string` | Optional. Text for the save button. Defaults to |
| "Save". Button always renders.
