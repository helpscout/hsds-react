# HsApp

This component wrap an any other component with the Helpscout App layout

## Example

```jsx
<HsApp>
  <Page>
    <Page.Card>content</Page.Card>
  </Page>
</HsApp>
```

## Props

| Prop             | Type   | Description                                                                                                          |
| ---------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| withInnerWrapper | `bool` | When active, the content will be wrapped with a white box, otherwise it will be the default HS App background color. |
| sidenavComponent | `any`  | Overwrite the sidebar with this component                                                                            |
| navComponent     | `any`  | Overwrite the top navigation with this component                                                                     |
| contentComponent | `any`  | Overwrite the actual content with this component                                                                     |
