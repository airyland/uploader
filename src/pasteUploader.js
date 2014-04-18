define(function (require) {
    var uploader = require('./uploader');
    var Events = require('arale/events/1.1.0/events');

    // var upload = new uploader();
    var pasteUploader = function () {

    };

    // mixin
    Events.mixTo(pasteUploader);

    pasteUploader.prototype.init = function () {
        var _this = this;
        document.body.addEventListener("paste", pasteHandler);

        function pasteHandler(e) {
            _this.trigger('paste');
            for (var i = 0; i < e.clipboardData.items.length; i++) {
                if (e.clipboardData.items[i].kind == "file" && e.clipboardData.items[i].type == "image/png") {
                    // get the blob
                    var imageFile = e.clipboardData.items[i].getAsFile();
                    _this.trigger('findImage', imageFile);
                    var type = imageFile.type.split('/').pop();
                    new uploader(imageFile).to('https://work.raosee.com/api/upload');
                    console.log(imageFile);
                    // read the blob as a data URL
                    var fileReader = new FileReader();
                    fileReader.onloadend = function (e) {
                        _this.trigger('readImage',this.result);
                    };
                    // TODO: Error Handling!
                    // fileReader.onerror = ...

                    fileReader.readAsDataURL(imageFile);
                    // prevent the default paste action
                    e.preventDefault();
                    // only paste 1 image at a time
                    break;
                }
            }
        }

    };


    return pasteUploader;
});