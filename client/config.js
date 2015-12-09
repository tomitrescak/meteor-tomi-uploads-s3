UploadConfig = {
  logLevels: {
    "debug": 0,
    "error": 1
  },
  logLevel: 1,
  log: function(level, text) {
    if (level >= UploadConfig.logLevel) {
      console.log(text);
    }
  },
  localisation: {
    browse: "Browse",
    cancelled: "Cancelled",
    remove: "Remove",
    upload: "Upload",
    done: "Done",
    cancel: "Cancel",
    dropFiles: "Drop files here",
    error: "Error",
  },
  UI: {
    bootstrap: {
      upload: 'btn btn-primary btn-file upload-control',
      progressOuter: 'form-control upload-control',
      progressInner: 'progressInner',
      progressBar: 'progress-bar progress-bar-success progress-bar-striped',
      removeButton: 'btn btn-default upload-control remove',
      removeButtonIcon: 'glyphicon glyphicon-remove',
      startButton: 'btn btn-info upload-control start',
      startButtonIcon: 'glyphicon glyphicon-upload',
      doneButton: 'btn btn-default upload-control done',
      doneButtonIcon: 'glyphicon glyphicon-ok',
      cancelButton: 'btn btn-danger upload-control cancel',
      cancelButtonIcon: 'glyphicon glyphicon-stop',
      cancelledButton: 'btn btn-warning upload-control',
      cancelledButtonIcon: 'glyphicon glyphicon-cross',
      errorButton: 'btn btn-error upload-control error',
      errorButtonIcon: 'glyphicon glyphicon-stop',
    },
    semanticUI: {
      upload: 'ui icon button btn-file leftButton upload-control',
      progressOuter: 'progressOuter',
      progressInner: 'semantic progressInner',
      progressBar: 'bar progress-bar',
      removeButton: 'ui red button upload-control remove rightButton',
      removeButtonIcon: 'trash icon',
      startButton: 'ui button primary upload-control start rightButton',
      startButtonIcon: 'upload icon',
      doneButton: 'ui green button upload-control rightButton done',
      doneButtonIcon: 'icon thumbs up',
      cancelButton: 'ui yellow button upload-control cancel rightButton',
      cancelButtonIcon: 'icon stop',
      cancelledButton: 'ui yellow button upload-control rightButton',
      errorButton: 'ui red button upload-control error rightButton',
      errorButtonIcon: 'icon stop',
    }
  }
}
