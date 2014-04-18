# 粘贴上传

---
````html
示例图片
<img src="http://sfault-avatar.b0.upaiyun.com/232/734/2327341726-1030000000202640_medium40">
````
````javascript

seajs.use('pasteUploader', function(pasteUploader){
    var uploader = new pasteUploader({api:'https://work.raosee.com/api/upload'}).on('all',function(name,arg1){
        console.log(name,arg1);
    }).on('readImageDone',function(rs){
        jQuery('#demo').html('<img src="'+rs.url+'">'+'大小为'+rs.size);
    }).init();

    jQuery('#start').click(function(){
         uploader.upload();
    });
});

````

````html
<a href="javascript:" id="start">开始上传啦</a>
<div id="demo">预览显示在这里</div>
````