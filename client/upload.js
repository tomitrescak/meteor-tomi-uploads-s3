Template.registerHelper('ut9n', function (key){
    return UploadConfig.localisation[key];
});

Template.uploader.onCreated(function() {
  this.index = 0;
});

Template.uploader.events({
  'change input[type="file"]' ( event, template ) {
    this.fileInfo = event.target.files;

    if (this.autoStart) {
      this.startUpload();
    }
  }
});



Template['uploader'].helpers({
  model: function() {
    return new Uploader(Template.instance(), this.type, this.directive, this.callbacks, this.autoStart, this.multiple);
  }
});

// uploader model

class Uploader {
  constructor(template, type, directive, callbacks, autoStart, multiple) {
    this.template = template;
    this.type = type;
    this.directive = directive;
    this.callbacks = callbacks ? callbacks : {};
    this.autoStart = autoStart;
    this.multiple = multiple;

    // info about global progress
    //this.infoVar = new ReactiveVar();
    //this.stateVar = new ReactiveVar("idle");
  }

  set fileInfo(files) {
    this.files = files;

    if (files) {
      if (files.length == 1) {
        var file = files[0];
        this.infoVar.set(file.name + '&nbsp;<span style="font-size: smaller; color: #333">' + Uploader.bytesToSize(file.size) + '</span>');
      }
      else {
        this.infoVar.set(files.length + " files");
      }
      this.stateVar.set("idle");
    } else {
      this.infoVar.set("");
    }
  }

  get files() {
    return this.template.files;
  }

  set files(files) {
    this.template.files = files;
  }

  get uploader() {
    return this.template.uploader;
  }

  set uploader(uploader) {
    this.template.uploader = uploader;
  }

  get index() {
    if (this.template.index == 0) {
      this.template.index = 0;
    }
    return this.template.index;
  }

  set index(value) {
    this.template.index = value;
  }

  get infoVar() {
    if (this.template.infoVar == null) {
      this.template.infoVar = new ReactiveVar();
    }
    return this.template.infoVar;
  }

  get stateVar() {
    if (this.template.stateVar == null) {
      this.template.stateVar = new ReactiveVar("idle");
    }
    return this.template.stateVar;
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
    if (this.files.length > 1) {
      return Math.round((100 / this.files.length) * this.index + ((100 / this.files.length) * this.uploader.progress()));
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
    if (!this.files) {
      return;
    }

    if (this.files.length > 1) {
      console.log("Setting: " + this.index);
      this.infoVar.set((this.index + 1) + " / " + this.files.length + " files");
    }

    let self = this;
    let context = this.callbacks.context ? this.callbacks.context() : null;
    this.uploader = new Slingshot.Upload( this.directive, context );
    this.uploader.send( this.files[this.index], ( error, url ) => {
      if ( error ) {
        self.infoVar.set(error);
        self.stateVar.set("error");
        this.index = 0;
      } else {
        if (self.callbacks.finished) {
          self.callbacks.finished(url, context);
        }

        // take care of indexes
        this.index++;
        if (this.files.length == this.index) {
          UploadConfig.log(UploadConfig.logLevels.debug, "done: " + url);
          self.stateVar.set("done");
          this.index = 0;
        } else {
          this.startUpload();
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
    this.files = null;
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
