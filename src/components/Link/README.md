# Link

A Link component is a light-weight wrapper for the default HTML `<a>` selector. This component supports [`react-router`](https://github.com/ReactTraining/react-router).

## Example

```html
You're my boy, <Link href="https://github.com/helpscout/blue">Blue</Link>!
```

### Router Link

This component is extended by the `RouteWrapper` higher order component, and can be used similarly to a [`react-router` `<Link>`](https://reacttraining.com/react-router/web/api/Link) component by using the `to` prop. It also has an optional `fetch` property which can specify a promise-returning function which will be invoked before the `to` route is navigated

```html
You're my boy, <Link fetch={fetchBlueData} to="/blue">Blue</Link>!
```


## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| onBlur | function | Callback function when the component is blurred. |
| onClick | function | Callback function when the component is clicked. |
| onFocus | function | Callback function when the component is focused. |
| external | bool | Opens link in a new tab. |
| href | string | Address for the link. Default is `#`. |
| to | string | React Router path to navigate on click. |
| fetch | function| function which returns a promise, will be invoked before routing the `to` route |
