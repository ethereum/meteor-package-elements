Package.describe({
  name: 'ethereum:elements',
  summary: 'Basic elements for Dapps',
  version: '0.7.18',
  git: 'http://github.com/ethereum/meteor-package-elements'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.use('underscore', 'client');
  api.use('jquery', 'client');
  api.use('templating', 'client');
  api.use('reactive-var', 'client');
  api.use('less', 'client');
  api.use('standard-minifiers', 'client');

  api.use('alexvandesande:identicon@2.0.2', 'client');
  api.use('3stack:bignumber@2.0.0', 'client');
  // api.use('underscorestring:underscore.string@3.1.1', 'client');

  api.use('ethereum:web3@0.15.2', 'client');
  api.use('ethereum:tools@0.4.0', 'client');
  api.use('frozeman:animation-helper@0.2.5', 'client');
  api.use('frozeman:storage@0.1.8', 'client');
  api.use('frozeman:template-var@1.2.2', 'client');

  // provide packages for the app developer as well
  api.imply(['frozeman:template-var','ethereum:tools'], 'client');


  api.export(['EthElements'], 'client');


  api.addAssets('identicon-load.gif', 'client');

  api.addFiles('lib/lesshat.import.less', 'client');
  api.addFiles('containers.import.less', 'client');
  api.addFiles('elements.import.less', 'client');
  api.addFiles('main.less', 'client');

  api.addFiles('ethelements.js', 'client');

  api.addFiles('identicon.html', 'client');
  api.addFiles('identicon.js', 'client');

  api.addFiles('addressInput.html', 'client');
  api.addFiles('addressInput.js', 'client');

  api.addFiles('dataTextarea.html', 'client');
  api.addFiles('dataTextarea.js', 'client');

  api.addFiles('selectAccount.html', 'client');
  api.addFiles('selectAccount.js', 'client');

  api.addFiles('selectGasPrice.html', 'client');
  api.addFiles('selectGasPrice.js', 'client');

  api.addFiles('modal.html', 'client');
  api.addFiles('modal.js', 'client');

  api.addFiles('modalQuestion.html', 'client');
  api.addFiles('modalQuestion.js', 'client');

  api.addFiles('output.html', 'client');
  api.addFiles('output.js', 'client');

  api.addFiles('lib/hqx.js', 'client');
});

// Package.onTest(function(api) {
//   api.use('tinytest');
//   api.use('ethereum:elements');
//   api.addFiles('elements-tests.js');
// });
