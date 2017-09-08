# RouterWrapper

RouterWrapper is a higher-order component which wraps a Component and adds two new props:
* `to` - a `<Route>` path which clicks will route to if clickes, same as a React-router `<Link>`
* `fetch` - a function which returns a promise, which will be invoked before the `to` path is routed


## Example

```javascript
class Blue extends Component { ... }
Blue = RouteWrapper(Blue)
```

```html
You're my boy, <Blue fetch={fetchData} to="path/to/route" \>!
```

## Props

| Prop | Type | Description |
| --- | --- | --- |
| to | string | React Router path to navigate on click. |
| fetch | function| function which returns a promise, will be invoked before routing the `to` route |
