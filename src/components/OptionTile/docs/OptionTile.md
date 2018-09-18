# OptionTile

A OptionTile component is to render a link, displayed in a stylized [Card](../../FluffyCard).

## Example

```jsx
<OptionTile icon="search" title="Go searchin" />
```

## Theming

This component, specifically the inner [OptionIcon](../../OptionIcon), can be themed using a [ThemeProvider](../../styled).

```jsx
<ThemeProvider theme={myTheme}>
  ...
  <OptionTile icon="search" title="Go searchin" />
  ...
</ThemeProvider>
```

## Props

| Prop      | Type     | Description                                                                 |
| --------- | -------- | --------------------------------------------------------------------------- |
| className | `string` | Custom class names to be added to the component.                            |
| icon      | `string` | The [Icon](../../Icon) to render within the [OptionIcon](../../OptionIcon). |
| iconTitle | `string` | The title for the [Icon](../../Icon).                                       |
| title     | `string` | The title for the component.                                                |
| subtitle  | `string` | The subtitle for the component.                                             |

For additional props, check out [FluffyCard](../../FluffyCard).
