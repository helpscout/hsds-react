# Provider

A Provider component provides child components with props accessible as `context`.

## Example

```jsx
<Provider theme="embed">
  <Chat>...</Chat>
  <Chat>...</Chat>
</Provider>
```

## Props

| Prop  | Type     | Description                                                    |
| ----- | -------- | -------------------------------------------------------------- |
| theme | `string` | Name of the theme style to apply for child Message components. |

### Themes

| Prop    | Description                               |
| ------- | ----------------------------------------- |
| `admin` | Styles with "admin" chat styles. Default. |
| `embed` | Styles with "embed" chat styles.          |
