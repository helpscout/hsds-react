export const pageBreakpointsConfig = {
  breakpoint: {
    widescreen: 1050,
    superWidescreen: 1350,
    fullscreen: 1450,
    widest: 1650,
  },
}

export const pageConfig = {
  minWidth: '480px',
  maxWidth: {
    default: '700px',
    superWidescreen: '1000px',
    widest: '1200px',
  },
  transition: 'max-width 200ms ease',
}

export const headerConfig = {
  paddingBottom: '11px',
  marginBottom: '27px',
  marginRight: {
    superWidescreen: '50px',
  },
  width: {
    default: '100%',
    superWidescreen: '250px',
    widest: '300px',
  },
}

export const pageSectionConfig = {
  flexDirection: {
    default: 'column',
    superWidescreen: 'row',
  },
  flexItemsAlign: {
    superWidescreen: 'flex-start',
  },
  marginBottom: '35px',
}

export const actionsConfig = {
  marginBottom: 100,
  marginTop: 30,
  spacing: 10,
}

export const pageCardConfig = {
  borderRadius: '4px',
  boxShadow: `
    0 0 0 1px rgba(0, 0, 0, 0.04),
    0 2px 8px 0 rgba(0,0,0,0.04),
    0 5px 10px 0 rgba(99, 116, 134, 0.03)
  `,
  boxShadowHover: `
    rgb(214, 221, 227) 0px 0px 0px 1px,
    0 2px 8px 0 rgba(0,0,0,0.04),
    0 5px 10px 0 rgba(99, 116, 134, 0.03)
  `,
  flexDirection: {
    default: 'column',
    superWidescreen: 'row',
  },
  marginBottom: '20px',
  padding: {
    default: '50px 50px 65px',
    widescreen: '50px 100px 65px',
    superWidescreen: '65px 50px',
    fullscreen: '65px 100px',
  },
  transition: 'all 300ms ease',
}
