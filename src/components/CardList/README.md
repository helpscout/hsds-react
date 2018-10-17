# CardList

A CardList component displays an array of [Cards](../Card).

The children must be an [ArticleCard](../ArticleCard) or [Card](../Card) component.

## Example

```jsx
<CardList>
  <Card />
  <Card />
  <Card />
</CardList>
```

## Props

| Prop              | Type     | Description                                                                       |
| ----------------- | -------- | --------------------------------------------------------------------------------- |
| animationEasing   | `string` | Easing of [animation](../Animate) applied to the child [Cards](../Card).          |
| animationSequence | `string` | Style of [animation](../Animate) applied to the child [Cards](../Card).           |
| animationStagger  | `number` | Amount (in `ms`) to stagger the [animations](../Animate) of the [Cards](../Card). |
| className         | `string` | Custom class names to be added to the component.                                  |  |
