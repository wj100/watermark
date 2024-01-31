"use strict";function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(r,!0).forEach((function(t){_defineProperty(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}Object.defineProperty(exports,"__esModule",{value:!0});var canvasTextAutoLine=function(e){for(var t=e.str,r=e.ctx,n=e.initX,o=e.initY,a=e.lineHeight,i=(e.canvasWidth,0),l=0;l<t.length;l++)r.measureText(t[l]).width,l==t.length-1&&r.fillText(t.substring(i,l+1),n,o),"-"==t[l]&&(0,r.fillText(t.slice(i,l),n,o),o+=a,i=l+1)},monitorDom=function(e,t){var r=null;r=e?document.querySelector(e):document.body;var n=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;return!!n&&(new n(t).observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0}),!0)},DEFAULT_SETTINGS={id:"wm_div_id",text:"测试水印",transparency:.15,fontSize:16,parentLeft:0,parentTop:0,parentRight:0,parentBottom:0,singleWidth:200,singleHeight:200,slope:-15,zIndex:9999,parentSelector:null};function loadMark(e){var t=_objectSpread2({},DEFAULT_SETTINGS,{},e);customSettingMap.set(t.id,t);var r=null;if(t.parentSelector?(r=document.querySelector(t.parentSelector)).style.position="relative":r=document.body,!document.getElementById(t.id)){var n=document.createElement("canvas"),o=document.createElement("div"),a=n.getContext("2d"),i=t.slope*Math.PI/180;n.id="watermarkCanvasId",n.width=t.singleWidth,n.height=t.singleHeight,a.font="normal ".concat(t.fontSize,"px 'Microsoft Yahei','serif','sans-serif'"),a.fillStyle="rgba(112, 113, 114, ".concat(t.transparency,")"),a.translate(n.width/2,n.height/2),a.rotate(i),a.translate(-n.width/2,-n.height/2),a.textAlign="center";var l=t.fontSize+t.fontSize/3,c=Math.ceil(Math.abs(Math.sin(i)*t.singleHeight))+t.fontSize/3,s={str:t.text,ctx:a,initX:t.singleWidth/2,initY:c,lineHeight:l,canvasWidth:t.singleWidth};canvasTextAutoLine(s);var d=n.toDataURL("image/png");o.id=t.id,o.style.position="absolute",o.style.zIndex=t.zIndex,o.style.top="".concat(t.parentTop,"px"),o.style.right="".concat(t.parentRight,"px"),o.style.bottom="".concat(t.parentBottom,"px"),o.style.left="".concat(t.parentLeft,"px"),o.style.pointerEvents="none",o.style.backgroundImage="URL("+d+")",r.appendChild(o)}}var customSettingMap=new Map;function watermark(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};loadMark(e),window.addEventListener("resize",(function(){loadMark(e)}));var t=e.id||DEFAULT_SETTINGS.id,r=e.parentSelector||DEFAULT_SETTINGS.parentSelector;monitorDom(r,(function(r,n){r[0].removedNodes[0]&&r[0].removedNodes[0].id===t&&loadMark(e)}))||observeNode.addEventListener("DOMNodeRemoved",(function(){loadMark(e)}),!1)}function removeWatermark(e){var t=document.getElementById(e);t&&t.parentNode.removeChild(t)}function getWatermarkConfig(e){return customSettingMap.get(e)}function getSingleWH(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,n=e.split("-").map((function(e){return function(e){for(var t=0,r=0;r<e.length;r++){var n=e.charAt(r);/[\u4e00-\u9fa5]/.test(n)?t+=2:t+=1}return t}(e)})),o=Math.max.apply(Math,_toConsumableArray(n)),a={width:7.5*o*(1+t*r),height:6*o*(1+t*r)};return function(e){return a[e]}}exports.customSettingMap=customSettingMap,exports.getSingleWH=getSingleWH,exports.getWatermarkConfig=getWatermarkConfig,exports.removeWatermark=removeWatermark,exports.watermark=watermark;
