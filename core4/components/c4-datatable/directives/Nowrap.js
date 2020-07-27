//import debounce from 'debounce'
import { debounce } from '../helper/debounce.js'
let noWrap = debounce((el, value) => {
  // console.log('noWrap')
  let tableRows = el.querySelector('.v-data-table table tbody').childNodes

  // index for which <td> in table we need add nowrap attribute
  let tdNumbers = index(value)

  tdNumbers.length &&
  tableRows &&
  tableRows[0].childNodes.forEach((item, i) => {
    // console.log('noWrap')
    item.removeAttribute('nowrap')

    if (tdNumbers.includes(i)) item.setAttribute('nowrap', true)
  })
}, 500)

function index (arr) {
  return arr.reduce((result, item, i) => {
    if (item.nowrap) result.push(i)

    return result
  }, [])
}

function update (el, { value, arg, modifiers }, { context: component }) {
  // ToDo: figure out why this doesn't work
  // if (component && component.$el === el) {
  //   noWrap(el, value)
  // }

  // temporary solution for reducing the number of calls - debounce
  noWrap(el, value)
}

function unbind (el) {}

export default {
  update,
  unbind
}
