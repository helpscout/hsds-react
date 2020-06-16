import pluginTester from 'babel-plugin-tester'
import hsdsImports from './'

pluginTester({
  plugin: hsdsImports,
  snapshot: true,
  tests: [
    {
      title: 'Should not change imports that are not hsds or in the options',
      code: `
      import React from 'react'
      import _ from 'lodash'
      `,
    },
    {
      title: 'Should not change default imports',
      code: `
      import Page from '@helpscout/hsds-react/components/Page'
      `,
    },
    {
      title:
        'Should change destructured hsds imports to default style imports (1 item)',
      code: `
      import { Tooltip } from '@helpscout/hsds-react/components/'
      `,
    },
    {
      title:
        'Should change destructured hsds imports to default style imports (2+ items)',
      code: `
      import { Tooltip, Select } from '@helpscout/hsds-react/components/'
      `,
    },
    {
      title:
        'Should make sure that "components" is in the transformed path in destructured imports',
      code: `
      import { Tooltip, Select } from '@helpscout/hsds-react'
      `,
    },
    {
      title:
        'Should make sure that "components" is in the transformed path in default imports',
      code: `
      import Button from '@helpscout/hsds-react'
      `,
    },
    {
      title: 'Should not change on inexistent/invalid components',
      code: `
      import { Hello } from '@helpscout/hsds-react'
      `,
    },
    {
      title:
        'Should not change on inexistent/invalid components on a multiple import',
      code: `
      import { Button, Hello } from '@helpscout/hsds-react'
      `,
    },
    {
      title: 'Should not change other imports',
      code: `
      import { OverlayUI } from '@helpscout/hsds-react/components/Overlay/Overlay.css'
      import Keys from '@helpscout/hsds-react/constants/Keys'
      `,
    },
    {
      title: 'Should not change HSDS utilities',
      code: `
      import { getColor } from '@helpscout/hsds-react/styles/utilities/color'
      `,
    },
    {
      title: 'Should not change HSDS adapters',
      code: `
      import '@helpscout/hsds-react/adapters/app'
      `,
    },
    {
      title: 'Should work with mixed stuff',
      code: `
      import Button from '@helpscout/hsds-react'
      import Page from '@helpscout/hsds-react/components/Page'
      import { Tooltip, Select } from '@helpscout/hsds-react/components/'
      import React from 'react'
      import { getColor } from '@helpscout/hsds-react/styles/utilities/color'
      `,
    },
    {
      title: 'Should work with options',
      pluginOptions: {
        packages: ['hsds-react-next'],
      },
      code: `
      import Button from 'hsds-react-next'
      import Page from 'hsds-react-next/components/Page'
      `,
    },
    {
      title: 'Should work with options (single)',
      pluginOptions: {
        packages: 'hsds-react-next',
      },
      code: `
      import Button from 'hsds-react-next'
      import Page from 'hsds-react-next/components/Page'
      `,
    },
    {
      title: 'Should work with options (2+)',
      pluginOptions: {
        packages: ['hsds-react-next', '@helpscout/hsds-react'],
      },
      code: `
      import Button from 'hsds-react-next'
      import Page from 'hsds-react-next/components/Page'
      import { Tooltip, Select } from '@helpscout/hsds-react/components/'
      `,
    },
  ],
})
