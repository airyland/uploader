define("moe/uploader/0.0.1/uploader",["arale/events/1.1.0/events"],function(a,b,c){function d(a){return this instanceof d?(this.file=a,a.slice=a.slice||a.webkitSlice,void 0):new d(a)}var e=a("arale/events/1.1.0/events");c.exports=d,e.mixTo(d),d.prototype.to=function(a,b){b=b||function(){};var c=this.req=new XMLHttpRequest;c.open("POST",a),c.onload=this.onload.bind(this),c.onerror=this.onerror.bind(this),c.upload.onprogress=this.onprogress.bind(this),c.onreadystatechange=function(){if(4==c.readyState){var a=c.status/100|0;if(2==a)return b(null,c);var d=new Error(c.statusText+": "+c.response);d.status=c.status,b(d)}};var d=new FormData;return d.append("file",this.file),c.send(d),this},d.prototype.abort=function(){return this.trigger("abort"),this.req.abort(),this},d.prototype.onerror=function(a){return this.trigger("error",a),this},d.prototype.onload=function(){return this.trigger("end",this.req),this},d.prototype.onprogress=function(a){return a.percent=a.loaded/a.total*100,this.trigger("progress",a),this},c.exports=d});
