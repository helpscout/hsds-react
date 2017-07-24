# Textarea

An Textarea component is an enhanced version of the default HTML `<textarea>`.


## Example

```js
<Textarea value="You're awesome" placeholder="Please enter some form of awesome." autoFocus />
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| onBlur | function | Callback when the textarea is blurred. |
| onChange | function | Callback when the textarea value is changed. |
| onEnter | function | Callback when the Enter key is pressed. |
| onFocus | function | Callback when the textarea is focused. |
| autoFocus | boolean | Automatically focuses the textarea. |
| className | string | Custom class names to be added to the component. |
| defaultHeight | number | Height of the textarea. Default is `28`. |
| disabled | boolean | Disable the textarea. |
| error | boolean or string | Change textarea to error state. Displays text underneath textarea. |
| id | string | ID for the textarea. |
| name | string | Name for the textarea. |
| placeholder | string | Placeholder text for the textarea. |
| readOnly | boolean | Disable editing of the textarea. |
| resize | boolean | Enables (horizontal) resizing of the textarea. |
| resizeBoth | boolean | Enables (horizontal & vertical) resizing of the textarea. |
| seamless | boolean | Removes the border around the textarea. |
| success | boolean or string | Change textarea to success state. Displays text underneath textarea. |
| value | string | Initial value of the textarea. |
| warning | boolean or string | Change textarea to warning state. Displays text underneath textarea. |
