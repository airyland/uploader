define("moe/uploader/0.0.1/uploader-debug", [ "arale/events/1.1.0/events-debug" ], function(require, exports, module) {
    /**
     * Module dependencies.
     */
    var Events = require("arale/events/1.1.0/events-debug");
    /**
     * Expose `Upload`.
     */
    module.exports = Upload;
    /**
     * Initialize a new `Upload` file`.
     * This represents a single file upload.
     *
     * Events:
     *
     *   - `error` an error occurred
     *   - `abort` upload was aborted
     *   - `progress` upload in progress (`e.percent` etc)
     *   - `end` upload is complete
     *
     * @param {File} file
     * @api private
     */
    function Upload(file) {
        if (!(this instanceof Upload)) return new Upload(file);
        //Emitter.call(this);
        this.file = file;
        file.slice = file.slice || file.webkitSlice;
    }
    /**
     * Mixin emitter.
     */
    Events.mixTo(Upload);
    /**
     * Upload to the given `path`.
     *
     * @param {String} path
     * @param {Function} [fn]
     * @api public
     */
    Upload.prototype.to = function(path, fn) {
        var self = this;
        fn = fn || function() {};
        var req = this.req = new XMLHttpRequest();
        req.open("POST", path);
        req.onload = this.onload.bind(this);
        req.onerror = this.onerror.bind(this);
        req.upload.onprogress = this.onprogress.bind(this);
        req.onreadystatechange = function() {
            if (4 == req.readyState) {
                var type = req.status / 100 | 0;
                if (2 == type) return fn(null, req);
                var err = new Error(req.statusText + ": " + req.response);
                err.status = req.status;
                fn(err);
            }
        };
        var body = new FormData();
        body.append("file", this.file);
        req.send(body);
        return this;
    };
    /**
     * Abort the XHR.
     *
     * @api public
     */
    Upload.prototype.abort = function() {
        this.trigger("abort");
        this.req.abort();
        return this;
    };
    /**
     * Error handler.
     *
     * @api private
     */
    Upload.prototype.onerror = function(e) {
        this.trigger("error", e);
        return this;
    };
    /**
     * Onload handler.
     *
     * @api private
     */
    Upload.prototype.onload = function(e) {
        this.trigger("end", this.req);
        this.trigger("complete", JSON.parse(this.req.responseText));
        return this;
    };
    /**
     * Progress handler.
     *
     * @api private
     */
    Upload.prototype.onprogress = function(e) {
        e.percent = e.loaded / e.total * 100;
        this.trigger("progress", e);
        return this;
    };
    module.exports = Upload;
});
