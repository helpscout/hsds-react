# GlobalStyle

This component is a way to inject global styling in an app that will use HSDS. By injecting that component, a global stylesheet will be add to the page,
targetting some basic styling to make the HSDS experience better. To apply some styling to all component,
we need to add a `hsds-react` className to the root component that is using HSDS.

## Example

```jsx
<GlobalStyle />
```

```jsx
<GlobalStyle fontFamily="Helvetica, sans-serif " fontFamilyMono="Menlo, serif" fontSize="15 />
```

## Props

| Prop           | Type     | Description                                                                               |
| -------------- | -------- | ----------------------------------------------------------------------------------------- |
| fontFamily     | `string` | Change the default font-family for all components.                                        |
| fontFamilyMono | `string` | Change the default mono font-family for all components.                                   |
| fontSize       | `string` | Change the base font-size value that all components use to calculate their real font-size |
