# Header

This component is a presentational wrapper used to display a title/subtitle within a [`Page`](./Page.md).

The `render` prop gives us access to a `Title` and a `Subtitle` component.

Aside from those 2, you are free to add whatever markup you need: icons, links, tooltips, etc

`Title` takes two props: `headingLevel`, with values of `"h1"` or `"h2"` and `isSecondary` (boolean)

* `headingLevel`: The html tag to use "h1" or "h2", has no effect on looks, just semantics
* `isSecondary`: This determines if it should look slightly smaller when true. Use when you need a secondary heading in the same Card.

## Example

```jsx
<Page>
  <Page.Card>
    <Page.Section>
      <Page.Header
        render={({ Title, Subtitle }) => (
          <div>
            <Title headingLevel="h1">Headers!</Title>
            <Subtitle>Oh so nice</Subtitle>
          </div>
        )}
      />
    </Page.Section>
    ...
  </Page.Card>
</Page>
```

For backwards compatibility you can use the header using the "title" and "subtitle" props:

```jsx
<Page.Header
  title="A good and thoughtful title"
  subtitle="With an equally insightful subtitle"
/>
```

However, this only renders big H1 tags, so avoid the use of it.

## Props

| Prop             | Type       | Description                                                                             |
| ---------------- | ---------- | --------------------------------------------------------------------------------------- |
| className        | `string`   | Custom class names to be added to the component.                                        |
| isResponsive     | `boolean`  | Enables responsive styles. Default `false`.                                             |
| render           | `function` | function with 2 arguments: `Title` and `Subtitle`, 2 React Components with styles ready |
| withBorder       | `boolean`  | Renders a border under the header. Default `true`.                                      |
| withBottomMargin | `boolean`  | Renders bottom margin styles. Default `true`.                                           |
| title            | `string`   | The [`Heading`](../../Heading) title to render.                                         |
| subtitle         | `string`   | The [`Text`](../../Text) subtitle to render.                                            |
