This is a client interface package for the amazing [Slingshot](https://github.com/CulturalMe/meteor-slingshot) package.
It is a reworked package of the popular [tomi:upload-jquery](https://github.com/tomitrescak/meteor-tomi-upload-jquery)

![Screenshot](https://dl.dropboxusercontent.com/u/3418607/Screenshots/Uploads-Single.png)


The configuration is dead easy

### S3 Setup

Please follow the first part of [this fantastic tutorial](https://themeteorchef.com/recipes/uploading-files-to-amazon-s3/) to setup your S3 bucket.

### Running Meteor

If you store your settings in `settings.json` such as the ones below, make sure you run meteor as `meteor --settings settings.json`

```json
{
  "AWSAccessKeyId": "XXX",
  "AWSSecretAccessKey": "YYY"
}
```

### Server / Shared

Configure slingshot on server, naming your directive for example `uploadToAmazonS3`.

```javascript
Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
  maxSize: 10 * 1024 * 1024,
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  bucket: "clara-uploads",
  acl: "public-read",
  authorize: function () {
    let userFileCount = Files.find( { "userId": this.userId } ).count();
    return userFileCount < 3 ? true : false;
  },
  key: function ( file, meta ) {
    var user = Meteor.users.findOne( this.userId );
    return "dir/" + file.name;
  }
});
```

### Client

On client, all you have to to is to reference your directive `uploadToAmazonS3` and select which UI framework you are using.

```html
{{> uploader type='semanticUI' directive=uploadToAmazonS3 callbacks=callbacks autoStart=autoStart }}
{{> uploader type='bootstrap' directive=uploadToAmazonS3 callbacks=callbacks autoStart=autoStart }}
```

Dead easy!
Enjoy!

### Caveats

This package does not support upload resume, nor file deletion. This is work to be done, PR's welcome!
Cancel button currently does not work.
