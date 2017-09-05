# Grid

A Grid component provide layout-based styles to help structure UI elements. Grid's styles are based on [`seed-grid`](http://developer.helpscout.net/seed/packs/seed-grid/).

## Example

```html
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
| className | string | Custom class names to be added to the component. |



## Sub-Components

Grid contains 3 sub-components: [Grid.Container](#grid-container), [Grid.Row](#grid-row), and [Grid.Col].

### Example

```html
<Grid.Container>
  <Grid.Row>
    <Grid.Col size='4'>You're</Grid.Col>
    <Grid.Col size='4'>My Boy</Grid.Col>
    <Grid.Col size='4'>Blue</Grid.Col>
  </Grid.Row>
</Grid.Container>
```


### Grid.Container

#### Example

```html
<Grid.Container>
  ...
</Grid.Container>
```


#### Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| fluid | bool | Adds fluid styles to the component. |
| responsive | bool | Adds responsive styles to the component. |


### Grid.Row

#### Example

```html
<Grid.Row>
  ...
</Grid.Row>
```


#### Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| flex | bool | Adds flex styles to the component. |
| size| string | Adds sizing styles to the component. |


### Grid.Col

#### Example

```html
<Grid.Col>
  ...
</Grid.Col>
```


#### Props

| Prop | Type | Description |
| --- | --- | --- |
| className | string | Custom class names to be added to the component. |
| size| string | Adds sizing styles to the component. |
