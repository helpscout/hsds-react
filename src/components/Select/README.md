# Select

An Select component is an enhanced version of the default HTML `<select>`.


## Example

### Input

```html
<Select options={['You sit on a throne of lies!', 'Son of a nutcracker!']} autoFocus />
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
| error | boolean or string | Change select to error state. Displays text underneath select. |
| id | string | ID for the select. |
| name | string | Name for the select. |
| options | array | List of options to choose from. |
| placeholder | string | Placeholder text for the select. |
| prefix | string | Text to appear before the select. |
| readOnly | boolean | Disable editing of the select. |
| seamless | boolean | Removes the border around the select. |
| size | boolean | Determines the size of the select. |
| suffix | string | Text to appear after the select. |
| success | boolean or string | Change select to success state. Displays text underneath select. |
| value | string | Initial value of the select. |
| warning | boolean or string | Change select to warning state. Displays text underneath select. |


## Todo

* Render `options` prop into actual `<option>`
* Add placeholder `<option>`
* Select rendered `<option>` based on `prop.value`
