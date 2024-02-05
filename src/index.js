import loadMark from './loadMark'
import { monitorDom,getWH } from './util'
import { DEFAULT_SETTINGS } from './constants'
/* 删除水印标记 */
 let delMap=new Map()
/* 存水印配置，以id 为键 */
export const customSettingMap = new Map()
/*加载水印-添加浏览器窗口监听事件-添加dom变化监听事件*/
export function watermark(settings = {}) {
    settings.singleHeight = settings.singleHeight || getWH(settings.text, settings.density, settings.densityBase)('height')
    settings.singleWidth = settings.singleWidth || getWH(settings.text, settings.density, settings.densityBase)('width')
    loadMark(settings)
    // 添加浏览器窗口监听事件
    window.addEventListener('resize', function () {
        !delMap.get(settings.id)&&loadMark(settings)
    })
    const watermarkId = settings.id || DEFAULT_SETTINGS.id
    const watermarkParentSelector = settings.parentSelector || DEFAULT_SETTINGS.parentSelector
    // 添加dom变化监听事件
    const isSupportMutationObserve = monitorDom(watermarkParentSelector, (mutations, observer) => {
        // 当节点被删除
        if (mutations[0].removedNodes[0] && mutations[0].removedNodes[0].id === watermarkId) {
           !delMap.get(settings.id)&&loadMark(settings)
        }
    })
    // 不支持MutationObserve时的降级方案Mutation Events
    if (!isSupportMutationObserve) {
        observeNode.addEventListener('DOMNodeRemoved', function () {
            !delMap.get(settings.id)&&loadMark(settings)
        }, false)
    }
}
/* 删除水印 */
export function removeWatermark(watermarkId) {
    const watermarkDom = document.getElementById(watermarkId)
    if (watermarkDom) {
        watermarkDom.parentNode.removeChild(watermarkDom)
    }
    delMap.set(watermarkId, true)
}
/* 获取水印配置 */
export function getWatermarkConfig(watermarkId) {
    return customSettingMap.get(watermarkId)||{}
 }
/* 计算水印宽高 */
export const getSingleWH = getWH