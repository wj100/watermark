/*
  判断文本是否超出canvas的宽度，超出则换行
  @param {string} str:要绘制的字符串
  @param {object} canvas:canvas对象
  @param {number} initX:绘制字符串起始x坐标
  @param {number} initY:绘制字符串起始y坐标
  @param {number} lineHeight:字行高
  @param {number} canvasWidth:单个水印的宽度
*/
const canvasTextAutoLine = parameterObj => {
  let { str, ctx, initX, initY, lineHeight, canvasWidth } = parameterObj
  let lineWidth = 0
  let lastSubStrIndex = 0
    //如果 str 以换行符结尾，则去掉换行符
    str=str.replace(/\n+$/g, '')
  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width
    if (lineWidth > canvasWidth - 50) { // 考虑边界需加50的buffer
    //   ctx.fillText(str.slice(lastSubStrIndex, i), initX, initY)
    //   initY += lineHeight
    //   lineWidth = 0
    //   lastSubStrIndex = i
    }
    if (i == str.length - 1) {
      ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY)
    }
    //-换行
    if (str[i] == "\n") {
      lineWidth = 0
      ctx.fillText(str.slice(lastSubStrIndex, i), initX, initY)
      initY += lineHeight
      lastSubStrIndex = i + 1
    }
  }
}

// 监控水印节点变化
const monitorDom = (parentSelector, callBack) => {
  /* 设置监听的dom节点 */
  let observeNode = null
  if (parentSelector) {
    observeNode = document.querySelector(
      parentSelector
    )
  } else {
    observeNode = document.body
  }
  const options = {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  }
  const MutationObserver = window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver
  if (!!MutationObserver) {
    const watermarkObserver = new MutationObserver(callBack)
    watermarkObserver.observe(observeNode, options)
  } else {
    return false
  }
  return true
}
/**
 * 动态水印时 计算单个水印的宽高
 * @param {水印文本 以-为分隔符} text 
 * @param {疏密度} density 0-100 100为最密
 * @param {疏密系数，将density与base相乘} base  
 *          水印疏密系数：默认为1 越大越稀 
            为 1 时，[稀疏] 是 密集的 1+1*1=2
            为 2 时，[稀疏] 是 密集的 1+1*2=3
 * @returns function('width'/'height')
 */
const getWH=(text,density=100,base=1)=> {
    const calcTextLength = (str) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d');
        return ctx.measureText(str).width;   
    };
    const calculateStringLength = (str) => {
        let length = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charAt(i);
            // 使用正则表达式判断是否是中文字符
            if (/[\u4e00-\u9fa5]/.test(char)) {
                length += 2;
            } else {
                length += 1;
            }
        }
        return length;
    };
    //将字符串 text 以-为分隔符分割成数组，取出计算后的最大长度
    const tArr = text.split('\n')
    const tArrLength = tArr.map(item => calcTextLength(item))
    const tArrLengthMax = Math.max(...tArrLength)
    //计算出水印的宽度
    const tWidth = tArrLengthMax * 1.5
    //计算出水印的高度
    const tHeight = tArrLengthMax * 1.2
    const size={
        width:tWidth * (1+ ((100-density)/100) * base),
        height:tHeight * (1+ ((100-density)/100) * base),
    }
    return function(wh){
        return size[wh]
    }
}
            
export { canvasTextAutoLine, monitorDom , getWH}
