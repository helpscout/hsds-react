# DetailList

A DetailList component is a presentational component, and is an enhanced version of the default HTML `<dl>`. The List component provide a container for [DetailList.Item](./Item.md) and [DetailList.Title](./Title.md) components.

## Example

```jsx
<DetailList>
  <DetailList.Title>
    Movies
  </DetailList.Title>
  <DetailList.Item>
    Zoolander
  </DetailList.Item>
  <DetailList.Item>
    Old School
  </DetailList.Item>
  <DetailList.Item>
    Elf
  </DetailList.Item>
</DetailList>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
