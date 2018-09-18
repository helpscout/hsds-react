# OptionIcon

A OptionIcon component is used a stylized [Icon](../Icon) with a themed wrapper.

## Example

```jsx
<OptionIcon icon="search" />
```

## Theming

This component can be themed using a [ThemeProvider](../styled).

```jsx
<ThemeProvier theme={myTheme}>
  ...
  <OptionIcon icon="search" />
  ...
</ThemeProvider>
```

## Props

| Prop      | Type     | Description                                      |
| --------- | -------- | ------------------------------------------------ |
| className | `string` | Custom class names to be added to the component. |
| icon      | `string` | The [Icon](../Icon) to render.                   |
| title     | `string` | The title for the [Icon](../Icon).               |
