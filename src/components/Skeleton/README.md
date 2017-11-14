# Skeleton

A Skeleton component is a placeholder component, typically used in loading states.


## Example

```jsx
const content = isLoading ? (
  <Skeleton.Text />
} : (
  <MyActualContent />
)
```


## Components

The default `export` of Skeleton is a plain JS-object, which contains a collection of Skeleton components.

* [Avatar](./docs/Avatar.md)
* [Block](./docs/Block.md)
* [Heading](./docs/Heading.md)
* [Image](./docs/Image.md)
* [Paragraph](./docs/Paragraph.md)
* [Text](./docs/Text.md)
