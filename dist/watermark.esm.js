function t(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function e(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function n(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var r=function(t){for(var e=t.str,n=t.ctx,r=t.initX,i=t.initY,o=t.lineHeight,a=(t.canvasWidth,0),c=0;c<e.length;c++)n.measureText(e[c]).width,c==e.length-1&&n.fillText(e.substring(a,c+1),r,i),"-"==e[c]&&(0,n.fillText(e.slice(a,c),r,i),i+=o,a=c+1)},i=function(t,e){var n=null;n=t?document.querySelector(t):document.body;var r=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;return!!r&&(new r(e).observe(n,{childList:!0,attributes:!0,characterData:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0}),!0)},o={id:"wm_div_id",text:"测试水印",color:"rgba(112, 113, 114, 1)",transparency:.15,fontSize:16,parentLeft:0,parentTop:0,parentRight:0,parentBottom:0,singleWidth:200,singleHeight:200,slope:-15,zIndex:9999,parentSelector:null};function a(n){var i=function(n){for(var r=1;r<arguments.length;r++){var i=null!=arguments[r]?arguments[r]:{};r%2?e(i,!0).forEach((function(e){t(n,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(i)):e(i).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(i,t))}))}return n}({},o,{},n);c.set(i.id,i);var a=null;if(i.parentSelector?(a=document.querySelector(i.parentSelector)).style.position="relative":a=document.body,!document.getElementById(i.id)){var l=document.createElement("canvas"),s=document.createElement("div"),d=l.getContext("2d"),u=i.slope*Math.PI/180;l.id="watermarkCanvasId",l.width=i.singleWidth,l.height=i.singleHeight,d.font="normal ".concat(i.fontSize,"px 'Microsoft Yahei','serif','sans-serif'"),d.fillStyle=i.color,d.translate(l.width/2,l.height/2),d.rotate(u),d.translate(-l.width/2,-l.height/2),d.textAlign="center";var p=i.fontSize+i.fontSize/3,f=Math.ceil(Math.abs(Math.sin(u)*i.singleHeight))+i.fontSize/3,h={str:i.text,ctx:d,initX:i.singleWidth/2,initY:f,lineHeight:p,canvasWidth:i.singleWidth};r(h);var g=l.toDataURL("image/png");s.id=i.id,s.style.position="absolute",s.style.zIndex=i.zIndex,s.style.top="".concat(i.parentTop,"px"),s.style.right="".concat(i.parentRight,"px"),s.style.bottom="".concat(i.parentBottom,"px"),s.style.left="".concat(i.parentLeft,"px"),s.style.pointerEvents="none",s.style.backgroundImage="URL("+g+")",a.appendChild(s)}}var c=new Map;function l(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};a(t),window.addEventListener("resize",(function(){a(t)}));var e=t.id||o.id,n=t.parentSelector||o.parentSelector;i(n,(function(n,r){n[0].removedNodes[0]&&n[0].removedNodes[0].id===e&&a(t)}))||observeNode.addEventListener("DOMNodeRemoved",(function(){a(t)}),!1)}function s(t){var e=document.getElementById(t);e&&e.parentNode.removeChild(e)}function d(t){return c.get(t)}function u(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,i=t.split("-").map((function(t){return function(t){for(var e=0,n=0;n<t.length;n++){var r=t.charAt(n);/[\u4e00-\u9fa5]/.test(r)?e+=2:e+=1}return e}(t)})),o=Math.max.apply(Math,n(i)),a={width:7.5*o*(1+(100-e)/100*r),height:6*o*(1+(100-e)/100*r)};return function(t){return a[t]}}export{c as customSettingMap,u as getSingleWH,d as getWatermarkConfig,s as removeWatermark,l as watermark};
