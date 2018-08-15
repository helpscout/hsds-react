# Grid

A Grid component provide layout-based styles to help structure UI elements. Grid's styles are based on [`seed-grid`](http://developer.helpscout.net/seed/packs/seed-grid/).

## Example

```jsx
<Grid>
  <Grid.Col size='4'>You're</Grid.Col>
  <Grid.Col size='4'>My Boy</Grid.Col>
  <Grid.Col size='4'>Blue</Grid.Col>
</Grid>
```

Note: For convenience purposes, Grid surrounds child components with a [Grid.Container](#grid-container) and [Grid.Row](#grid-row). Those Grid sub-components can be used in isolation, and do not depend on Grid.

### Props

| Prop | Type | Description |
| --- | --- | --- |
| className | `string` | Custom class names to be added to the component. |
