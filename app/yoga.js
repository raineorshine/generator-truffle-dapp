module.exports = {
  prompts: [
    {
      type: 'text',
      name: 'project',
      message: 'Project Name'
    },
    {
      type: 'text',
      name: 'description',
      message: 'Description'
    },
    {
      type: 'text',
      name: 'keywords',
      message: 'Keywords (comma-separated)'
    },
    {
      type: 'text',
      name: 'username',
      message: 'Github Username',
      store: true
    },
    {
      type: 'text',
      name: 'authorName',
      message: 'Author Name',
      store: true
    },
    {
      type: 'text',
      name: 'authorEmail',
      message: 'Author Email',
      store: true
    },
    {
      type: 'text',
      name: 'authorUrl',
      message: 'Author URL',
      store: true
    },
    {
      type: 'text',
      name: 'license',
      message: 'License',
      store: true,
      default: 'ISC'
    }
    // {
    //   type: 'checkbox',
    //   name: 'options',
    //   message: 'Options:',
    //   choices: [
    //     { name: 'Gulp', value: 'gulp' },
    //     { name: 'Babel', value: 'babel' },
    //     { name: 'Web App', value: 'web' },
    //     { name: 'Static Site', value: 'isStatic' },
    //     { name: 'CLI', value: 'cli' }
    //   ]
    // }
  ]
}
