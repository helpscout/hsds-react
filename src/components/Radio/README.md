# Radio

A Radio component is an enhanced version of the default HTML `<input>` `radio`. Radio uses the [Choice](../Choice) component as a smart wrapper.


## Example

```html
<Radio label="Stay classy San Diego" value="stay-classy" />
```


### Group

Multiple Choice components can be used in a group using the [ChoiceGroup](../ChoiceGroup) wrapper component.

```html
Choose an anchor:

<ChoiceGroup>
  <Radio type='radio' label='Brian' value='brian' />
  <Radio type='radio' label='Brick' value='brick' />
  <Radio type='radio' label='Champ' value='champ' />
  <Radio type='radio' label='Ron' value='ron' />
</ChoiceGroup>
```

Note: When Radio is used within a `<ChoiceGroup>`, it is automatically wrapped with a [FormGroup.Choice](../FormGroup) component for better visual spacing.



## Props

See the [Choice](../Choice) component for a list of props.
