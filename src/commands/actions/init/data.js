
const questionsDefault = [
  {
    'id': 'name',
    'question': 'Type the name for your project',
    'default': 'aseprite project',
    'type': 'input'
  },
  {
    'id': 'description',
    'question': 'Create a description for your project',
    'default': 'aseprite project description',
    'type': 'input'
  },
  {
    'id': 'license',
    'question': 'Select a license for your project',
    'default': 'GNU General Public License v3.0',
    'type': 'list',
    'choices': [
      'MIT',
      'Apache License 2.0',
      'GNU General Public License v3.0',
      'GNU General Public License v2.0',
      'BSD 3-Clause License',
      'BSD 2-Clause License',
      'Boost Software License 1.0',
      'Creative Commons Attribution 4.0 International',
      'Eclipse Public License 1.0',
      'GNU Affero General Public License v3.0',
      'Mozilla Public License 2.0',
      'The Unlicense',
    ]

  },
  {
    'id': 'author:name',
    'question': 'Type the name or nickname for the author',
    'default': 'author name',
    'type': 'input'
  },
  {
    'id': 'author:email',
    'question': 'Type the email for the author',
    'default': 'author email',
    'type': 'input'
  },
  {
    'id': 'author:url',
    'question': 'Type the web pague for the author',
    'default': 'author url',
    'type': 'input'
  },
  {
    'id': 'github',
    'question': 'Type the github for the author',
    'default': 'author github',
    'type': 'input'
  },
];

module.exports = { questionsDefault }