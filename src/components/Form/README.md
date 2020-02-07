# Form

A Form component is a wrapper that will wrap around children like `<FormGroup>` and show save, cancel, and delete actions at the bottom.

## Components

This component contains a smaller sub-component:

- [Actions](./Actions/README.md)

## Example

```jsx
<Form
  cancelText="Cancel"
  deleteText="Delete"
  className="entry-form"
  actionDirection="left"
  actionTabbable={false}
  saveButtonProps={{ disabled: true }}
>
  <FormGroup>
    <FormLabel label="Site Name">
      <Input value="Dashing Dash" />
    </FormLabel>
  </FormGroup>
</Form>
```

## Props

| Prop               | Type      | Description                                                                     |
| ------------------ | --------- | ------------------------------------------------------------------------------- |
| actionDirection    | `string`  | Optional. Direction in which buttons render, right or left. Defaults to "right" |
| actionTabbable     | `boolean` | Optional. Can the user focus on actions by tabbing. Defaults to "true"          |
| cancelButtonProps  | `object`  | Optional. Allows the user to pass in any props that Button component accepts.   |
| cancelText         | `string`  | Optional. Text for the cancel button. Button will not render without text.      |
| children           | `any`     | Content to render.                                                              |
| className          | `string`  | Optional. Custom class names to be added to the component                       |
| destroyButtonProps | `object`  | Optional. Allows the user to pass in any props that Button component accepts.   |
| destroyText        | `string`  | Optional. Text for the delete button. Button will not render without text.      |
| onCancel           | `string`  | Callback for the cancel button                                                  |
| onDestroy          | `string`  | Callback for the delete button                                                  |
| onSave             | `string`  | Callback for when the form is submitted                                         |
| saveButtonProps    | `object`  | Optional. Allows the user to pass in any props that Button component accepts.   |
| saveText           | `string`  | Optional. Text for the save button. Defaults to "Save". Button always renders.  |
