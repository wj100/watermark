function e(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function t(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var n=function(e){for(var t=e.str,n=e.ctx,r=e.initX,i=e.initY,o=e.lineHeight,a=(e.canvasWidth,0),c=0;c<t.length;c++)n.measureText(t[c]).width,c==t.length-1&&n.fillText(t.substring(a,c+1),r,i),"-"==t[c]&&(0,n.fillText(t.slice(a,c),r,i),i+=o,a=c+1)},r=function(e,t){var n=null;n=e?document.querySelector(e):document.body;var r=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;return!!r&&(new r(t).observe(n,{childList:!0,attributes:!0,characterData:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0}),!0)},i={id:"wm_div_id",text:"测试水印",transparency:.15,fontSize:16,parentLeft:0,parentTop:0,parentRight:0,parentBottom:0,singleWidth:200,singleHeight:200,slope:-15,parentSelector:null};function o(r){var o=function(n){for(var r=1;r<arguments.length;r++){var i=null!=arguments[r]?arguments[r]:{};r%2?t(i,!0).forEach((function(t){e(n,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(i)):t(i).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(i,e))}))}return n}({},i,{},r),a=null;if(o.parentSelector?(a=document.querySelector(o.parentSelector)).style.position="relative":a=document.body,!document.getElementById(o.id)){var c=document.createElement("canvas"),l=document.createElement("div"),s=c.getContext("2d"),d=o.slope*Math.PI/180;c.id="watermarkCanvasId",c.width=o.singleWidth,c.height=o.singleHeight,s.font="normal ".concat(o.fontSize,"px 'Microsoft Yahei','serif','sans-serif'"),s.fillStyle="rgba(112, 113, 114, ".concat(o.transparency,")"),s.translate(c.width/2,c.height/2),s.rotate(d),s.translate(-c.width/2,-c.height/2),s.textAlign="center";var u=o.fontSize+5,p=Math.ceil(Math.abs(Math.sin(d)*o.singleHeight))+5,h={str:o.text,ctx:s,initX:o.singleWidth/2,initY:p,lineHeight:u,canvasWidth:o.singleWidth};n(h);var g=c.toDataURL("image/png");l.id=o.id,l.style.position="absolute",l.style.zIndex="9999",l.style.top="".concat(o.parentTop,"px"),l.style.right="".concat(o.parentRight,"px"),l.style.bottom="".concat(o.parentBottom,"px"),l.style.left="".concat(o.parentLeft,"px"),l.style.pointerEvents="none",l.style.backgroundImage="URL("+g+")",a.appendChild(l)}}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(e),window.addEventListener("resize",(function(){o(e)}));var t=e.id||i.id,n=e.parentSelector||i.parentSelector;r(n,(function(n,r){n[0].removedNodes[0]&&n[0].removedNodes[0].id===t&&o(e)}))||observeNode.addEventListener("DOMNodeRemoved",(function(){o(e)}),!1)}function c(e){var t=document.getElementById(e);t&&t.parentNode.removeChild(t)}export{c as removeWatermark,a as watermark};
