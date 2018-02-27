# Input

An Input component is an enhanced version of the default HTML `<input>`. Input can be transformed into a `<textarea>` if the `multiline` prop is defined.


## Example

### Input

```jsx
<Input value="Stay classy San Diego" placeholder="Please enter sign-off catch-phrase" autoFocus />
```

### Textarea

```jsx
<Input multiline={3} placeholder="Please enter sign-off catch-phrase." autoFocus />
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| autoFocus | `bool` | Automatically focuses the input. |
| className | `string` | Custom class names to be added to the component. |
| disabled | `bool` | Disable the input. |
| forceAutoFocusTimeout | `bool` | Determines the amount of time (`ms`) for the component to focus on mount. |
| helpText | `string`/`component` | Displays text underneath input. |
| hintText | `string`/`component` | Displays text above input. |
| id | `string` | ID for the input. |
| isFocused | `string` | Determines if the component is focused. |
| label | `string`/`component` | Label for the input. |
| maxHeight | `number` | Sets the `max-height` for the input. Used with `multiline`. |
| multiline | `bool`/`number` | Transforms input into an auto-expanding textarea. |
| name | `string` | Name for the input. |
| onBlur | `function` | Callback when input is blurred. |
| onChange | `function` | Callback when input value is changed. |
| onFocus | `function` | Callback when input is focused. |
| placeholder | `string` | Placeholder text for the input. |
| prefix | `string` | Text to appear before the input. |
| readOnly | `bool` | Disable editing of the input. |
| removeStateStylesOnFocus | `bool` | Removes the `state` styles on input focus. Default `false`. |
| resizable | `bool` | Enables resizing for the textarea (only enabled for `multiline`). |
| seamless | `bool` | Removes the border around the input. |
| size | `string` | Determines the size of the input. |
| state | `string` | Change input to state color. |
| suffix | `string` | Text to appear after the input. |
| type | `string` | Determines the input type. |
| value | `string` | Initial value of the input. |


### States

| Prop | Description |
| --- | --- |
| `error` | Changes color to red. |
| `success` | Changes color to green. |
| `warning` | Changes color to yellow. |



## Input.Static

`Input.Static` components are plain-text components with adjusted height properties to allow them to be aligned with Input components. `Input.Static` is typically used to contain horizontal-style form labels.

```jsx
<Input.Static>Catch-phrase</Input.Static>
<Input multiline={3} placeholder="Please enter sign-off catch-phrase." autoFocus />
```

### Props

| Prop | Type | Description |
| --- | --- | --- |
| align | `string` | Determines the alignment of the component. |
| size | `string` | Determines the size of the component. |
