# EditableFieldComposite

This component allows the grouping and in-lining of multiple single value Editable Fields.

`EditableFieldComposite` is in essence a Higher Order Component that decorates its children to enable grouping them.

### Example

```jsx
<EditableFieldComposite placeholder="Add a name" size="lg" separator=",">
  <EditableField
    label="First Name"
    name="first_name"
    type="text"
    placeholder="First Name"
    value="Johnny"
    onInputFocus={() => {
      console.log('execute!')
    }}
  />
  <EditableField
    label="Last Name"
    name="last_name"
    type="text"
    placeholder="Last Name"
    value="Cash"
  />
</EditableFieldComposite>
```

## Props

| Prop        | Type   | Default | Description                                                                                                     |
| ----------- | ------ | ------- | --------------------------------------------------------------------------------------------------------------- |
| className   | string | `''`    | The className of the component.                                                                                 |
| placeholder | string | `''`    | This is the text you see when all fields are empty.                                                             |
| size        | string | `"md"`  | Default is "md", pass "lg" for the large option.                                                                |
| separator   | string | `' '`   | By default, each value will be separated with a non-breaking space, but you can pass any string here, like ",". |
