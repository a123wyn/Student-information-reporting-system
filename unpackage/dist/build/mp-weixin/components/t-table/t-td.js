(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/t-table/t-td"],{"0416":function(t,e,n){"use strict";n.r(e);var r=n("bcd9"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,function(){return r[t]})}(o);e["default"]=i.a},"8e1f":function(t,e,n){"use strict";var r=n("cffa"),i=n.n(r);i.a},bcd9:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={props:{align:String},data:function(){return{thBorder:"1",borderColor:"#d0dee5",fontSize:"14",color:"#555c60",tdAlign:"center"}},inject:["table","tr"],created:function(){this.thBorder=this.table.border,this.borderColor=this.table.borderColor,this.fontSize=this.tr.fontSize,this.color=this.tr.color,this.align?this.tdAlign=this.align:this.tdAlign=this.tr.align},computed:{tdAlignCpd:function(){var t="";switch(this.tdAlign){case"left":t="flex-start";break;case"center":t="center";break;case"right":t="flex-end";break;default:t="center";break}return t}}};e.default=r},cffa:function(t,e,n){},d4f7:function(t,e,n){"use strict";n.r(e);var r=n("ffe0"),i=n("0416");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("8e1f");var c,a=n("f0c5"),f=Object(a["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],c);e["default"]=f.exports},ffe0:function(t,e,n){"use strict";var r,i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",function(){return i}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return r})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/t-table/t-td-create-component',
    {
        'components/t-table/t-td-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("d4f7"))
        })
    },
    [['components/t-table/t-td-create-component']]
]);
