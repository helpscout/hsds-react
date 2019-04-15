# Columns

Columns is a list of objects that configure each column, here you can customize how to render cells, sortability and more.

Full list of acceptable fields 👇:

* `columnKey`: This value ties to corresponding data field(s), can be a string for a single data field, or a list (array) to get multiple data fields
* `title`: The string that renders by default in the header for this column
* `width`: Column width, ideally the sum of all the columns should be 100%
* `align`: Horizontal cell alignment for this column, one of "left" (default), "center" or "right"
* `renderHeaderCell`: To customize how to render the column header. A function that takes the column object and returns a React Component/Element
* `renderCell`: To customize how each cell renders it corresponding data on this column. A function that takes the corresponding data and returns a React Component/Element
* `sorter`: A function that instructs how to sort the data based on this column
* `sortKey`: If this column contains more than one columnKey, sorting will be based on this value which should exist in the list of Column Keys for this column.

Note: only `columnKey` is required

Example:

```jsx
const columns = [
  {
    title: 'Company',
    columnKey: 'companyName',
    width: '50%',
    align: 'center',
    renderCell: ({ companyName }) => <strong>companyName</strong>
    renderHeaderCell: column => <h3>{column.title}</h3>
  },
  {
    title: 'Customer',
    columnKey: ['name', 'email'],
    width: '50%',
    align: 'left',
    renderCell: ({ name, email }) => (
        <div>
          <strong>{name}</strong>
          <br />
          <span>{email}</span>
        </div>
      ),
    sorter: function sortByName() {/*...*/},
    sortKey: 'name'
  },
]

const data = [{
  id: 0,
  name: 'Walter White',
  companyName: 'Heisenberg Inc',
  email: 'walt@babyblue.net',
}, {}, {}]
```
