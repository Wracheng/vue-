import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

initGlobalAPI(Vue)
// $isServer 是否为服务器渲染 相关知识链接 https://blog.csdn.net/weixin_30627341/article/details/96016588?utm_medium=distribute.pc_relevant.none-task-blog-searchFromBaidu-3.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-searchFromBaidu-3.control
// 为什么要用Object.defineProperty? 而不是Vue.prototype.$isServer?
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})
// $ssrContext 服务器渲染的上下文
// 代码覆盖率工具 Istanbul => istanbul ignore next 可以不计入覆盖率计算
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
