(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/wuc-tab/wuc-tab"],{"27e1":function(t,e,n){"use strict";n.r(e);var u=n("9d51"),r=n("743d");for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n("50bf");var c,f=n("f0c5"),i=Object(f["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],c);e["default"]=i.exports},"50bf":function(t,e,n){"use strict";var u=n("ed33"),r=n.n(u);r.a},"743d":function(t,e,n){"use strict";n.r(e);var u=n("97e5"),r=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,function(){return u[t]})}(a);e["default"]=r.a},"97e5":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"wuc-tab",data:function(){return{}},props:{tabList:{type:Array,default:function(){return[]}},tabCur:{type:Number,default:function(){return 0}},tabClass:{type:String,default:function(){return""}},tabStyle:{type:String,default:function(){return""}},textFlex:{type:Boolean,default:function(){return!1}},selectClass:{type:String,default:function(){return"text-blue"}}},methods:{tabSelect:function(t,e){if(this.currentTab===t)return!1;this.$emit("update:tabCur",t),this.$emit("change",t)}},computed:{scrollLeft:function(){return 60*(this.tabCur-1)}}};e.default=u},"9d51":function(t,e,n){"use strict";var u,r=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",function(){return r}),n.d(e,"c",function(){return a}),n.d(e,"a",function(){return u})},ed33:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/wuc-tab/wuc-tab-create-component',
    {
        'components/wuc-tab/wuc-tab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("27e1"))
        })
    },
    [['components/wuc-tab/wuc-tab-create-component']]
]);
