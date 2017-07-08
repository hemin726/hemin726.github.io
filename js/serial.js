/*
 * @Author: zhengwei
 * @Date:   2016-11-21 09:31:23
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-11-22 11:20:15
 */

$(function (){
    getSerialList();
    //获取连载动漫列表
    function getSerialList(){
        /*发送请求报文,并接收响应报文*/
        $.ajax({
            // url:"http://192.168.112.112:8888/api/getlianzai",
            url:"http://139.199.192.48:9091/api/getlianzai",
        
        /*渲染数据到页面*/
            success:function (data){
                var html = template('serialListTmp',{'list':data});
                $('#serial').html(html);
            }
        });
    }
});