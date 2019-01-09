# Page

This component is a presentational wrapper used to render a variety of content. This component is typically used to render form-based UI.

## Example

```jsx
<Page>
  <Page.Card>
    <Page.Section>
      <Page.Header
        render={({ Title, Subtitle }) => (
          <div>
            <Title level="h1">My page</Title>
            <Subtitle>Very important stuff</Subtitle>
          </div>
        )}
      />
      <Page.content>
        <p>Here, I will explain the importance of this</p>
      </Page.content>
    </Page.Section>
  </Page.Card>
  <Page.Actions primary={<button>Got it</button>} />
</Page>
```

## Props

| Prop         | Type      | Description                                      |
| ------------ | --------- | ------------------------------------------------ |
| children     | `any`     | Content to render.                               |
| className    | `string`  | Custom class names to be added to the component. |
| isResponsive | `boolean` | Enables responsive styles. Default `false`.      |
