"use strict";function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(r,!0).forEach((function(t){_defineProperty(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}Object.defineProperty(exports,"__esModule",{value:!0});var canvasTextAutoLine=function(e){for(var t=e.str,r=e.ctx,n=e.initX,o=e.initY,i=e.lineHeight,a=e.canvasWidth,l=0,c=0,s=0;s<t.length;s++)(l+=r.measureText(t[s]).width)>a-50&&(r.fillText(t.slice(c,s),n,o),o+=i,l=0,c=s),s==t.length-1&&r.fillText(t.substring(c,s+1),n,o)," "==t[s]&&(l=0,r.fillText(t.slice(c,s),n,o),o+=i,c=s+1)},monitorDom=function(e,t){var r=null;r=e?document.querySelector(e):document.body;var n=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;return!!n&&(new n(t).observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0}),!0)},DEFAULT_SETTINGS={id:"wm_div_id",text:"测试水印",transparency:.15,fontSize:16,parentLeft:0,parentTop:0,parentRight:0,parentBottom:0,singleWidth:200,singleHeight:200,slope:-15,parentSelector:null};function loadMark(e){var t=_objectSpread2({},DEFAULT_SETTINGS,{},e),r=null;if(t.parentSelector?(r=document.querySelector(t.parentSelector)).style.position="relative":r=document.body,!document.getElementById(t.id)){var n=document.createElement("canvas"),o=document.createElement("div"),i=n.getContext("2d"),a=t.slope*Math.PI/180;n.id="watermarkCanvasId",n.width=t.singleWidth,n.height=t.singleHeight,i.font="normal ".concat(t.fontSize,"px 'Microsoft Yahei','serif','sans-serif'"),i.fillStyle="rgba(112, 113, 114, ".concat(t.transparency,")"),i.translate(n.width/2,n.height/2),i.rotate(a),i.translate(-n.width/2,-n.height/2),i.textAlign="center";var l=t.fontSize+5,c=Math.ceil(Math.abs(Math.sin(a)*t.singleHeight))+5,s={str:t.text,ctx:i,initX:t.singleWidth/2,initY:c,lineHeight:l,canvasWidth:t.singleWidth};canvasTextAutoLine(s);var d=n.toDataURL("image/png");o.id=t.id,o.style.position="absolute",o.style.zIndex="9999",o.style.top="".concat(t.parentTop,"px"),o.style.right="".concat(t.parentRight,"px"),o.style.bottom="".concat(t.parentBottom,"px"),o.style.left="".concat(t.parentLeft,"px"),o.style.pointerEvents="none",o.style.backgroundImage="URL("+d+")",r.appendChild(o)}}function watermark(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};loadMark(e),window.addEventListener("resize",(function(){loadMark(e)}));var t=e.id||DEFAULT_SETTINGS.id,r=e.parentSelector||DEFAULT_SETTINGS.parentSelector;monitorDom(r,(function(r,n){r[0].removedNodes[0]&&r[0].removedNodes[0].id===t&&loadMark(e)}))||observeNode.addEventListener("DOMNodeRemoved",(function(){loadMark(e)}),!1)}exports.watermark=watermark;
