# Link

A Link component is a light-weight wrapper for the default HTML `<a>` selector. This component supports [`react-router`](https://github.com/ReactTraining/react-router).

## Example

```html
You're my boy, <Link href="https://github.com/helpscout/blue">Blue</Link>!
```

### React Router Link

This component can be transformed into a [`react-router` `<Link>`](https://reacttraining.com/react-router/web/api/Link) component by using the `to` prop.

```html
You're my boy, <Link to="/blue">Blue</Link>!
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
| to | string | [`react-router`](https://github.com/ReactTraining/react-router) Address for the link. |
