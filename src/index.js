import loadMark from './loadMark'
import { monitorDom } from './util'
import { DEFAULT_SETTINGS } from './constants'
/* 存水印配置，以id 为键 */
export const customSettingMap = new Map()
/*加载水印-添加浏览器窗口监听事件-添加dom变化监听事件*/
export function watermark(settings = {}) {
    loadMark(settings)
    // 添加浏览器窗口监听事件
    window.addEventListener('resize', function () {
        loadMark(settings)
    })
    const watermarkId = settings.id || DEFAULT_SETTINGS.id
    const watermarkParentSelector = settings.parentSelector || DEFAULT_SETTINGS.parentSelector
    // 添加dom变化监听事件
    const isSupportMutationObserve = monitorDom(watermarkParentSelector, (mutations, observer) => {
        // 当节点被删除
        if (mutations[0].removedNodes[0] && mutations[0].removedNodes[0].id === watermarkId) {
            loadMark(settings)
        }
    })
    // 不支持MutationObserve时的降级方案Mutation Events
    if (!isSupportMutationObserve) {
        observeNode.addEventListener('DOMNodeRemoved', function () {
            loadMark(settings)
        }, false)
    }
}
/* 删除水印 */
export function removeWatermark(watermarkId) {
    const watermarkDom = document.getElementById(watermarkId)
    if (watermarkDom) {
        watermarkDom.parentNode.removeChild(watermarkDom)
    }
}
/* 获取水印配置 */
export function getWatermarkConfig(watermarkId) {
    return customSettingMap.get(watermarkId)
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
export function getSingleWH(text,density=100,base=1) {
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
    const tArr = text.split('-')
    const tArrLength = tArr.map(item => calculateStringLength(item))
    const tArrLengthMax = Math.max(...tArrLength)
    //计算出水印的宽度
    const tWidth = tArrLengthMax * 7.5
    //计算出水印的高度
    const tHeight = tArrLengthMax * 6
    const size={
        width:tWidth * (1+ ((100-density)/100) * base),
        height:tHeight * (1+ ((100-density)/100) * base),
    }
    return function(wh){
        return size[wh]
    }
}
