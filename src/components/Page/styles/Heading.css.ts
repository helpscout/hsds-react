import styled from '../../styled'
import Heading from '../../Heading'

export const config = {
  marginTop: '35px',
  marginBottom: '27px'
}

export const HeadingUI = styled(Heading)`
  margin: 0;
  padding: 0;
`

export const SecondaryHeadingUI = styled(Heading)`
  margin: ${config.marginTop} 0 ${config.marginBottom};
  padding: 0;
`