// var URL = "http://192.168.1.12:8080";
var URL = "http://127.0.0.1:8080";
// 随着本地机器改动

var HTTP = cc.Class({
    extends: cc.Component,

    statics:{
        sessionId : 0,
        userId : 0,
        master_url:URL,
        url:URL,
        sendRequest : function(path,method,data,handler,extraUrl){
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 5000;
            var str = "?";
            for(var k in data){
                if(str != "?"){
                    str += "&";
                }
                str += k + "=" + data[k];
            }
            if(extraUrl == null){
                extraUrl = HTTP.url;
            }
            var requestURL = extraUrl + path + encodeURI(str);
            console.log("RequestURL:" + requestURL);
            xhr.open(method,requestURL, true);
            if (cc.sys.isNative){
                xhr.setRequestHeader("Accept-Encoding","gzip,deflate","text/html;charset=UTF-8");
            }
            
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)){
                    console.log("http res("+ xhr.responseText.length + "):" + xhr.responseText);
                    try {
                        var res = JSON.parse(xhr.responseText);
                        if(handler !== null){
                            handler(res);
                        }                        /* code */
                    } catch (e) {
                        console.log("err:" + e);
                        //handler(null);
                    }
                    finally{

                    }
                }
            };
            
            xhr.send();
            return xhr;
        },
    },
});