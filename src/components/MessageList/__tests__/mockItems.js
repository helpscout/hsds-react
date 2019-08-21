const mockItems = [
  {
    id: '01ed9cbc-9689-4072-9bff-e74cbf835788',
    isPaused: true,
    isValid: true,
    name: 'Item A',
    title: 'Item A Title',
    to: '/message/item',
    subtitle: '',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    status: 'active',
  },
  {
    id: '1b0b2ba3-785c-4aa2-a439-905a614cc3b0',
    isPaused: false,
    isValid: false,
    name: 'Item B',
    title: 'Item B Title',
    to: '/message/item',
    subtitle: '',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    status: 'not-started',
  },
  {
    id: '46d89237-06b1-42ad-9a57-1f3d0b88dcb5',
    isPaused: false,
    isStarted: false,
    isValid: true,
    name: 'Item C',
    title: 'Item C Title',
    to: '/message/item',
    subtitle: '',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    status: 'paused',
  },
  {
    id: '87f5536d-691e-4fc5-964d-18c6a03e903c',
    isPaused: false,
    isValid: true,
    name: 'Item D',
    title: 'Item D Title',
    to: '/message/item',
    subtitle: '',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    status: 'active',
  },
  {
    id: '3e7c560f-5a22-4633-a564-2b3e1910419c',
    isPaused: false,
    isValid: false,
    name: 'Item E',
    title: 'Item E Title',
    to: '/message/item',
    subtitle: '',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    status: 'paused',
  },
  {
    id: 'f51152c0-5665-47e7-b2be-0479ff8941a4',
    isPaused: false,
    isValid: false,
    name: 'Item F',
    title: 'Item F Title',
    to: '/message/item',
    subtitle: '',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    status: 'paused',
  },
  {
    id: 'b690db2a-0df6-4056-b5ce-d90a28aabf0b',
    isPaused: false,
    isValid: false,
    name: 'Item G',
    title: 'Item G Title',
    to: '/message/item',
    subtitle: '',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    status: 'not-started',
  },
  {
    id: 'd9072ac5-fab8-443a-9b5e-558d091a1c2f',
    isPaused: false,
    isValid: true,
    name: 'Item H',
    title: 'Item H Title',
    to: '/message/item',
    subtitle: '',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    status: 'paused',
  },
]

export default mockItems
