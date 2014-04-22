# 选择上传

---

````html
    <input type="file" id="file">
    <button id="start">上传啦</button>
````

````javascript
seajs.use('uploader', function(uploader){

(function($){

$('#start').click(function(){
    var file = document.getElementById('file').files[0];
    var upload = new uploader(file);
    console.log(upload);
    upload.to('https://work.raosee.com/api/upload')
    .on('end',function(req){
        console.log('完成啦');
        console.log(req);
    }).on('progress',function(e){
        console.log(e);
    }).on('complete',function(res){
         console.log(res.data);
    });
});

})(jQuery);

});
````
