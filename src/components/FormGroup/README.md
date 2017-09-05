# FormGroup

A FormGroup component provides marginal spacing between form elements.

## Example

```html
<FormGroup>
  <Input label='First name' />
</FormGroup>
<FormGroup>
  <Input label='Last name' />
</FormGroup>
```

### FormGroup.Grid

`FormGroup.Grid` extends the default `FormGroup` by wrapping the child component with [Grid component](../Grid).

```html
<FormGroup.Grid>
  <Grid.Col size='4'>
    <Input.Static>First name</Input.Static>
  </Grid.Col>
  <Grid.Col size='8'>
    <Input label='First name' />
  </Grid.Col>
</FormGroup.Grid>
```


### Choice

A `FormGroup.Choice` is used for [Choice](../Choice) based components, such as [Checkbox](../Checkbox) and [Radio](../Radio).

```html
<Label>Choose:</Label>
<FormGroup.Choice>
  <Checkbox label='Derek' value='derek' />
</FormGroup>
<FormGroup.Choice>
  <Checkbox label='Hansel' value='hansel' />
</FormGroup>
```

Note: The [ChoiceGroup](../ChoiceGroup) component automatically wraps child components with `<FormGroup.Choice>`.



## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
