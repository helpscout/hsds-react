# Pagination

A Pagination component listing the current items visible for a given range. It can also add a navigation that will let a user update the active page based on the total of items

## Example

```jsx
<Pagination activePage={1} totalItems={250} />
```

## Props

| Prop              | Type       | Description                                                        |
| ----------------- | ---------- | ------------------------------------------------------------------ |
| activePage        | `integer`  | Current selected page                                              |
| className         | `string`   | Custom class names to be added to the component.                   |
| onChange          | `function` | Callback when current page is changed.                             |
| rangePerPage      | `integer`  | Number of items per page                                           |
| showNavigation    | `bool`     | Add a navigation to the component                                  |
| subject           | `string`   | Pagination label after the range                                   |
| pluralizedSubject | `string`   | Pluralize subject. If empty subject will be automaticaly pluralize |
| totalItems        | `integer`  | Total of items                                                     |
