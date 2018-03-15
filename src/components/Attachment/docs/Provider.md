# Provider

A Provider component provides child components with props accessible as `context`.


## Example

```jsx
<Provider theme='embed'>
  <Attachment>
    ...
  </Attachment>
</Provider>
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| theme | `string` | Name of the theme style to apply for child Message components. |


### Themes

| Prop | Description |
| --- | --- |
| `default` | Default styles. |
| `preview` | Preview styles. |
