# ArticleCard

An ArticleCard component is used to encapsulate pieces of UI that share a common concept or action with some placeholders where we could insert any element (metaHeader, footer) or strings (title, content).

## Example

```jsx
<ArticleCard title="A title" content="a long content text" />
```

## Props

| Prop         | Type      | Description                                                                                   |
| ------------ | --------- | --------------------------------------------------------------------------------------------- |
| className    | `string`  | Custom class names to be added to the component.                                              |
| content      | `node`    | Content of the card. Will be truncated based on the contentLimit prop if content is a string. |
| contentLimit | `number`  | The amount of characters to keep before truncation on the content string.                     |
| contentSize  | `number`  | The [Text](../Text) font-size for the content.                                                |
| footer       | `element` | Element that will be displayed below the content                                              |
| isHovered    | `boolean` | Renders hovered styles.                                                                       |
| metaHeader   | `element` | Element that will be displayed above the title                                                |
| title        | `string`  | Title of the card. Will be truncated based on the titleLimit prop                             |
| titleLimit   | `number`  | The amount of characters to keep before truncation on the title string.                       |
| titleSize    | `number`  | The [Text](../Text) font-size for the title.                                                  |

This component is an extension of [Card](../Card). Check out [Card](../Card) for additional props.
