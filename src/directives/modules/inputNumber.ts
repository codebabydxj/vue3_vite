/**
 * v-inputNumber
 * 数字输入框，可限制小数点后几位，默认两位
 * 设定 decimal 数字即可
 */
import { Directive, DirectiveBinding } from 'vue'

interface ExHTMLElement extends HTMLElement {
  inputListener: EventListener
}

const inputNumber: Directive = {
  mounted(el: ExHTMLElement, binding: DirectiveBinding) {
    const decimal = binding.value?.decimal || 2
    const elInput = el.getElementsByTagName('input')[0]

    let regDecimal: RegExp
    if (decimal > 0) regDecimal = new RegExp(`^\\d*(.?\\d{0,${decimal}})`, 'g')
    else regDecimal = new RegExp(`^\\d*`, 'g')

    el.inputListener = () => {
      let val: any = elInput.value

      elInput.value =
        val
          .replace(/[^\d^\.]+/g, '')
          .replace(/^0+(\d)/, '$1')
          .replace(/^\./, '0.')
          .match(regDecimal)[0] || ''
    }
    elInput.addEventListener('input', el.inputListener)
  },

  unmounted(el: ExHTMLElement) {
    el.getElementsByTagName('input')[0].removeEventListener('input', el.inputListener)
  }
};

export default inputNumber;