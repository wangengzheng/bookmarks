;(function (url, callback) {

    if (wxShareData == null && wxShareData == undefined)
    {
        /*
        
        var wxShareData = {
           "shareTitle":"分享title",
           "shareDesc":"分享desc",
           "shareImg":"分享img url",
        };

        */

        throw new Error("wxShareData is not defind");
    }

    var shareTitle = wxShareData.shareTitle
    var imgUrl = wxShareData.shareImg;
    var linkUrl = removeQueryStringParameter("from");
    var shareDesc = wxShareData.shareDesc;

    $.get('/weixin/jssdk', { "url": url, "callback": callback }, function (data) {
        if (data != null || data != undefined) {
            eval(data);
        }
    });


    function call(data) {


        wx.config({
            debug: false,
            appId: data.AppId,
            timestamp: data.Timestamp,
            nonceStr: data.NonceStr,
            signature: data.Signature,
            jsApiList: [
                        'closeWindow',
                        'hideOptionMenu',
                        'hideMenuItems',
                        "onMenuShareTimeline",
                        "onMenuShareAppMessage",
                        "onMenuShareQQ"
            ]
        });


        wx.ready(function () {

            wx.onMenuShareAppMessage({
                title: shareTitle,
                desc: shareDesc,
                link: linkUrl,
                imgUrl: imgUrl,
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回

                },
                success: function (res) {

                },
                cancel: function (res) {

                },
                fail: function (res) {

                }
            });
            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: shareTitle,
                link: linkUrl,
                imgUrl: imgUrl,
                trigger: function (res) {
                    // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回

                },
                success: function (res) {

                },
                cancel: function (res) {

                },
                fail: function (res) {

                }
            });
            //分享到QQ
            wx.onMenuShareQQ({
                title: shareTitle,
                desc: shareDesc,
                link: linkUrl,
                imgUrl: imgUrl,
                trigger: function (res) {

                },
                complete: function (res) {

                },
                success: function (res) {

                },
                cancel: function (res) {

                },
                fail: function (res) {

                }
            });

            //分享到QZone
            wx.onMenuShareQZone({
                title: shareTitle,
                desc: shareDesc,
                link: linkUrl,
                imgUrl: imgUrl,
                trigger: function (res) {

                },
                complete: function (res) {

                },
                success: function (res) {

                },
                cancel: function (res) {

                },
                fail: function (res) {

                }
            });

        });
    }

    function removeQueryStringParameter(key, url) {
        if (!url) url = window.location.href;

        var hashParts = url.split('#');

        var regex = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");

        if (hashParts[0].match(regex)) {
            //REMOVE KEY AND VALUE
            url = hashParts[0].replace(regex, '$1');

            //REMOVE TRAILING ? OR &
            url = url.replace(/([?&])$/, '');

            //ADD HASH
            if (typeof hashParts[1] !== 'undefined' && hashParts[1] !== null)
                url += '#' + hashParts[1];
        }

        return url;
    }
})(location.href,"call");