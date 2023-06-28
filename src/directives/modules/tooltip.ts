/**
 * v-tooltip 文字说明提示
 * message：string               |    提示文字内容，为空不会显示tooltip图标
 * position：enum：left\right    |    提示图标位置，默认left
 * effect：enum：light\dark      |    tooltip主题，默认light
 * placement: enum：top\top-start\top-end\bottom\bottom-start\bottom-end\left\left-start\left-end\right\right-start\right-end   |     tooptip出现的位置，默认top
 */

import { Directive, DirectiveBinding, h, render } from 'vue'
import { ElTooltip } from 'element-plus'
import { QuestionFilled } from '@element-plus/icons-vue'

const tooltip: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const message = binding.value.message
    const placement = binding.value.placement || 'top'
    const effect = binding.value.effect || 'light'
    const position = binding.value.position || 'left'
    if (binding.value.message) {
      const vnode = h(
        ElTooltip,
        { content: message, placement, effect },
        () => h(QuestionFilled, { style: { width: '16px', verticalAlign: 'middle', margin: '-2px 2px 0px' } })
      )

      const dom = document.createElement('span')
      if (position === 'left') el.prepend(dom)
      else el.append(dom)

      render(vnode, dom)
    }
  }
};

export default tooltip;