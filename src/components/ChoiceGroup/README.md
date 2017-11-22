# ChoiceGroup

A ChoiceGroup component is a wrapper component for [`Checkbox`](../Checkbox) and [`Radio`](../Radio) components. It delegates the `checked` status when the user interacts with the child components.


## Example

```jsx
Choose an anchor:

<ChoiceGroup value='ron'>
  <Choice type='radio' label='Brian' value='brian' />
  <Choice type='radio' label='Brick' value='brick' />
  <Choice type='radio' label='Champ' value='champ' />
  <Choice type='radio' label='Ron' value='ron' />
</ChoiceGroup>
```



## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| disabled | boolean | Disable the input. |
| name | string | Name for the inputs. |
| onBlur | function | Callback when an input is blurred. |
| onChange | function | Callback when an input value is changed. |
| onFocus | function | Callback when an input is focused. |
| value | string | The default value of input group. |
