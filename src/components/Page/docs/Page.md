# Page

This component is a presentational wrapper used to render a variety of content. This component is typically used to render form-based UI.

## Example

```jsx
<Page>
  <Page.Card>
    <Page.Header title="My Form" />
  </Page.Card>
  <Page.Actions primary={<button>Save</button>} />
</Page>
```

## Props

| Prop         | Type      | Description                                      |
| ------------ | --------- | ------------------------------------------------ |
| children     | `any`     | Content to render.                               |
| className    | `string`  | Custom class names to be added to the component. |
| isResponsive | `boolean` | Enables responsive styles. Default `false`.      |
