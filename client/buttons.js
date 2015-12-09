Template['upload_buttons'].helpers({
  'class': function(what) {
    return UploadConfig.UI[this.type][what] ;
  },
  'status': function(status) {
    return this.uploadContext.stateVar.get() == status;
  }
});

Template['upload_buttons'].events({
  'click .cancel': function (e) {
    this.uploadContext.cancelUpload();
  },
  'click .start': function (e) {
    this.uploadContext.startUpload();
  },
  'click .done': function(e) {
    this.uploadContext.reset();
  },
  'click .error': function(e) {
    this.uploadContext.reset();
  },
  'click .cancelled': function(e) {
    this.uploadContext.reset();
  }
});
