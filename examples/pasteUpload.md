# 粘贴上传

---

````javascript

seajs.use('pasteUploader', function(pasteUploader){
    new pasteUploader().on('all',function(name,arg1){
        console.log(name,arg1);
    }).init();
});

````