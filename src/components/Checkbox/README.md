# Checkbox

A Checkbox component is an enhanced version of the default HTML `<input>` `checkbox`. Checkbox uses the [Choice](../Choice) component as a smart wrapper.


## Example

```jsx
<Checkbox label="Stay classy San Diego" value="stay-classy" />
```


### Group

Multiple Choice components can be used in a group using the [ChoiceGroup](../ChoiceGroup) wrapper component.

```jsx
Choose an anchor:

<ChoiceGroup>
  <Checkbox type='radio' label='Brian' value='brian' />
  <Checkbox type='radio' label='Brick' value='brick' />
  <Checkbox type='radio' label='Champ' value='champ' />
  <Checkbox type='radio' label='Ron' value='ron' />
</ChoiceGroup>
```

Note: When Checkbox is used within a `<ChoiceGroup>`, it is automatically wrapped with a [FormGroup.Choice](../FormGroup) component for better visual spacing.



## Props

See the [Choice](../Choice) component for a list of props.
