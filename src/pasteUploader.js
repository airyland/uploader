define(function (require) {
    var uploader = require('./uploader');
    var Events = require('arale/events/1.1.0/events');

    var pasteUploader = function (option) {
        this.o = option;
    };

    // mixin
    Events.mixTo(pasteUploader);

    // start upload
    pasteUploader.prototype.upload = function () {
        var _this = this;
        if(!this.imageFile){
            throw 'no image file found';
            return;
        }
        if (!this.o.api) {
            return;
        }
        new uploader(_this.imageFile).on('all',function (name, arg1) {
            _this.trigger(name, arg1);
        }).to(this.o.api);
        return _this;
    };

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
                    _this.imageFile = imageFile;
                    // read the blob as a data URL
                    var fileReader = new FileReader();
                    _this.trigger('readImageStart');
                    fileReader.onloadend = function (e) {
                        console.log(e);
                        var size = bytesToSize(e.total);
                        // read done
                        _this.trigger('readImageDone', {url: this.result, size: size, raw: e});
                    };

                    fileReader.onerror = function () {
                        // read error
                        _this.trigger('readImageError');
                    };

                    fileReader.readAsDataURL(imageFile);
                    // prevent the default paste action
                    e.preventDefault();
                    // only paste 1 image at a time
                    break;
                }
            }
        }

        return this;
    };

    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Bytes';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }


    return pasteUploader;
});