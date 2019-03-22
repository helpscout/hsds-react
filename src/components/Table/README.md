# Table

Renders a table, you know with columns and rows and such.

It has some special powers though.

At it simplest:

```jsx
<Table columns={columns} data={data} />
```

`columns` is a list (array) of objects that describe each column to render.

`data` is a list of objects, one row per object will be rendered. Columns and Data should be related.
Detailed info: [Columns.md](/docs/Columns.md).

## Themes

The Table includes 2 themes "default" and "alternative"

```jsx
<Table columns={columns} data={data} theme="alternative" />
```

The table is customizable by passing an object to the `theme` prop. See [Themes.md](/docs/Themes.md) for a list of all things that can be customized.

## Sorting

Sorting is configured per column, see [Columns.md](/docs/Columns.md) and `TableWithSorting.js` inside `stories/Table` for a full example

## Pagination

Use `<Pagination>` in HSDS together with `<Table>`, see `TableWithPagination.js` inside `stories/Table` for a full example

## Props

| Prop             | Type                                         | Description                                                                                               |
| ---------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| className        | `string`                                     | Custom class names to be added to the component top level element.                                        |
| tableClassName   | `string`                                     | Custom class names to be added to the <table> element.                                                    |
| columns          | `array[{ columnKey: string}]`                | List of columns, see [Columns.md](/docs/Columns.md)                                                       |
| data             | `array[{}]`                                  | List of Rows, which are objects, see [Columns.md](/docs/Columns.md)                                       |  |
| maxRowsToDisplay | `number`                                     | When provided the Table will olnly show this number of rows and and expander to see the rest              |
| containerWidth   | `string`                                     | The table wrapper width (if `tableWidth` is larger, the component scrolls horizontally)                   |
| tableWidth       | `object{ min: string, max: string }`         | The <table> width                                                                                         |
| theme            | `object`                                     | An object to customize the visual appearance of the table. See [Themes.md](/docs/Themes.md)               |
| isLoading        | `boolean`                                    | Adds the 'is-loading' class to the component                                                              |
| sortedInfo       | `object{ columnKey: string, order: string }` | When sortable, indicates which column tha table is sorted by, and in whic order (ascending or descending) |
| onRowClick       | `function`                                   | Callback function when a row is clicked.                                                                  |
| tableRef         | `function`                                   | Retrieves the <table> node.                                                                               |
| wrapperRef       | `function`                                   | Retrieves the table wrapper node.                                                                         |
