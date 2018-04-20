# List

A List component is a presentational component, and is an enhanced version of the default HTML `<ul>` (or `<ol>`). The List component provide a container for [List.Item](./Item.md) components.

## Example

```jsx
<List>
  <List.Item>
    Zoolander
  </List.Item>
  <List.Item>
    Old School
  </List.Item>
  <List.Item>
    Elf
  </List.Item>
</List>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| border | `string` | Border style for the items. `dot` or `line`. |
| className | `string` | Custom class names to be added to the component. |
| display | `string` | Changes the component's CSS `display`. `block`/`flex`. |

| inlineSize | `string` | Size style for spacing between the items. `xs`, `sm`, `md`. |
| role | `string` | Aria-role for the component. Default is `list`. |
| size | `string` | Size style for the items. `xs`, `sm`, `md`, or `lg`. |
| type | `string` | List style style for the items. `bullet`, `inline`, or `number`. |
