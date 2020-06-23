(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"00ed":function(e,n,t){"use strict";var o={"wuc-tab":()=>t.e("components/wuc-tab/wuc-tab").then(t.bind(null,"27e1")),"uni-icons":()=>Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(t.bind(null,"173e"))},s=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"b",function(){return s}),t.d(n,"c",function(){return a}),t.d(n,"a",function(){return o})},"2b4f":function(e,n,t){"use strict";(function(e,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=function(){return t.e("components/wuc-tab/wuc-tab").then(t.bind(null,"27e1"))},a=function(){return Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(t.bind(null,"173e"))},i={data:function(){return{username:"",password:"",tabList:[{name:"老师",icon:"cuIcon-comment"},{name:"学生",icon:"cuIcon-dianhua"}],userType:0,school:""}},components:{WucTab:s,uniIcons:a},computed:{},onLoad:function(){this.school=e.getStorageSync("school")},methods:{toRegister:function(){e.redirectTo({url:"/pages/register/register"})},tabChange:function(e){this.userType=e},signIn:function(){var n=this,t=this.username,s=this.password,a=this.userType;e.showLoading({title:"登录中..."}),o.callFunction({name:"signIn",data:{username:t,password:s,userType:a}}).then(function(t){if(0!==t.result.status)return e.showToast({icon:"none",title:"登录失败"}),e.hideLoading(),console.log("返回的",t),Promise.reject(new Error(t.result.msg));if(e.showToast({icon:"none",title:"登录成功"}),e.hideLoading(),e.setStorageSync("token",t.result.token),e.setStorageSync("uid",t.result.uid),e.setStorageSync("userType",n.userType),e.setStorageSync("username",n.username),t.result.major_id)e.setStorageSync("major_id",t.result.major_id),e.setStorageSync("grade_id",t.result.grade_id),e.setStorageSync("academy_id",t.result.academy_id),1==n.userType&&(e.setStorageSync("stu_num",t.result.stu_num),e.setStorageSync("stu_name",t.result.stu_name)),e.navigateTo({url:"/pages/index/index"});else switch(n.userType){case 0:e.setStorageSync("academy_id",t.result.academy_id),e.navigateTo({url:"/pages/index/index"});break;case 1:e.navigateTo({url:"/pages/student_bind/student_bind"});break}}).catch(function(n){console.log(n),e.hideLoading(),e.showModal({content:"登录失败，"+n.message,showCancel:!1})})},loginMp:function(){var n=this;e.showLoading({title:"登录中..."}),this.getCode().then(function(e){console.log("code",e);var t=n.userType;return o.callFunction({name:"login",data:{code:e,userType:t}})}).then(function(n){if(e.hideLoading(),console.log(n),0!==n.result.status)return Promise.reject(new Error(n.result.msg));e.setStorageSync("token",n.result.token),e.showModal({content:"登录成功",showCancel:!1})}).catch(function(n){e.hideLoading(),e.showModal({content:"出现错误，请稍后再试."+n.message,showCancel:!1})})},getCode:function(){return new Promise(function(n,t){e.login({provider:"weixin",success:function(e){e.code?n(e.code):t(new Error("微信登录失败"))},fail:function(e){t(new Error("微信登录失败"))}})})},weixinlogin:function(){e.login({provider:"weixin",success:function(n){var t=this;n.code;e.getUserInfo({provider:"weixin",success:function(e){this.username=e.userInfo.nickName,this.password=this.username;e.userInfo.avatarUrl}}),o.callFunction({name:"signIn",data:{username:this.username,password:this.password,userType:1}}).then(function(n){if(0!==n.result.status&&(o.callFunction({name:"signUp",data:{username:t.username,password:t.password,userType:1}}).then(function(n){if(e.hideLoading(),0!==n.result.status)return Promise.reject(new Error(n.result.msg));e.setStorageSync("token",n.result.token)}).catch(function(n){console.log(n),e.showModal({content:"注册失败，"+n.message,showCancel:!1}),e.hideLoading()}),console.log("返回的",n)),e.showToast({icon:"none",title:"登录成功"}),e.hideLoading(),e.setStorageSync("token",n.result.token),e.setStorageSync("uid",n.result.uid),e.setStorageSync("userType",t.userType),e.setStorageSync("username",t.username),n.result.major_id)e.setStorageSync("major_id",n.result.major_id),e.setStorageSync("grade_id",n.result.grade_id),e.setStorageSync("academy_id",n.result.academy_id),1==t.userType&&(e.setStorageSync("stu_num",n.result.stu_num),e.setStorageSync("stu_name",n.result.stu_name)),e.navigateTo({url:"/pages/index/index"});else switch(t.userType){case 0:e.setStorageSync("academy_id",n.result.academy_id),e.navigateTo({url:"/pages/index/index"});break;case 1:e.navigateTo({url:"/pages/student_bind/student_bind"});break}}).catch(function(n){console.log(n),e.hideLoading(),e.showModal({content:"登录失败，"+n.message,showCancel:!1})})}})},validateToken:function(){e.showLoading({title:"加载中..."}),o.callFunction({name:"validateToken",data:{token:e.getStorageSync("token")}}).then(function(n){console.log(n),e.hideLoading(),e.showModal({content:n.result.msg,showCancel:!1})}).catch(function(n){e.hideLoading(),e.showModal({content:"请求云函数发生错误，"+n.message,showCancel:!1})})}},onReady:function(){}};n.default=i}).call(this,t("543d")["default"],t("a9ff")["default"])},"539a":function(e,n,t){"use strict";var o=t("916c"),s=t.n(o);s.a},"5b71":function(e,n,t){"use strict";(function(e){t("a4ad"),t("921b");o(t("66fd"));var n=o(t("f364"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},"916c":function(e,n,t){},b471:function(e,n,t){"use strict";t.r(n);var o=t("2b4f"),s=t.n(o);for(var a in o)"default"!==a&&function(e){t.d(n,e,function(){return o[e]})}(a);n["default"]=s.a},f364:function(e,n,t){"use strict";t.r(n);var o=t("00ed"),s=t("b471");for(var a in s)"default"!==a&&function(e){t.d(n,e,function(){return s[e]})}(a);t("539a");var i,r=t("f0c5"),u=Object(r["a"])(s["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);n["default"]=u.exports}},[["5b71","common/runtime","common/vendor"]]]);