Package.describe({
  name: 'ethereum:elements',
  summary: 'Basic elements for Dapps',
  version: '0.1.3',
  git: 'http://github.com/ethereum/meteor-package-elements'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('underscore', 'client');
  api.use('jquery', 'client');
  api.use('templating', 'client');
  api.use('less', 'client');

  api.use('ethereum:tools@0.0.2', 'client');
  api.use('frozeman:animation-helper@0.2.5', 'client');
  api.use('frozeman:template-var@1.0.5', 'client');
  api.use('mistereo:identicon@1.0.0', 'client');

  api.addFiles('icons/Simple-Line-Icons.svg', 'client');
  api.addFiles('icons/Simple-Line-Icons.ttf', 'client');
  api.addFiles('icons/Simple-Line-Icons.woff', 'client');
  api.addFiles('icons/Simple-Line-Icons.eot', 'client');
  api.addFiles('icons/simple-line-icons.css', 'client');

  api.addFiles('main.less', 'client');

  api.addFiles('identicon.html', 'client');
  api.addFiles('identicon.js', 'client');

  api.addFiles('addressInput.html', 'client');
  api.addFiles('addressInput.js', 'client');

  api.addFiles('modal.html', 'client');
  api.addFiles('modal.js', 'client');

  api.addFiles('modalQuestion.html', 'client');
  api.addFiles('modalQuestion.js', 'client');
});

// Package.onTest(function(api) {
//   api.use('tinytest');
//   api.use('ethereum:elements');
//   api.addFiles('elements-tests.js');
// });

