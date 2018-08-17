# RadioCard

This component provides richer context to the of the default HTML `<input>` `radio`.

## Example

```jsx
<RadioCard icon="fab-chat" value="stay-classy" />
```

### Group

Multiple Choice components can be used in a group using the [ChoiceGroup](../ChoiceGroup) wrapper component.

```jsx
Choose an anchor:

<ChoiceGroup>
  <RadioCard label='Brian' value='brian' />
  <RadioCard label='Brick' value='brick' />
  <RadioCard label='Champ' value='champ' />
  <RadioCard label='Ron' value='ron' />
</ChoiceGroup>
```

Note: When Radio is used within a `<ChoiceGroup>`, it is automatically wrapped with a [FormGroup.Choice](../FormGroup) component for better visual spacing.

## Props

| Prop     | Type                | Description                               |
| -------- | ------------------- | ----------------------------------------- |
| checked  | `boolean`           | Determines of the `radio` is checked.     |
| icon     | `string`/`Function` | Icon to render.                           |
| iconSize | `number`/`string`   | Size to render the [Icon](../Icon).       |
| id       | `string`            | ID for the input.                         |
| onChange | `Function`          | Callback when the input value is changed. |
| title    | `string`            | HTML title text for the component.        |

See the [Choice](../Choice) component for a list of complete props.
