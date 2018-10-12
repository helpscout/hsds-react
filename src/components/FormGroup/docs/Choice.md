# Choice

A FormGroup.Choice is used for [Choice](../Choice) based components, such as [Checkbox](../Checkbox) and [Radio](../Radio).

## Example

```jsx
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

| Prop         | Type              | Description                                      |
| ------------ | ----------------- | ------------------------------------------------ |
| className    | `string`          | Custom class names to be added to the component. |
| maxWidth     | `number`/`string` | Max-width for the component.                     |
| isResponsive | `bool`            | Enables responsive styling.                      |
