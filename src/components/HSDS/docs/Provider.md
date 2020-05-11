# Provider

This component will wrap all content with a ScopeProvider, so we could inject a classname or id before all css selectors created within this component

## Example

```jsx
<HSDS.Provider scope="#app">
  <div>{content}</div>
</HSDS.Provider>
```

## Props

| Prop  | Type     | Description                                                        |
| ----- | -------- | ------------------------------------------------------------------ |
| scope | `string` | Change the scope to generate css selector. Default is 'hsds-react' |
