# Heading

A Heading component is a light-weight text heading wrapper enhanced with a collection of aesthetic modifiers.

## Example

```jsx
<Heading>Milk was a bad choice</Heading>
```

## Props

| Prop              | Type              | Description                                      |
| ----------------- | ----------------- | ------------------------------------------------ |
| className         | `string`          | Custom class names to be added to the component. |
| center            | `boolean`         | Center aligns text.                              |
| disableSelect     | `boolean`         | Disables text selection.                         |
| light             | `boolean`         | Lightens the heading color.                      |
| linkStyle         | `boolean`         | Applies [Link](../Link) styles.                  |
| lineHeightInherit | `boolean`         | Inherit the line-height from a parent selector.  |
| lineHeightReset   | `boolean`         | Resets the line-height to `1`.                   |
| noWrap            | `boolean`         | Prevents text from wrapping.                     |
| selector          | `string`          | Determines HTML selector. Default is `div`.      |
| size              | `string`          | Adjust heading size.                             |
| truncate          | `boolean`         | Enables CSS truncation for text.                 |
| weight            | `number`/`string` | Adjust text weight.                              |
| wordWrap          | `boolean`         | Enables CSS `word-break` for text.               |

### Sizes

| Prop    | Font-size |
| ------- | --------- |
| `h1`    | 32px      |
| `h2`    | 24px      |
| `h3`    | 20px      |
| `h4`    | 16px      |
| `h5`    | 14px      |
| `h6`    | 13px      |
| `big`   | 20px      |
| `small` | 11px      |
