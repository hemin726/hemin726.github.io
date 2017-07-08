/*
 * @Author: zhengwei
 * @Date:   2016-11-21 09:31:23
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-11-22 14:47:39
 */

$(function(){
    getFeaturesList();
    //获取专题列表
    function getFeaturesList(){
        //发送请求报文, 并且接受响应报文
        $.ajax({
            url:"http://139.199.192.48:9091/api/gettopics",
            // url:"http://192.168.112.112:8888/api/gettopics",

            success:function (data){
                var html = template('featuresListTmp',{'list':data});
                $('#features').html(html);
            }
        });
    }
});