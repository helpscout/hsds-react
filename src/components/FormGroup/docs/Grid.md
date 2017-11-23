# Grid

A FormGroup.Grid component extends the default `FormGroup` by wrapping the child component with [Grid component](../Grid).


## Example

```jsx
<FormGroup.Grid>
  <Grid.Col size='4'>
    <Input.Static>First name</Input.Static>
  </Grid.Col>
  <Grid.Col size='8'>
    <Input label='First name' />
  </Grid.Col>
</FormGroup.Grid>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |
