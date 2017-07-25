# Link

A Link component is a light-weight wrapper for the default HTML `<a>` selector.


## Example

```html
You're my boy, <Link href="https://github.com/helpscout/blue">Blue</Link>!
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


### React Router Support

At the moment, the Link component isn't hooked to support [React Router's `<Link>`](http://knowbody.github.io/react-router-docs/api/Link.html) component. However, we can do this if we want to. The React Router Link can be rendered if the `to` prop is used instead of `href`.