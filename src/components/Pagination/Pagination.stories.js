import * as React from 'react'
import styled from 'styled-components'
import { getColor } from '../../styles/utilities/color'
import { boolean, number, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Pagination } from '..'

export default {
  component: Pagination,
  title: 'Components/Pagination',
}

export const config = {
  TOTAL_ITEMS: 255,
  RANGE_PER_PAGE: 50,
}

const PaginationWrapperUI = styled('div')`
  min-width: 400px;
  max-width: 800px;
  background-color: ${getColor('grey.300')};
  padding: 20px;
`

// stories.addDecorator(storyFn => (
//   <PaginationWrapperUI>
//     <div style={{ backgroundColor: '#fff' }}>{storyFn()}</div>
//   </PaginationWrapperUI>
// ))

const subject = () => text('subject', 'Customer')
const activePage = (cPage = 1) => number('activePage', cPage)

const getKnobsProps = otherKnobs => {
  return {
    totalItems: number('totalItems', config.TOTAL_ITEMS),
    rangePerPage: number('rangePerPage', config.RANGE_PER_PAGE),
    ...otherKnobs,
  }
}

export const Default = () => {
  return <Pagination {...getKnobsProps()} onChange={action('changePage')} />
}

Default.story = {
  name: 'default',
}

export const WithSubject = () => {
  return (
    <Pagination
      showNavigation={false}
      {...getKnobsProps({ subject: subject() })}
    />
  )
}

WithSubject.story = {
  name: 'with subject',
}

export const WithSingularSubject = () => {
  const props = {
    subject: subject(),
    totalItems: number('totalItems', 1),
  }
  return <Pagination showNavigation={false} {...props} />
}

WithSingularSubject.story = {
  name: 'with singular subject',
}

export const WithCustomPluralizedSubject = () => {
  const props = {
    subject: 'Complex',
    pluralizedSubject: 'Complexes',
    totalItems: number('totalItems', 10),
  }
  return <Pagination showNavigation={false} {...props} />
}

WithCustomPluralizedSubject.story = {
  name: 'with custom pluralized subject',
}

export const StartOfNavigation = () => {
  return (
    <Pagination
      {...getKnobsProps({ subject: subject(), activePage: activePage(1) })}
      showNavigation={true}
      onChange={action('changePage')}
    />
  )
}

StartOfNavigation.story = {
  name: 'start of navigation',
}

export const MiddleOfNavigation = () => {
  return (
    <Pagination
      {...getKnobsProps({ subject: subject(), activePage: activePage(2) })}
      showNavigation={true}
      onChange={action('changePage')}
    />
  )
}

MiddleOfNavigation.story = {
  name: 'middle of navigation',
}

export const EndOfNavigation = () => {
  return (
    <Pagination
      {...getKnobsProps({ subject: subject(), activePage: activePage(10) })}
      showNavigation={true}
      onChange={action('changePage')}
    />
  )
}

EndOfNavigation.story = {
  name: 'end of navigation',
}

export const IsLoading = () => {
  return (
    <Pagination
      {...getKnobsProps({
        subject: subject(),
        activePage: activePage(10),
        isLoading: boolean('isLoading', true),
      })}
      showNavigation={true}
      onChange={action('changePage')}
    />
  )
}

IsLoading.story = {
  name: 'isLoading',
}

class PaginationWrapper extends React.Component {
  state = {
    activePage: 1,
  }

  handleOnChange = nextPage => {
    this.setState({ activePage: nextPage })
  }

  render() {
    const { activePage: propPage, ...rest } = this.props
    const { activePage } = this.state

    return (
      <Pagination
        {...rest}
        activePage={activePage}
        showNavigation={true}
        onChange={this.handleOnChange}
      />
    )
  }
}

export const InAction = () => {
  return <PaginationWrapper {...getKnobsProps({ subject: subject() })} />
}

InAction.story = {
  name: 'in action',
}
