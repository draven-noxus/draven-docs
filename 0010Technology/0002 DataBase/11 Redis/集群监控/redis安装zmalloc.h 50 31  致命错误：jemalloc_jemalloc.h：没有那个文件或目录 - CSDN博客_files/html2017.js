// Traffic Stats of the entire Web site By baidu end
var _gaq = [];
var userAgent = navigator.userAgent.toLowerCase();
// if(userAgent == null || userAgent == ''){
// //
// }else{
//     if(userAgent.indexOf("android") != -1 || userAgent.indexOf("ios") != -1 || userAgent.indexOf("iphone") != -1 || userAgent.indexOf("ipad") != -1 || userAgent.indexOf("windows phone") != -1 ){

//   	}else{
//   	  //google 统计start
//   	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//   		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//   		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//   		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

//   		  ga('create', 'UA-64962204-1', 'auto');
//   		  ga('send', 'pageview');
//         //google 统计end
//    }
// }

//tag推荐弹窗
(function(){
var protocol = location.protocol.substr(0, 4) === 'http' ? '' : 'http:';
$.getScript(protocol + '//csdnimg.cn/public/common/tag-suggest-pop/js/main.js?'+(new Date()/120000|0));
})();

!(function(){
  var currUser={
      userName:"",
      userNick:'<a class="set-nick" href="https://passport.csdn.net/account/profile">设置昵称<span class="write-icon"></span></a>',
      userInfo:"",
      desc : '<a class="fill-dec" href="//my.csdn.net" target="_blank">编辑自我介绍，让更多人了解你<span class="write-icon"></span></a>',
      avatar:"//c.csdnimg.cn/public/common/toolbar/images/100x100.jpg"
    };
  var prodLogo = "none";
  var $oScriptTag =$("#toolbar-tpl-scriptId");
  var skin =$oScriptTag.attr("skin")=="black"?" csdn-toolbar-skin-black ":"";
  var fixed = $oScriptTag.attr("fixed")=="top"?" navbar-fixed-top ":"";
  var prodIndex= $oScriptTag.attr("domain")?$oScriptTag.attr("domain"):window.location.protocol+"//"+window.location.host;
      prodIndex+='?ref=toolbar_logo';
  var getCookie =function (objName){//获取指定名称的cookie的值
      var arrStr = document.cookie.split("; ");
      for(var i = 0;i < arrStr.length;i ++){
      var temp = arrStr[i].split("=");
      if(temp[0] == objName && objName=="UD") return decodeURIComponent(temp[1]);
      if(temp[0] == objName) return decodeURI(temp[1]);
      }
  }
  var setCookie = function (name,value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();// + ";domain=.csdn.net;path=/";
  }
  var HTMLEncode =function(str) {
      var s = "";
      if(str.length == 0) return "";
      s = str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;");
      return s;
    }
  var AUtoAvatar = function(AU){
    if(!AU||!currUser.userName){
      return false;
    }
    var _AUPath = AU.split("").join("/");
    var userName = currUser.userName&&currUser.userName.toLowerCase();
    return "http://avatar.csdn.net/"+_AUPath+"/2_"+userName+".jpg";
  }
  var hasLogin = false;
  var loginMark ="unlogin";
  function checkLogin(callback) {
          currUser.userNick = getCookie("UserNick") ||currUser.userNick;
          currUser.userName = getCookie("UserName") || currUser.userName;
          currUser.userInfo = getCookie("UserInfo") || currUser.userInfo;
          currUser.avatar = AUtoAvatar(getCookie("AU")) || currUser.avatar;
          currUser.desc = getCookie("UD") || currUser.desc;
          if(getCookie("UD")){
            currUser.desc = HTMLEncode(currUser.desc.replace(/\+/g," "));
          }
          callback(currUser);
    }
  checkLogin(function(currUser){
    if(currUser.userName&&currUser.userInfo){
        hasLogin = true;
    }
    loginMark = hasLogin?"":"unlogin";
  })

  /*
  * init pord logo
  */
  var prodJSON = {
      "blog" : "blog-icon",
      "download" : "down-icon",
      "bbs" : "bbs-icon",
      "my" :"space-icon",
      "code" : "code-icon",
      "share" : "share-icon",
      "tag" : "tag-icon",
      "dashboard":"dashboard-icon",
      "news" : "news-icon",
      "tag" : "tag-icon",
      "ask" : "ask-icon",
      "notify" : "notify-icon"
  }
  if(prodJSON[$oScriptTag.attr("prod")]){
    prodLogo=prodJSON[$oScriptTag.attr("prod")]||$oScriptTag.attr("prod");
  }

  // $( 'head' ).append( '<link rel="stylesheet" href="//csdnimg.cn/public/common/toolbar/css/font-awesome.min.css">' );
  // 注册url，https://passport.csdn.net/account/register?ref=toolbar

  var tpl ='\<div class="csdn-toolbar csdn-toolbar'+skin+fixed+'">\
        <div class="container row center-block ">\
          <ul class="col-md-6 pull-left left-menu clearfix">\
            <li><a href="http://www.csdn.net?ref=toolbar" title="CSDN首页" target="_blank">CSDN首页</a></li>\
            <li><a href="http://edu.csdn.net?ref=toolbar" title="学院" target="_blank">学院</a></li>\
            <li><a href="http://download.csdn.net?ref=toolbar" title="下载" target="_blank">下载</a></li>\
            <li class="show-more">\
            <a href="javascript:;">更多<i class="iconfont-toolbar icon-xiajiantou"></i></a>\
              <div class="more">\
                <div><a href="http://bbs.csdn.net?ref=toolbar" target="_blank">论坛</a></div>\
                <div><a href="http://ask.csdn.net?ref=toolbar" target="_blank">问答</a></div>\
                <div><a href="http://huiyi.csdn.net/?ref=toolbar" target="_blank">活动</a></div>\
                <div><a href="https://gitee.com/?utm_source=csdn_toolbar" target="_blank">码云</a></div>\
                <div><a href="http://mall.csdn.net?ref=toolbar" target="_blank">商城</a></div>\
              </div>\
            </li>\
          </ul>\
          <div class="pull-right login-wrap '+loginMark+'">\
            <ul class="btns">\
              <li><a class="" href="http://www.csdn.net/app/?ref=toolbar" target="_blank"><i class="iconfont-toolbar icon-shouji"></i>下载 CSDN APP</a></li>\
              <li><a class="" href="http://write.blog.csdn.net/postedit?ref=toolbar" target="_blank"><i class="iconfont-toolbar icon-tianxie"></i>写博客</a></li>\
              <li class="userinfo"><a href="https://passport.csdn.net/account/login?ref=toolbar">登录</a><span>|<span><a href="http://passport.csdn.net/account/mobileregister?ref=toolbar&action=mobileRegister">注册</a></li>\
              <li class="userLogin">\
                <div class="loginCenter"><a href="http://my.csdn.net?ref=toolbar"><img class="login_img" src="'+currUser.avatar+'"><span class="userName">'+currUser.userNick+'</span><i class="iconfont-toolbar icon-xiajiantou"></i></a></div>\
                <div class="userControl">\
                  <div><a href="http://my.csdn.net?ref=toolbar" target="_blank">我的主页</a></div>\
                  <div><a href="http://msg.csdn.net/letters?ref=toolbar" target="_blank">站内消息</a></div>\
                  <div><a href="https://my.csdn.net//my/account/changepwd?ref=toolbar" target="_blank">设置</a></div>\
                  <div><a href="http://bbs.csdn.net/forums/Service?ref=toolbar" target="_blank">帮助与反馈</a></div>\
                  <div><a href="https://passport.csdn.net/account/logout?ref=toolbar">退出</a></div>\
                </div>\
              </li>\
            </ul>\
          </div>\
        </div>\
    </div>';
  $(document.body).prepend($(tpl));
  // $("#chasnew123").hide();
  //var newTag = true;
  //if (newTag) {
  //  var hasNew = getCookie("csdn_has_new_product");
  //  if (hasNew == "2")
  //    $("#chasnew123").hide();
  //  else {
  //    $("#cappsarea123").one("mouseover", function () {
  //      setCookie("csdn_has_new_product", "2");
  //      $("#chasnew123").hide();
  //    });
  //  }
  //}
  // $("#toolbar_sele_map").bind('click',function(){
  //   if(!$(this).parents(".dropdown").hasClass("open")){
  //     $(this).parents(".dropdown").addClass('open');
  //   }else{
  //     $(this).parents(".dropdown").removeClass('open');
  //   }
  // });
})();

// hover
$(function(){
  var moreHover={
    showMore: function(){
      var $dom = $('.more');
      if($dom.is(":animated")){
        $dom.stop(true,true).fadeIn(200);
      }
      $dom.stop(true,true).fadeIn(200);
    },
    hideMore:function(){
      var $dom = $('.more');
      if($dom.is(":animated")){
        $dom.stop(true,true).fadeIn(200);
      }
      $dom.stop(true,true).fadeOut(300);
    }
  }
  var userHover={
    showMore: function(){
      var $dom = $('.userControl');
      if($dom.is(":animated")){
        $dom.stop(true,true).fadeIn(200);
      }
      $dom.stop(true,true).fadeIn(200);
    },
    hideMore:function(){
      var $dom = $('.userControl');
      if($dom.is(":animated")){
        $dom.stop(true,true).fadeIn(200);
      }
      $dom.stop(true,true).fadeOut(300);
    }
  }
  $('.show-more').hover(moreHover.showMore,moreHover.hideMore)
  $('.userLogin').hover(userHover.showMore,userHover.hideMore)
})