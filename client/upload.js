Template.registerHelper('ut9n', function (key){
    return UploadConfig.localisation[key];
});

Template.uploader.events({
  'change input[type="file"]' ( event, template ) {
    this.fileInfo = event.target.files[0];

    if (this.autoStart) {
      this.startUpload();
    }
  }
});

Template['uploader'].helpers({
  model: function() {
    return new Uploader(this.type, this.callbacks, this.autoStart);
  }
});

// uploader model

class Uploader {
  constructor(type, directive, callbacks, autoStart) {
    this.type = type;
    this.directive = directive;
    this.callbacks = callbacks ? callbacks : {};
    this.autoStart = autoStart;

    // info about global progress
    this.infoVar = new ReactiveVar();
    this.stateVar = new ReactiveVar("idle");
  }

  set fileInfo(file) {
    this.file = file;

    if (file) {
      this.infoVar.set(this.file.name + '&nbsp;<span style="font-size: smaller; color: #333">' + Uploader.bytesToSize(this.file.size) + '</span>');
      this.stateVar.set("idle");
    } else {
      this.infoVar.set("");
    }
  }

  info() {
    return this.infoVar.get();
  }

  status (status) {
    return this.stateVar.get() == status;
  }

  progress() {
    if (!this.uploader || !this.uploader.progress() || isNaN(this.uploader.progress())) {
      return 0;
    }
    return Math.round(this.uploader.progress() * 100);
  }


  /**
   * Starts upload
   * @param e
   * @param {string} name Name of the file in the queue that we want to upload
   */
  startUpload(e) {
    if (e) e.preventDefault();

    // this - template instance
    if (!this.file) {
      return;
    }

    let self = this;
    let context = this.callbacks.context ? this.callbacks.context() : null;
    this.uploader = new Slingshot.Upload( this.directive, context );
    this.uploader.send( this.file, ( error, url ) => {
      if ( error ) {
        self.infoVar.set(error);
        self.stateVar.set("error");
      } else {
        UploadConfig.log(UploadConfig.logLevels.debug, "done: " + url);

        self.stateVar.set("done");

        if (self.callbacks.finished) {
          self.callbacks.finished(url, context);
        }
      }
    });

    // set state to repaint control
    self.stateVar.set("running");
  }

  reset(e) {
    if (e) e.preventDefault();
    this.stateVar.set("idle");
    this.infoVar.set("");
    this.file = null;
  }

  class(where) {
    return UploadConfig.UI[this.type][where];
  }
}

Uploader.bytesToSize = function(bytes) {
    if (bytes == 0) return '0 Byte';
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + '&nbsp;' + sizes[i];
  }
