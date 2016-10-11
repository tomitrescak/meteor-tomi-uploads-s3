Package.describe({
  name: 'tomi:upload-s3',
  summary: 'Client template for uploads using S3 uploads',
  version: '1.0.2',
  git: 'https://github.com/tomitrescak/meteor-tomi-upload-s3.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use(['reactive-var', 'templating'], 'client');
  api.use(['ecmascript@0.1.3'], ['client', 'server']);
  api.use(['edgee:slingshot@0.7.0']);

  api.addFiles([
    'client/main.css',
    // 'templates/queueItem.html',
    // 'templates/queueItem.js',
    'client/upload.html',
    'client/upload.js',
    'client/buttons.html',
    'client/buttons.js',
    // 'templates/dropzone.html',
    // 'templates/dropzone.js',
    'client/config.js'
  ], 'client');

  api.export('UploadConfig', 'client');
});

//Package.onTest(function(api) {
//  api.use('tinytest');
//  api.use('tomi:upload-client');
//  api.addFiles('upload-client-tests.js');
//});
