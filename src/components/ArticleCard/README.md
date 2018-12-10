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
| title        | `string`  | Title of the card. Will be truncated based on the titleLimit prop                             |
| content      | `node`    | Content of the card. Will be truncated based on the contentLimit prop if content is a string. |
| metaHeader   | `element` | Element that will be displayed above the title                                                |
| footer       | `element` | Element that will be displayed below the content                                              |
| titleLimit   | `number`  | The amount of characters to keep before truncation on the title string.                       |
| contentLimit | `number`  | The amount of characters to keep before truncation on the content string.                     |
| titleLimit   | `number`  | The amount of characters to keep before truncation on the title string.                       |
| contentLimit | `number`  | The amount of characters to keep before truncation on the content string.                     |
| titleSize    | `string`  | Adjust title text size.                                                                       |
| contentSize  | `string`  | Adjust content text size.                                                                     |
