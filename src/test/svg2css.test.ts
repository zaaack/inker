import * as assert from 'assert'
import * as Styles from '../App/Artboard/style'
import * as fs from 'fs'
import * as path from 'path'
import { getNodeRect } from '../App/Artboard/State'

const readFile = (file: string) =>
  fs.readFileSync(path.resolve(__dirname, file), 'utf8')

const getSVGDom = (file: string) => {
  const svgStr = readFile(file)
  const div = document.createElement('div')
  div.innerHTML = svgStr
  const $svg = div.querySelector('svg')!
  document.body.appendChild(div)
  return $svg
}

namespace uikit {
  export const xd = {
    category: () => getSVGDom(`./fixtures/uikit/xd/Category.svg`),
  }
}

function testCss($svg: SVGSVGElement, sel: string, expect: string, msg?: string) {
  let el = $svg.querySelector(sel)! as SVGRectElement
  let rect = getNodeRect(el, $svg.getBoundingClientRect())
  let result = Styles.getCss(el, rect, $svg).trim()
  console.log('el', el.outerHTML, result)
  expect = expect.split('\n').map(s => s.trim()).join('\n').trim()
  assert.equal(result, expect, msg || sel)
}

describe('uikit', () => {
  let $svg: SVGSVGElement
  let el: SVGElement
  it('xd', () => {
    $svg = uikit.xd.category()

    testCss($svg, '#test1', `
      width: 343px;
      height: 120px;
      background-image: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
      opacity: 0.3;`)

    testCss($svg, '#test2', `
      width: 343px;
      height: 74px;
      background-image: linear-gradient(3.14deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
      opacity: 0.3;`)

    testCss($svg, '#test3', `
      font-size: 28px;
      letter-spacing: 0.36px;
      color: rgb(255, 255, 255);`)
  })
})
