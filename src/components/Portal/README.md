# Portal

A Portal component provides the ability to mount components at the root `<body>` level of the DOM, regardless of their current location in the DOM tree. This is useful for interactions like [Modals](../Modal) or Popovers.


## Example

```jsx
<Portal>
  <Card>
    Happy! Happy! Ha ha ha ha!
  </Card>
</Portal>
```


## Customize mounting selector

By default, Portal renders elements into the root `<body>` of the page. However, this can be customized by:

1. Passing the CSS query of the selector you wish for Portal to mount to.
2. Using the `<Portal.Container>` component somewhere in your React app.


### 1. Custom selector example

In this example, our Portal content will render within the `div.zoolander` selector.

```jsx
<App>
  <Main>
    <Portal renderTo='.zoolander'>
      <Card>
        Happy! Happy! Ha ha ha ha!
      </Card>
    </Portal>
  </Main>
  <div className='zoolander' />
</App>
```

### 2. Portal.Container example

In this example, our Portal content will render within the `<Portal.Container>` component.

```jsx
<App>
  <Main>
    <Portal renderTo='.zoolander'>
      <Card>
        Happy! Happy! Ha ha ha ha!
      </Card>
    </Portal>
  </Main>
  <Portal.Container />
</App>
```

* Note: If the `renderTo` selector or `<Portal.Container>` component cannot be found/accessed, Portal will fallback to `<body>`.



## Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| id | string | The ID for the component. |
| renderTo | string | A CSS selector to render content, instead of the `<body>`. |
| timeout | number | Delay before the Portal'ed component is unmounted from the DOM. Default is `0`. |


### Render hooks

Portal has special callback props tied into it's mounting cycle.

| Prop | Type | Description |
| --- | --- | --- |
| onBeforeOpen | function | Fires when the component is mounted, but not rendered. |
| onOpen | function | Fires as soon as the component has rendered. |
| onBeforeClose | function | Fires when the component is about to unmount. |
| onClose | function | Fires after the component is unmounted. |


#### `onBeforeOpen`

`onBeforeOpen` returns a function with a single argument. The argument is the callback function that will trigger the Portal to render (open).

This was designed to allow you to render Portal after async actions or Promises.

```jsx
const MyComponent = props => {
  const onBeforeOpen = (open) => {
    // Custom functions
    open()
  }

  return (
    <Portal onBeforeOpen={onBeforeOpen} />
      <Card>
        Happy! Happy! Ha ha ha ha!
      </Card>
    </Portal>
  )
}
```


#### `onBeforeClose`

`onBeforeClose` returns a function with a single argument. The argument is the callback function that will trigger the Portal to about to unmount (close).

This was designed to allow you to render Portal after async actions or Promises.

```jsx
const MyComponent = props => {
  const onBeforeClose = (close) => {
    // Custom functions
    close()
  }

  return (
    <Portal onBeforeClose={onBeforeClose} />
      <Card>
        Happy! Happy! Ha ha ha ha!
      </Card>
    </Portal>
  )
}
```
