# Select

An Select component is an enhanced version of the default HTML `<select>`.


## Example

```html
<Select placeholder="Pick one" options={['You sit on a throne of lies!', 'Son of a nutcracker!']} autoFocus />
```

### Option groups

```html
<Select options={[
  {
    label: 'Quotes',
    value: [
      'You sit on a throne of lies!',
      'Son of a nutcracker!'
    ]
  }
  ]} autoFocus />
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| onBlur | function | Callback when select is blurred. |
| onChange | function | Callback when select value is changed. |
| onFocus | function | Callback when select is focused. |
| autoFocus | boolean | Automatically focuses the select. |
| className | string | Custom class names to be added to the component. |
| disabled | boolean | Disable the select. |
| helpText | string | Displays text underneath select. |
| id | string | ID for the select. |
| label | string | Label for the select. |
| name | string | Name for the select. |
| options | array or object or string | List of options to choose from. |
| placeholder | string | Placeholder text for the select. |
| prefix | string | Text to appear before the select. |
| readOnly | boolean | Disable editing of the select. |
| seamless | boolean | Removes the border around the select. |
| size | boolean | Determines the size of the select. |
| state | string | Change select to state color. |
| suffix | string | Text to appear after the select. |
| value | string | Initial value of the select. |


### States

| Prop | Description |
| --- | --- |
| `error` | Changes color to red. |
| `success` | Changes color to green. |
| `warning` | Changes color to yellow. |