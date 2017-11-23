# Choice

A Choice component is a smart wrapper for [`Checkbox`](../Checkbox) and [`Radio`](../Radio) components. It is an enhanced version of the default HTML `<input>` `checkbox`/`radio`.


## Example

```jsx
<Choice label="Stay classy San Diego" value="stay-classy" />
```


### Group

Multiple Choice components can be used in a group using the [ChoiceGroup](../ChoiceGroup) wrapper component.

```jsx
Choose an anchor:

<ChoiceGroup>
  <Choice type='radio' label='Brian' value='brian' />
  <Choice type='radio' label='Brick' value='brick' />
  <Choice type='radio' label='Champ' value='champ' />
  <Choice type='radio' label='Ron' value='ron' />
</ChoiceGroup>
```



## Props

| Prop | Type | Description |
| --- | --- | --- |
| autoFocus | boolean | Automatically focuses the input. |
| className | string | Custom class names to be added to the component. |
| componentID | string | Namespace for the input ID. Default is `Choice`. |
| disabled | boolean | Disable the input. |
| helpText | string | Displays text underneath input. |
| id | string | ID for the input. |
| hideLabel | boolean | Hides the label with [VisuallyHidden](../VisuallyHidden). |
| label | string | Label for the input. |
| name | string | Name for the input. |
| onBlur | function | Callback when the input is blurred. |
| onChange | function | Callback when the input value is changed. |
| onFocus | function | Callback when the input is focused. |
| readOnly | boolean | Disable editing of the input. |
| state | string | Change input to state color. |
| type | string | Determines the input type. `checkbox` or `radio`. |
| value | string | The value of the input. |


### States

| Prop | Description |
| --- | --- |
| `error` | Changes color to red. |
| `success` | Changes color to green. |
| `warning` | Changes color to yellow. |
