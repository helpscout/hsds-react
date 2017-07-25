# Input

An Input component is an enhanced version of the default HTML `<input>`. Input can be transformed into a `<textarea>` if the `multiline` prop is defined.


## Example


### Input

```html
<Input value="Aww yiss" placeholder="Please enter some form of yes." autoFocus />
```

### Textarea

```html
<Input multiline={3} placeholder="I'm a 3-line auto-expanding textarea." autoFocus />
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| onBlur | function | Callback when input is blurred. |
| onChange | function | Callback when input value is changed. |
| onFocus | function | Callback when input is focused. |
| autoFocus | boolean | Automatically focuses the input. |
| className | string | Custom class names to be added to the component. |
| disabled | boolean | Disable the input. |
| error | boolean or string | Change input to error state. Displays text underneath input. |
| id | string | ID for the input. |
| multiline | boolean or number | Transforms input into an auto-expanding textarea. |
| name | string | Name for the input. |
| placeholder | string | Placeholder text for the input. |
| prefix | string | Text to appear before the input. |
| readOnly | boolean | Disable editing of the input. |
| resizable | boolean | Enables resizing for the textarea (only enabled for `multiline`). |
| seamless | boolean | Removes the border around the input. |
| size | boolean | Determines the size of the input. |
| suffix | string | Text to appear after the input. |
| success | boolean or string | Change input to success state. Displays text underneath input. |
| type | string | Determines the input type. |
| value | string | Initial value of the input. |
| warning | boolean or string | Change input to warning state. Displays text underneath input. |
