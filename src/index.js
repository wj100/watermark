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
