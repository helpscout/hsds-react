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
}
