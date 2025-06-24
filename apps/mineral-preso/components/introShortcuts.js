const introShortcuts = [
  {
    sequence: ['ESC'],
    description: 'Leave shortcut mode',
    requiresActivation: true,
  },
  {
    sequence: ['l'],
    description: 'Go to list',
    requiresActivation: true,
  },
  {
    sequence: [','],
    description: 'Go to settings',
    requiresActivation: true,
  },
  {
    sequence: ['n'],
    description: 'Create new file',
    requiresActivation: true,
  },
  {
    sequence: ['r'],
    description: 'Toggle dark mode',
    requiresActivation: false,
  },
];

export default introShortcuts;
